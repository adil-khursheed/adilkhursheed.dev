"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getAdminUser } from "@/lib/admin/auth";
import {
  POST_STATUSES,
  STUDIO_BASE,
  STUDIO_LOGIN,
} from "@/lib/admin/constants";
import { readingMinutes } from "@/lib/admin/slug";
import { deleteStoredImage, uploadImage } from "@/lib/admin/storage";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PostFormState = {
  status: "idle" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export type DeleteState = {
  status: "idle" | "error";
  message?: string;
};

const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Give the post a title.")
    .max(160, "Keep the title under 160 characters."),
  slug: z
    .string()
    .trim()
    .min(2, "Add a slug.")
    .max(80, "Keep the slug under 80 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and single hyphens.",
    ),
  excerpt: z
    .string()
    .trim()
    .max(320, "Keep the excerpt under 320 characters."),
  content_html: z
    .string()
    .max(400_000, "That post is too large. Split it into two posts."),
  status: z.enum(POST_STATUSES),
  current_cover: z.string().trim(),
});

function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function savePost(
  _previous: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const user = await getAdminUser();
  if (!user) redirect(STUDIO_LOGIN);

  const parsed = postSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content_html: String(formData.get("content_html") ?? ""),
    status: String(formData.get("status") ?? "draft"),
    current_cover: String(formData.get("current_cover") ?? ""),
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
  const text = plainText(data.content_html);

  if (data.status === "published" && text.length < 40) {
    errors.content_html = "Write at least a paragraph before publishing.";
  }

  const coverFile = formData.get("cover");
  const hasNewCover = coverFile instanceof File && coverFile.size > 0;

  if (Object.keys(errors).length) {
    return { status: "error", errors };
  }

  let coverUrl = data.current_cover;

  if (hasNewCover) {
    const upload = await uploadImage(coverFile, "blog");
    if (upload.error || !upload.url) {
      return {
        status: "error",
        errors: { cover: upload.error ?? "The image could not be uploaded." },
      };
    }
    coverUrl = upload.url;
  }

  const id = String(formData.get("id") ?? "");
  const supabase = await createSupabaseServerClient();

  let publishedAt: string | null = null;

  if (id) {
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("published_at, cover_image_path")
      .eq("id", id)
      .maybeSingle();

    if (data.status === "published") {
      publishedAt = existing?.published_at ?? new Date().toISOString();
    }
  } else if (data.status === "published") {
    publishedAt = new Date().toISOString();
  }

  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content_html: data.content_html,
    cover_image_path: coverUrl || null,
    status: data.status,
    reading_minutes: readingMinutes(data.content_html),
    published_at: publishedAt,
  };

  if (id) {
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("cover_image_path")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", id);

    if (error) {
      if (hasNewCover && coverUrl) await deleteStoredImage(coverUrl);
      if (error.code === "23505") {
        return { status: "error", errors: { slug: "That slug is already used." } };
      }
      return {
        status: "error",
        message: "The post could not be saved. Try again.",
      };
    }

    if (hasNewCover && existing?.cover_image_path !== coverUrl) {
      await deleteStoredImage(existing?.cover_image_path);
    }
  } else {
    const { error } = await supabase.from("blog_posts").insert(payload);

    if (error) {
      if (hasNewCover && coverUrl) await deleteStoredImage(coverUrl);
      if (error.code === "23505") {
        return { status: "error", errors: { slug: "That slug is already used." } };
      }
      return {
        status: "error",
        message: "The post could not be created. Try again.",
      };
    }
  }

  revalidatePath(`${STUDIO_BASE}/blogs`);
  redirect(`${STUDIO_BASE}/blogs?saved=${id ? "updated" : "created"}`);
}

export async function deletePost(
  _previous: DeleteState,
  formData: FormData,
): Promise<DeleteState> {
  const user = await getAdminUser();
  if (!user) redirect(STUDIO_LOGIN);

  const id = String(formData.get("id") ?? "");
  if (!id) return { status: "error", message: "Missing post id." };

  const supabase = await createSupabaseServerClient();
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("cover_image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return { status: "error", message: "The post could not be deleted." };
  }

  await deleteStoredImage(existing?.cover_image_path);

  revalidatePath(`${STUDIO_BASE}/blogs`);
  redirect(`${STUDIO_BASE}/blogs?saved=deleted`);
}
