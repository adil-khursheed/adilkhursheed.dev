"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  deletePost,
  savePost,
  type PostFormState,
} from "@/app/actions/admin-posts";
import { DeleteButton } from "@/components/admin/delete-button";
import { Field } from "@/components/admin/field";
import { ImageField } from "@/components/admin/image-field";
import { RichEditor } from "@/components/admin/rich-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { STUDIO_BASE } from "@/lib/admin/constants";
import { slugify } from "@/lib/admin/slug";
import type { BlogPost } from "@/lib/admin/posts";

const initialState: PostFormState = { status: "idle" };

export function BlogForm({ post }: { post?: BlogPost }) {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));

  return (
    <>
      <form action={formAction} noValidate className="flex flex-col gap-8">
        {post ? <input type="hidden" name="id" value={post.id} /> : null}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-w-0 flex-col gap-6">
            <Field id="title" label="title" error={state.errors?.title}>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (!slugTouched) setSlug(slugify(event.target.value));
                }}
                placeholder="Post title"
                required
                aria-invalid={Boolean(state.errors?.title)}
                className="h-12 px-3 text-lg tracking-tight md:text-lg"
              />
            </Field>

            <Field
              id="slug"
              label="slug"
              error={state.errors?.slug}
              description="The future article URL. Lowercase words separated by hyphens."
            >
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(event) => {
                  setSlug(slugify(event.target.value));
                  setSlugTouched(true);
                }}
                placeholder="post-title"
                required
                aria-invalid={Boolean(state.errors?.slug)}
                className="h-10 px-3 font-mono text-xs md:text-xs"
              />
            </Field>

            <Field
              id="excerpt"
              label="excerpt"
              error={state.errors?.excerpt}
              hint={
                <span className="font-mono text-[10px] text-foreground/45">
                  up to 320 characters
                </span>
              }
            >
              <Textarea
                id="excerpt"
                name="excerpt"
                defaultValue={post?.excerpt ?? ""}
                placeholder="One or two lines for the listing."
                aria-invalid={Boolean(state.errors?.excerpt)}
                className="min-h-20 px-3 py-2.5 text-sm md:text-sm"
              />
            </Field>

            <div className="border-t border-border pt-6">
              <RichEditor
                initialContent={post?.content_html ?? ""}
                error={state.errors?.content_html}
              />
            </div>
          </div>

          <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
            <section className="flex flex-col gap-2">
              <span className="font-mono text-[11px] lowercase text-foreground/65">
                status
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "draft", hint: "private" },
                  { value: "published", hint: "ready" },
                ].map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      defaultChecked={
                        (post?.status ?? "draft") === option.value
                      }
                      className="peer sr-only"
                    />
                    <span className="flex h-10 flex-col justify-center rounded-md px-3 ring-1 ring-border transition-colors peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50">
                      <span className="text-xs font-medium">{option.value}</span>
                      <span className="font-mono text-[9px] opacity-55">
                        {option.hint}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {state.errors?.status ? (
                <p role="alert" className="text-xs text-destructive">
                  {state.errors.status}
                </p>
              ) : null}
            </section>

            <ImageField
              name="cover"
              currentName="current_cover"
              initialUrl={post?.cover_image_path}
              error={state.errors?.cover}
              label="cover image"
              aspect="aspect-[16/9]"
              hint="Optional. Used by the future article listing."
            />

            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] lowercase text-foreground/45">
                save
              </p>
              <p className="mt-2 text-xs/5 text-foreground/55">
                Published posts are marked ready for the blog. Drafts stay
                private.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                className="mt-3 w-full gap-2"
              >
                {pending ? (
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    className="size-3.5 animate-spin"
                  />
                ) : null}
                {pending ? "Saving" : "Save post"}
              </Button>
              {state.status === "error" && state.message ? (
                <p role="alert" className="mt-3 text-xs text-destructive">
                  {state.message}
                </p>
              ) : null}
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] lowercase text-foreground/45">
                writing
              </p>
              <Link
                href={`${STUDIO_BASE}/blogs`}
                className="mt-2 inline-flex text-xs text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
              >
                back to the writing list
              </Link>
            </div>
          </aside>
        </div>
      </form>

      {post ? (
        <div className="mt-10 border-t border-border pt-4">
          <p className="font-mono text-[10px] lowercase text-foreground/45">
            danger
          </p>
          <p className="mt-1 mb-2 max-w-[52ch] text-xs/5 text-foreground/55">
            Deleting removes the post and its uploaded cover. This cannot be
            undone.
          </p>
          <DeleteButton
            action={deletePost}
            id={post.id}
            confirmation="Delete this post?"
          />
        </div>
      ) : null}
    </>
  );
}
