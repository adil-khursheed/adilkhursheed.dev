import Image from "next/image";
import Link from "next/link";

import { StudioPageHeader } from "@/components/admin/page-header";
import { getAdminPosts } from "@/lib/admin/posts";
import { getAdminProjects } from "@/lib/admin/projects";
import { formatDate } from "@/lib/admin/format";
import { STUDIO_BASE } from "@/lib/admin/constants";

const newLink =
  "inline-flex h-8 shrink-0 items-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export default async function StudioOverviewPage() {
  const [projects, posts] = await Promise.all([
    getAdminProjects(),
    getAdminPosts(),
  ]);

  const freelance = projects.filter(
    (project) => project.type === "freelance",
  ).length;
  const drafts = posts.filter((post) => post.status === "draft").length;
  const today = formatDate(new Date().toISOString());

  const stats = [
    { label: "projects", value: projects.length },
    { label: "freelance", value: freelance },
    { label: "posts", value: posts.length },
    { label: "drafts", value: drafts },
  ];

  return (
    <div className="flex flex-col gap-10">
      <StudioPageHeader
        title="Studio"
        meta={`private · ${today}`}
        description="Add work to the public archive or draft the next post. Projects publish the moment you save them; writing stays private until you mark it published."
      />

      <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background px-4 py-3.5">
            <dt className="font-mono text-[10px] lowercase text-foreground/45">
              {stat.label}
            </dt>
            <dd className="mt-1 text-2xl tracking-tight">
              {String(stat.value).padStart(2, "0")}
            </dd>
          </div>
        ))}
      </dl>

      <section>
        <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg tracking-tight">Projects</h2>
            <span className="font-mono text-[10px] text-foreground/45">
              {String(projects.length).padStart(2, "0")} entries
            </span>
          </div>
          <Link href={`${STUDIO_BASE}/projects/new`} className={newLink}>
            new project
          </Link>
        </div>

        {projects.length ? (
          <ul className="divide-y divide-border">
            {projects.slice(0, 6).map((project) => (
              <li key={project.id}>
                <Link
                  href={`${STUDIO_BASE}/projects/${project.id}`}
                  className="group flex items-center gap-4 py-3 focus-visible:outline-none"
                >
                  <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-foreground/10">
                    <Image
                      src={project.image_path}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium transition-colors group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] text-foreground/45">
                      {project.type} · {project.slug}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[10px] text-foreground/45 sm:block">
                    {project.year ?? "—"}
                  </span>
                  <span className="hidden w-16 shrink-0 text-right font-mono text-[10px] lowercase text-foreground/45 md:block">
                    {project.featured ? "featured" : "archive"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-b border-border py-8">
            <p className="text-sm text-foreground/65">
              No projects yet. Add the first one to populate the archive.
            </p>
            <Link
              href={`${STUDIO_BASE}/projects/new`}
              className="mt-3 inline-flex text-xs underline underline-offset-4 hover:text-foreground"
            >
              add a project
            </Link>
          </div>
        )}

        {projects.length > 6 ? (
          <Link
            href={`${STUDIO_BASE}/projects`}
            className="mt-3 inline-flex font-mono text-[10px] text-foreground/45 transition-colors hover:text-foreground"
          >
            all {projects.length} projects
          </Link>
        ) : null}
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg tracking-tight">Writing</h2>
            <span className="font-mono text-[10px] text-foreground/45">
              {String(posts.length).padStart(2, "0")} posts ·{" "}
              {String(drafts).padStart(2, "0")} drafts
            </span>
          </div>
          <Link href={`${STUDIO_BASE}/blogs/new`} className={newLink}>
            new post
          </Link>
        </div>

        {posts.length ? (
          <ul className="divide-y divide-border">
            {posts.slice(0, 5).map((post) => (
              <li key={post.id}>
                <Link
                  href={`${STUDIO_BASE}/blogs/${post.id}`}
                  className="group flex items-center gap-4 py-3 focus-visible:outline-none"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] text-foreground/45">
                      {post.slug} · {post.reading_minutes} min
                    </span>
                  </span>
                  <span
                    className={
                      post.status === "published"
                        ? "shrink-0 font-mono text-[10px] lowercase text-primary"
                        : "shrink-0 font-mono text-[10px] lowercase text-foreground/45"
                    }
                  >
                    {post.status}
                  </span>
                  <span className="hidden w-24 shrink-0 text-right font-mono text-[10px] text-foreground/45 sm:block">
                    {formatDate(post.updated_at)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-b border-border py-8">
            <p className="text-sm text-foreground/65">
              Nothing in the writing folder yet. Start a draft and shape it in
              the editor.
            </p>
            <Link
              href={`${STUDIO_BASE}/blogs/new`}
              className="mt-3 inline-flex text-xs underline underline-offset-4 hover:text-foreground"
            >
              start a draft
            </Link>
          </div>
        )}

        {posts.length > 5 ? (
          <Link
            href={`${STUDIO_BASE}/blogs`}
            className="mt-3 inline-flex font-mono text-[10px] text-foreground/45 transition-colors hover:text-foreground"
          >
            all {posts.length} posts
          </Link>
        ) : null}
      </section>
    </div>
  );
}
