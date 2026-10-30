"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { primaryUrl, ProjectLinks, TechList } from "@/components/project-parts";
import type { Project, ProjectType } from "@/lib/projects";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | ProjectType;

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "all work" },
  { value: "personal", label: "personal" },
  { value: "freelance", label: "freelance" },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const href = primaryUrl(project);

  return (
    <article
      id={project.slug}
      className="group grid scroll-mt-24 gap-6 md:grid-cols-12 md:items-center md:gap-10"
    >
      <div className={cn("md:col-span-7", flipped && "md:order-2")}>
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10">
            <Image
              src={project.image_path}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </Link>
      </div>

      <div className={cn("md:col-span-5", flipped && "md:order-1")}>
        <p className="flex items-center gap-2 font-mono text-[11px] text-foreground/65">
          {project.year ?? "—"}
          <span aria-hidden="true" className="text-foreground/30">
            /
          </span>
          {project.type}
        </p>
        <h3 className="mt-3 text-2xl tracking-tight md:text-3xl">
          <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-[46ch] text-sm/6 text-foreground/65">
          {project.summary}
        </p>
        <TechList items={project.tech_stack} className="mt-4" />
        <ProjectLinks project={project} className="mt-5" />
      </div>
    </article>
  );
}

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [type, setType] = useState<TypeFilter>("all");
  const [active, setActive] = useState("All");

  const ofType = useMemo(
    () =>
      type === "all"
        ? projects
        : projects.filter((project) => project.type === type),
    [projects, type],
  );

  const technologies = useMemo(() => {
    const set = new Set<string>();
    for (const project of ofType) {
      for (const tech of project.tech_stack) set.add(tech);
    }
    return ["All", ...Array.from(set)];
  }, [ofType]);

  const visible = useMemo(
    () =>
      active === "All"
        ? ofType
        : ofType.filter((project) => project.tech_stack.includes(active)),
    [active, ofType],
  );

  function chooseType(value: TypeFilter) {
    setType(value);
    setActive("All");
  }

  const filterButton = (selected: boolean) =>
    cn(
      "rounded-lg px-3 py-1.5 font-mono text-[11px] lowercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
      selected
        ? "bg-foreground text-background"
        : "text-foreground/65 ring-1 ring-border hover:text-foreground",
    );

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 border-b border-border pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] lowercase text-foreground/45">
            type
          </span>
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => chooseType(filter.value)}
              aria-pressed={type === filter.value}
              className={filterButton(type === filter.value)}
            >
              {filter.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] text-foreground/65">
            {String(visible.length).padStart(2, "0")} /{" "}
            {String(ofType.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] lowercase text-foreground/45">
            stack
          </span>
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActive(tech)}
              aria-pressed={active === tech}
              className={filterButton(active === tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {visible.length ? (
        <div className="flex flex-col gap-16 md:gap-24">
          {visible.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="max-w-[52ch] text-base/8 text-foreground/60">
          No projects match those filters yet. Try all work or choose another
          stack.
        </p>
      )}
    </div>
  );
}
