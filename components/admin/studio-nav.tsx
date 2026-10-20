"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { STUDIO_BASE } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

const items = [
  { label: "overview", href: STUDIO_BASE, exact: true },
  { label: "projects", href: `${STUDIO_BASE}/projects`, exact: false },
  { label: "writing", href: `${STUDIO_BASE}/blogs`, exact: false },
];

export function StudioNav({ orientation = "vertical" }: { orientation?: "vertical" | "horizontal" }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Studio"
      className={cn(
        orientation === "vertical"
          ? "flex flex-col gap-1"
          : "flex items-center gap-1 overflow-x-auto py-2",
      )}
    >
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              orientation === "vertical" && "pl-3",
              active
                ? "text-foreground"
                : "text-foreground/55 hover:text-foreground",
            )}
          >
            {orientation === "vertical" ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 size-1.5 rounded-full transition-colors",
                  active ? "bg-primary" : "bg-transparent",
                )}
              />
            ) : null}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
