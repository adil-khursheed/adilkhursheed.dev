import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ProjectForm } from "@/components/admin/project-form";
import { StudioPageHeader } from "@/components/admin/page-header";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = { title: "New project" };

export default function NewProjectPage() {
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
        title="New project"
        meta="publishes immediately"
        description="Two types: Personal for self-initiated work, Freelance for client work. The cover image goes to Supabase Storage."
      />

      <ProjectForm />
    </div>
  );
}
