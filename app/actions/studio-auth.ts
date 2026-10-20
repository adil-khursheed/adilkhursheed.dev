"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { adminEmail } from "@/lib/admin/auth";
import { STUDIO_BASE, STUDIO_LOGIN } from "@/lib/admin/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type MagicLinkState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldError?: string;
};

const emailSchema = z.email("Enter the owner email address.");

export async function requestMagicLink(
  _previous: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  const owner = adminEmail();

  if (!owner) {
    return {
      status: "error",
      message:
        "The studio is locked. ADMIN_EMAIL is not configured, so no one can sign in yet.",
    };
  }

  const parsed = emailSchema.safeParse(String(formData.get("email") ?? ""));

  if (!parsed.success) {
    return {
      status: "error",
      fieldError: parsed.error.issues[0]?.message ?? "Enter a valid email.",
    };
  }

  if (parsed.data.trim().toLowerCase() !== owner) {
    return { status: "sent" };
  }

  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: owner,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(STUDIO_BASE)}`,
    },
  });

  if (error) {
    return {
      status: "error",
      message: "The sign-in email could not be sent. Try again in a minute.",
    };
  }

  return { status: "sent" };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(STUDIO_LOGIN);
}
