-- Private studio support: project types, blog posts, admin-only writes, and
-- the public image bucket used by the panel.

-- ---------------------------------------------------------------------------
-- Admin identity
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Projects: type plus owner-only writes
-- ---------------------------------------------------------------------------

alter table public.projects add column if not exists type text;
update public.projects set type = 'personal' where type is null;
alter table public.projects alter column type set default 'personal';
alter table public.projects alter column type set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'projects_type_check'
  ) then
    alter table public.projects
      add constraint projects_type_check
      check (type in ('personal', 'freelance'));
  end if;
end $$;

create index if not exists projects_type_idx on public.projects (type);

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
  on public.projects
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant insert, update, delete on public.projects to authenticated;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row
  execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Blog posts: drafts are private, published posts are readable
-- ---------------------------------------------------------------------------

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content_html text not null default '',
  cover_image_path text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  reading_minutes integer not null default 1,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx
  on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc);

alter table public.blog_posts enable row level security;

drop policy if exists "Published posts are readable" on public.blog_posts;
create policy "Published posts are readable"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins manage posts" on public.blog_posts;
create policy "Admins manage posts"
  on public.blog_posts
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

revoke insert, update, delete on public.blog_posts from anon;
grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at
  before update on public.blog_posts
  for each row
  execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Storage: public reads, admin writes
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Project images are publicly readable" on storage.objects;
create policy "Project images are publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'project-images');

drop policy if exists "Admins upload project images" on storage.objects;
create policy "Admins upload project images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins update project images" on storage.objects;
create policy "Admins update project images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin())
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins delete project images" on storage.objects;
create policy "Admins delete project images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin());
