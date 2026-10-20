import type { Metadata } from "next";
import Link from "next/link";

import { deletePost } from "@/app/actions/admin-posts";
import { DeleteButton } from "@/components/admin/delete-button";
import { StudioNotice } from "@/components/admin/notice";
import { StudioPageHeader } from "@/components/admin/page-header";
import { formatDate } from "@/lib/admin/format";
import { getAdminPosts } from "@/lib/admin/posts";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = { title: "Writing" };

export default async function StudioBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [posts, { saved }] = await Promise.all([getAdminPosts(), searchParams]);
  const drafts = posts.filter((post) => post.status === "draft").length;

  return (
    <div className="flex flex-col gap-8">
      <StudioPageHeader
        title="Writing"
        meta={`${String(posts.length).padStart(2, "0")} posts · ${String(drafts).padStart(2, "0")} drafts`}
        description="Draft in the editor, keep it private, and mark it published when it is ready. The public blog surface is not built yet; published posts are prepared for it."
        action={
          <Link
            href={`${STUDIO_BASE}/blogs/new`}
            className="inline-flex h-8 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            new post
          </Link>
        }
      />

      <StudioNotice saved={saved} />

      {posts.length ? (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li
              key={post.id}
              className="grid grid-cols-1 items-center gap-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Link
                    href={`${STUDIO_BASE}/blogs/${post.id}`}
                    className="truncate text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={
                      post.status === "published"
                        ? "font-mono text-[9px] lowercase text-primary"
                        : "font-mono text-[9px] lowercase text-foreground/45"
                    }
                  >
                    {post.status}
                  </span>
                </div>
                <p className="mt-0.5 truncate font-mono text-[10px] text-foreground/45">
                  {post.slug} · {post.reading_minutes} min · updated{" "}
                  {formatDate(post.updated_at)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Link
                  href={`${STUDIO_BASE}/blogs/${post.id}`}
                  className="inline-flex h-7 items-center rounded-md px-2 font-mono text-[10px] lowercase text-foreground/55 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  edit
                </Link>
                <DeleteButton
                  action={deletePost}
                  id={post.id}
                  confirmation="Delete this post?"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-y border-border py-12">
          <p className="font-mono text-[10px] lowercase text-foreground/45">
            empty folder
          </p>
          <h2 className="mt-2 text-xl tracking-tight">No posts yet.</h2>
          <p className="mt-2 max-w-[52ch] text-sm/6 text-foreground/60">
            Start with a draft. The rich editor supports headings, lists,
            quotes, code, and links, and nothing goes public until you publish.
          </p>
          <Link
            href={`${STUDIO_BASE}/blogs/new`}
            className="mt-4 inline-flex h-8 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            start a draft
          </Link>
        </div>
      )}
    </div>
  );
}
