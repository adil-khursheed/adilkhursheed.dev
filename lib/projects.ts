import { supabasePublic } from "@/lib/supabase/public";

export type ProjectType = "personal" | "freelance";

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tech_stack: string[];
  image_path: string;
  repo_url: string | null;
  live_url: string | null;
  featured: boolean;
  sort_order: number;
  year: number | null;
  type: ProjectType;
};

const columns =
  "id, slug, title, summary, tech_stack, image_path, repo_url, live_url, featured, sort_order, year, type";

function normalise(row: Project): Project {
  return {
    ...row,
    tech_stack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabasePublic
    .from("projects")
    .select(columns)
    .order("sort_order", { ascending: true })
    .order("year", { ascending: false });

  if (error || !data) return [];
  return (data as Project[]).map(normalise);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const { data, error } = await supabasePublic
    .from("projects")
    .select(columns)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error || !data) return [];
  return (data as Project[]).map(normalise);
}
