import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BlogForm } from "@/components/admin/blog-form";
import { StudioPageHeader } from "@/components/admin/page-header";
import { formatDate } from "@/lib/admin/format";
import { getAdminPost } from "@/lib/admin/posts";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAdminPost(id);

  if (!post) notFound();

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
        title={post.title}
        meta={`${post.status} · ${post.reading_minutes} min · updated ${formatDate(post.updated_at)}`}
        description="Drafts stay private. Publishing marks the post ready for the blog and stamps its publication date."
      />

      <BlogForm post={post} />
    </div>
  );
}
