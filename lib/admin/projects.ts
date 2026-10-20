import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/projects";

const columns =
  "id, slug, title, summary, tech_stack, image_path, repo_url, live_url, featured, sort_order, year, type";

export async function getAdminProjects(): Promise<Project[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(columns)
    .order("sort_order", { ascending: true })
    .order("year", { ascending: false });

  if (error || !data) return [];
  return data as Project[];
}

export async function getAdminProject(id: string): Promise<Project | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(columns)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Project;
}
