import type * as React from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  meta,
  className,
}: {
  title: string;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-3",
        className,
      )}
    >
      <h2 className="text-3xl tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {meta ? (
        <p className="font-mono text-[11px] lowercase text-foreground/65">
          {meta}
        </p>
      ) : null}
    </div>
  );
}
