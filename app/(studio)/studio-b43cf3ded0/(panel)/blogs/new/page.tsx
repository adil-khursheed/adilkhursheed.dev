import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BlogForm } from "@/components/admin/blog-form";
import { StudioPageHeader } from "@/components/admin/page-header";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = { title: "New post" };

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href={`${STUDIO_BASE}/blogs`}
        className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] lowercase text-foreground/45 transition-colors hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-3" />
        writing
      </Link>

      <StudioPageHeader
        title="New post"
        meta="starts as a draft"
        description="Shape the piece in the editor, add an optional cover, then keep it as a draft or mark it published."
      />

      <BlogForm />
    </div>
  );
}
