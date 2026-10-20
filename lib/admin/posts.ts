import type { PostStatus } from "@/lib/admin/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  cover_image_path: string | null;
  status: PostStatus;
  reading_minutes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const columns =
  "id, slug, title, excerpt, content_html, cover_image_path, status, reading_minutes, published_at, created_at, updated_at";

export async function getAdminPosts(): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(columns)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as BlogPost[];
}

export async function getAdminPost(id: string): Promise<BlogPost | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(columns)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as BlogPost;
}
