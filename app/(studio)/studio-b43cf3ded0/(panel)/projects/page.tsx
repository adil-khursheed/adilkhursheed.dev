import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DeleteButton } from "@/components/admin/delete-button";
import { StudioNotice } from "@/components/admin/notice";
import { StudioPageHeader } from "@/components/admin/page-header";
import { deleteProject } from "@/app/actions/admin-projects";
import { getAdminProjects } from "@/lib/admin/projects";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = { title: "Projects" };

export default async function StudioProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [projects, { saved }] = await Promise.all([
    getAdminProjects(),
    searchParams,
  ]);

  const freelance = projects.filter(
    (project) => project.type === "freelance",
  ).length;

  return (
    <div className="flex flex-col gap-8">
      <StudioPageHeader
        title="Projects"
        meta={`${String(projects.length).padStart(2, "0")} entries · ${freelance} freelance`}
        description="Every row here appears in the public archive. Type separates self-initiated work from client work; order controls where it sits."
        action={
          <Link
            href={`${STUDIO_BASE}/projects/new`}
            className="inline-flex h-8 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            new project
          </Link>
        }
      />

      <StudioNotice saved={saved} />

      {projects.length ? (
        <ul className="divide-y divide-border border-y border-border">
          {projects.map((project) => (
            <li
              key={project.id}
              className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4 py-3 sm:grid-cols-[72px_minmax(0,1fr)_auto]"
            >
              <Link
                href={`${STUDIO_BASE}/projects/${project.id}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-md bg-muted ring-1 ring-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                aria-label={`Edit ${project.title}`}
              >
                <Image
                  src={project.image_path}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover object-top transition-transform group-hover:scale-[1.03]"
                />
              </Link>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Link
                    href={`${STUDIO_BASE}/projects/${project.id}`}
                    className="truncate text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {project.title}
                  </Link>
                  {project.featured ? (
                    <span className="font-mono text-[9px] lowercase text-primary">
                      featured
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 truncate font-mono text-[10px] text-foreground/45">
                  {project.type} · {project.slug} · {project.year ?? "no year"}
                </p>
              </div>

              <div className="col-span-2 flex flex-wrap items-center gap-2 sm:col-span-1 sm:justify-end">
                <Link
                  href={`${STUDIO_BASE}/projects/${project.id}`}
                  className="inline-flex h-7 items-center rounded-md px-2 font-mono text-[10px] lowercase text-foreground/55 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  edit
                </Link>
                <DeleteButton
                  action={deleteProject}
                  id={project.id}
                  confirmation="Delete this project?"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-y border-border py-12">
          <p className="font-mono text-[10px] lowercase text-foreground/45">
            empty archive
          </p>
          <h2 className="mt-2 text-xl tracking-tight">No projects yet.</h2>
          <p className="mt-2 max-w-[52ch] text-sm/6 text-foreground/60">
            Add the first project and it will appear on the public projects
            page immediately, with its Personal or Freelance type.
          </p>
          <Link
            href={`${STUDIO_BASE}/projects/new`}
            className="mt-4 inline-flex h-8 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            add a project
          </Link>
        </div>
      )}
    </div>
  );
}
