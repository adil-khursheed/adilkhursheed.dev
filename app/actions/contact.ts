"use server";

import { z } from "zod";

import type { ContactField, ContactState } from "@/lib/contact";
import { supabasePublic } from "@/lib/supabase/public";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name so I know who is writing.")
    .max(120, "That name is a little too long."),
  email: z
    .email("Enter an email address I can reply to.")
    .max(200, "That email is a little too long."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a sentence or two about what you need.")
    .max(4000, "Please keep it under 4000 characters."),
  website: z.string().max(0).optional(),
});

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  if (raw.website.trim().length > 0) {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors };
  }

  const { error } = await supabasePublic.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong on my side. Try again in a moment.",
    };
  }

  return { status: "success" };
}
