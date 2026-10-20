-- Portfolio tables: the project archive (read-only to visitors) and the
-- contact inbox (write-only to visitors).

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  tech_stack text[] not null default '{}',
  image_path text not null,
  repo_url text,
  live_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  year integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_order_idx
  on public.projects (sort_order);

alter table public.projects enable row level security;

drop policy if exists "Projects are publicly readable" on public.projects;
create policy "Projects are publicly readable"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Visitors can read projects and nothing else. Writes happen from the dashboard.
revoke insert, update, delete on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (
    char_length(email) <= 200
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  message text not null check (char_length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can send a message" on public.contact_messages;
create policy "Anyone can send a message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Visitors can only submit; the inbox is not publicly readable.
revoke select, update, delete on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
