import type * as React from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  meta,
  className,
  as: Heading = "h2",
}: {
  title: string;
  meta?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-3",
        className,
      )}
    >
      <Heading className="text-3xl tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {meta ? (
        <p className="font-mono text-[11px] lowercase text-foreground/65">
          {meta}
        </p>
      ) : null}
    </div>
  );
}
