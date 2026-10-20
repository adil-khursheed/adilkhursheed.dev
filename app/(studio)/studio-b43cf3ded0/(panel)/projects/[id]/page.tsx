import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ProjectForm } from "@/components/admin/project-form";
import { StudioPageHeader } from "@/components/admin/page-header";
import { getAdminProject } from "@/lib/admin/projects";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getAdminProject(id);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-8">
      <Link
        href={`${STUDIO_BASE}/projects`}
        className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] lowercase text-foreground/45 transition-colors hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-3" />
        projects
      </Link>

      <StudioPageHeader
        title={project.title}
        meta={`${project.type} · ${project.slug}`}
        description="Changes save straight to the public archive. Replace the image to upload a new file; saving deletes the old upload."
      />

      <ProjectForm project={project} />
    </div>
  );
}
