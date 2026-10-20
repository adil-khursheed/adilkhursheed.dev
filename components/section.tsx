import type * as React from "react";

import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "line-before relative scroll-mt-24 px-2 py-16 max-sm:px-4 md:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
