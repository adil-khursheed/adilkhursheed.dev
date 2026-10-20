"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  deleteProject,
  saveProject,
  type ProjectFormState,
} from "@/app/actions/admin-projects";
import { DeleteButton } from "@/components/admin/delete-button";
import { Field } from "@/components/admin/field";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/admin/slug";
import { STUDIO_BASE } from "@/lib/admin/constants";
import type { Project } from "@/lib/projects";

const initialState: ProjectFormState = { status: "idle" };

export function ProjectForm({ project }: { project?: Project }) {
  const [state, formAction, pending] = useActionState(
    saveProject,
    initialState,
  );
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));

  return (
    <>
      <form action={formAction} noValidate className="flex flex-col gap-8">
        {project ? <input type="hidden" name="id" value={project.id} /> : null}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-w-0 flex-col gap-8">
            <section className="grid gap-5 border-t border-border pt-6">
              <h2 className="font-mono text-[10px] lowercase text-foreground/45">
                details
              </h2>

              <Field id="title" label="title" error={state.errors?.title}>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    if (!slugTouched) setSlug(slugify(event.target.value));
                  }}
                  placeholder="Project name"
                  required
                  aria-invalid={Boolean(state.errors?.title)}
                  className="h-10 px-3 text-sm md:text-sm"
                />
              </Field>

              <Field
                id="slug"
                label="slug"
                error={state.errors?.slug}
                description="Lives in the URL and the database. Lowercase words separated by hyphens."
              >
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(event) => {
                    setSlug(slugify(event.target.value));
                    setSlugTouched(true);
                  }}
                  placeholder="project-name"
                  required
                  aria-invalid={Boolean(state.errors?.slug)}
                  className="h-10 px-3 font-mono text-xs md:text-xs"
                />
              </Field>

              <Field
                id="summary"
                label="summary"
                error={state.errors?.summary}
                hint={
                  <span className="font-mono text-[10px] text-foreground/45">
                    one or two sentences
                  </span>
                }
              >
                <Textarea
                  id="summary"
                  name="summary"
                  defaultValue={project?.summary ?? ""}
                  placeholder="What is it, and what did you build?"
                  required
                  aria-invalid={Boolean(state.errors?.summary)}
                  className="min-h-28 px-3 py-2.5 text-sm md:text-sm"
                />
              </Field>

              <Field
                id="tech"
                label="technology"
                error={state.errors?.tech}
                description="Separate entries with commas."
              >
                <Input
                  id="tech"
                  name="tech"
                  defaultValue={project?.tech_stack.join(", ") ?? ""}
                  placeholder="Next.js, TypeScript, Supabase"
                  aria-invalid={Boolean(state.errors?.tech)}
                  className="h-10 px-3 text-sm md:text-sm"
                />
              </Field>
            </section>

            <section className="grid gap-5 border-t border-border pt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <fieldset className="flex flex-col gap-2">
                  <legend className="font-mono text-[11px] lowercase text-foreground/65">
                    type
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "personal", hint: "self-initiated" },
                      { value: "freelance", hint: "client work" },
                    ].map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          defaultChecked={
                            (project?.type ?? "personal") === option.value
                          }
                          className="peer sr-only"
                        />
                        <span className="flex h-10 flex-col justify-center rounded-md px-3 ring-1 ring-border transition-colors peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50">
                          <span className="text-xs font-medium">
                            {option.value}
                          </span>
                          <span className="font-mono text-[9px] opacity-55">
                            {option.hint}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {state.errors?.type ? (
                    <p role="alert" className="text-xs text-destructive">
                      {state.errors.type}
                    </p>
                  ) : null}
                </fieldset>

                <div className="grid grid-cols-2 gap-4">
                  <Field id="year" label="year" error={state.errors?.year}>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      inputMode="numeric"
                      min={2000}
                      max={2100}
                      defaultValue={project?.year ?? ""}
                      placeholder="2025"
                      aria-invalid={Boolean(state.errors?.year)}
                      className="h-10 px-3 text-sm md:text-sm"
                    />
                  </Field>
                  <Field
                    id="sort_order"
                    label="order"
                    error={state.errors?.sort_order}
                  >
                    <Input
                      id="sort_order"
                      name="sort_order"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={9999}
                      defaultValue={project?.sort_order ?? 0}
                      aria-invalid={Boolean(state.errors?.sort_order)}
                      className="h-10 px-3 text-sm md:text-sm"
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="grid gap-5 border-t border-border pt-6">
              <h2 className="font-mono text-[10px] lowercase text-foreground/45">
                links
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="live_url"
                  label="live url"
                  error={state.errors?.live_url}
                >
                  <Input
                    id="live_url"
                    name="live_url"
                    type="url"
                    defaultValue={project?.live_url ?? ""}
                    placeholder="https://..."
                    aria-invalid={Boolean(state.errors?.live_url)}
                    className="h-10 px-3 text-sm md:text-sm"
                  />
                </Field>
                <Field
                  id="repo_url"
                  label="repo url"
                  error={state.errors?.repo_url}
                >
                  <Input
                    id="repo_url"
                    name="repo_url"
                    type="url"
                    defaultValue={project?.repo_url ?? ""}
                    placeholder="https://github.com/..."
                    aria-invalid={Boolean(state.errors?.repo_url)}
                    className="h-10 px-3 text-sm md:text-sm"
                  />
                </Field>
              </div>
            </section>

            <section className="border-t border-border pt-2">
              <label className="flex cursor-pointer items-center justify-between gap-6 border-b border-border py-4">
                <span>
                  <span className="block text-sm">Featured</span>
                  <span className="mt-0.5 block text-[11px] text-foreground/45">
                    Show in the featured selection on the home page.
                  </span>
                </span>
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={project?.featured ?? false}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="relative h-5 w-9 shrink-0 rounded-full bg-muted ring-1 ring-border transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-foreground/45 after:transition-transform peer-checked:bg-primary/20 peer-checked:ring-primary/50 peer-checked:after:translate-x-4 peer-checked:after:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50"
                />
              </label>
            </section>
          </div>

          <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
            <ImageField
              name="image"
              currentName="current_image"
              initialUrl={project?.image_path}
              error={state.errors?.image}
              label="cover image"
              hint="A 16:10 screenshot reads best in the project rows."
            />

            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] lowercase text-foreground/45">
                save
              </p>
              <p className="mt-2 text-xs/5 text-foreground/55">
                Saving publishes the project to the public archive
                immediately.
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
                {pending ? "Saving" : "Save project"}
              </Button>
              {state.status === "error" && state.message ? (
                <p role="alert" className="mt-3 text-xs text-destructive">
                  {state.message}
                </p>
              ) : null}
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-mono text-[10px] lowercase text-foreground/45">
                public view
              </p>
              <Link
                href="/projects"
                target="_blank"
                className="mt-2 inline-flex text-xs text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
              >
                open the archive
              </Link>
            </div>
          </aside>
        </div>
      </form>

      {project ? (
        <div className="mt-10 border-t border-border pt-4">
          <p className="font-mono text-[10px] lowercase text-foreground/45">
            danger
          </p>
          <p className="mt-1 mb-2 max-w-[52ch] text-xs/5 text-foreground/55">
            Deleting removes the project from the archive and deletes its
            uploaded image. This cannot be undone.
          </p>
          <DeleteButton
            action={deleteProject}
            id={project.id}
            confirmation="Delete this project?"
          />
        </div>
      ) : (
        <p className="mt-10 border-t border-border pt-4 font-mono text-[10px] text-foreground/40">
          <Link href={`${STUDIO_BASE}/projects`} className="hover:text-foreground">
            back to projects
          </Link>
        </p>
      )}
    </>
  );
}
