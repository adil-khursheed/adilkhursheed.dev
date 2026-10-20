import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { STUDIO_LOGIN } from "@/lib/admin/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { env } from "@/env";

export function adminEmail() {
  return env.ADMIN_EMAIL?.trim().toLowerCase() ?? null;
}

export function isOwnerEmail(user: User | null) {
  if (!user) return false;

  const owner = adminEmail();
  return Boolean(owner && user.email?.toLowerCase() === owner);
}

export function isAdminUser(user: User | null) {
  if (!user) return false;

  const owner = adminEmail();
  if (!owner) return false;

  return (
    user.email?.toLowerCase() === owner &&
    user.app_metadata?.role === "admin"
  );
}

export async function getSessionUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getAdminUser() {
  const user = await getSessionUser();
  return isAdminUser(user) ? user : null;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect(STUDIO_LOGIN);
  return user;
}
