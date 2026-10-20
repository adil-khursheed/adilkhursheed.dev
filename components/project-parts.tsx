import {
  ArrowUpRightIcon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function primaryUrl(project: Project) {
  return (
    project.live_url ??
    project.repo_url ??
    "https://github.com/adil-khursheed"
  );
}

export function TechList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] lowercase text-foreground/65"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-[11px] lowercase",
        className,
      )}
    >
      {project.repo_url ? (
        <a
          href={project.repo_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground/65 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <HugeiconsIcon icon={SourceCodeIcon} className="size-3.5" />
          code
        </a>
      ) : null}
      {project.live_url ? (
        <a
          href={project.live_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground/65 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <HugeiconsIcon icon={ArrowUpRightIcon} className="size-3.5" />
          live
        </a>
      ) : null}
    </div>
  );
}
