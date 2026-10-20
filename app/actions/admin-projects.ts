"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getAdminUser } from "@/lib/admin/auth";
import {
  PROJECT_TYPES,
  STUDIO_BASE,
  STUDIO_LOGIN,
} from "@/lib/admin/constants";
import {
  deleteStoredImage,
  uploadImage,
} from "@/lib/admin/storage";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProjectFormState = {
  status: "idle" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export type DeleteState = {
  status: "idle" | "error";
  message?: string;
};

const baseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Give the project a title.")
    .max(120, "Keep the title under 120 characters."),
  slug: z
    .string()
    .trim()
    .min(2, "Add a slug.")
    .max(80, "Keep the slug under 80 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and single hyphens.",
    ),
  summary: z
    .string()
    .trim()
    .min(20, "Write at least a sentence about the project.")
    .max(500, "Keep the summary under 500 characters."),
  type: z.enum(PROJECT_TYPES),
  tech: z.string().trim().max(600, "That technology list is too long."),
  year: z.string().trim(),
  sort_order: z.string().trim(),
  repo_url: z.string().trim(),
  live_url: z.string().trim(),
  featured: z.boolean(),
  current_image: z.string().trim(),
});

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function saveProject(
  _previous: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const user = await getAdminUser();
  if (!user) redirect(STUDIO_LOGIN);

  const parsed = baseSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    type: String(formData.get("type") ?? "personal"),
    tech: String(formData.get("tech") ?? ""),
    year: String(formData.get("year") ?? ""),
    sort_order: String(formData.get("sort_order") ?? ""),
    repo_url: String(formData.get("repo_url") ?? ""),
    live_url: String(formData.get("live_url") ?? ""),
    featured: formData.get("featured") === "on",
    current_image: String(formData.get("current_image") ?? ""),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  const data = parsed.data;
  const errors: Record<string, string> = {};

  const techStack = Array.from(
    new Set(
      data.tech
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );

  if (techStack.length > 12) {
    errors.tech = "List at most 12 technologies.";
  }
  if (techStack.some((item) => item.length > 32)) {
    errors.tech = "Keep each technology under 32 characters.";
  }

  let year: number | null = null;
  if (data.year) {
    const value = Number(data.year);
    if (!Number.isInteger(value) || value < 2000 || value > 2100) {
      errors.year = "Use a year between 2000 and 2100.";
    } else {
      year = value;
    }
  }

  const sortOrder = data.sort_order ? Number(data.sort_order) : 0;
  if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 9999) {
    errors.sort_order = "Use a whole number between 0 and 9999.";
  }

  if (data.repo_url && !z.url().safeParse(data.repo_url).success) {
    errors.repo_url = "Enter a full URL, including https://.";
  }
  if (data.live_url && !z.url().safeParse(data.live_url).success) {
    errors.live_url = "Enter a full URL, including https://.";
  }

  if (data.slug && !slugPattern.test(data.slug)) {
    errors.slug = "Use lowercase letters, numbers, and single hyphens.";
  }

  const imageFile = formData.get("image");
  const hasNewImage = imageFile instanceof File && imageFile.size > 0;

  if (!hasNewImage && !data.current_image) {
    errors.image = "Add a cover image for the project.";
  }

  if (Object.keys(errors).length) {
    return { status: "error", errors };
  }

  let imageUrl = data.current_image;

  if (hasNewImage) {
    const upload = await uploadImage(imageFile, "projects");
    if (upload.error || !upload.url) {
      return {
        status: "error",
        errors: { image: upload.error ?? "The image could not be uploaded." },
      };
    }
    imageUrl = upload.url;
  }

  const id = String(formData.get("id") ?? "");
  const payload = {
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    type: data.type,
    tech_stack: techStack,
    image_path: imageUrl,
    repo_url: data.repo_url || null,
    live_url: data.live_url || null,
    featured: data.featured,
    sort_order: sortOrder,
    year,
  };

  const supabase = await createSupabaseServerClient();

  if (id) {
    const { data: existing } = await supabase
      .from("projects")
      .select("image_path")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id);

    if (error) {
      if (hasNewImage && imageUrl) await deleteStoredImage(imageUrl);
      if (error.code === "23505") {
        return { status: "error", errors: { slug: "That slug is already used." } };
      }
      return {
        status: "error",
        message: "The project could not be saved. Try again.",
      };
    }

    if (hasNewImage && existing?.image_path !== imageUrl) {
      await deleteStoredImage(existing?.image_path);
    }
  } else {
    const { error } = await supabase.from("projects").insert(payload);

    if (error) {
      if (hasNewImage && imageUrl) await deleteStoredImage(imageUrl);
      if (error.code === "23505") {
        return { status: "error", errors: { slug: "That slug is already used." } };
      }
      return {
        status: "error",
        message: "The project could not be created. Try again.",
      };
    }
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`${STUDIO_BASE}/projects`);
  redirect(`${STUDIO_BASE}/projects?saved=${id ? "updated" : "created"}`);
}

export async function deleteProject(
  _previous: DeleteState,
  formData: FormData,
): Promise<DeleteState> {
  const user = await getAdminUser();
  if (!user) redirect(STUDIO_LOGIN);

  const id = String(formData.get("id") ?? "");
  if (!id) return { status: "error", message: "Missing project id." };

  const supabase = await createSupabaseServerClient();
  const { data: existing } = await supabase
    .from("projects")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return { status: "error", message: "The project could not be deleted." };
  }

  await deleteStoredImage(existing?.image_path);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`${STUDIO_BASE}/projects`);
  redirect(`${STUDIO_BASE}/projects?saved=deleted`);
}
