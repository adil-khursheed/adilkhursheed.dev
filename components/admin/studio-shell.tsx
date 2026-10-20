import Link from "next/link";

import { signOut } from "@/app/actions/studio-auth";
import { StudioNav } from "@/components/admin/studio-nav";
import { Button } from "@/components/ui/button";
import { STUDIO_BASE, STORAGE_BUCKET } from "@/lib/admin/constants";

export function StudioShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <a
        href="#studio-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-xs focus:text-background"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
          <Link
            href={STUDIO_BASE}
            className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-mono text-[10px] text-primary-foreground">
              AK
            </span>
            <span className="text-sm font-medium tracking-tight">studio</span>
            <span className="hidden font-mono text-[10px] text-foreground/50 sm:inline">
              private · noindex
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            <span className="mr-1 hidden font-mono text-[10px] text-foreground/45 lg:inline">
              {email}
            </span>
            <Link
              href="/"
              className="rounded-md px-2 py-1.5 text-xs text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              view site
            </Link>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">
                sign out
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border md:hidden">
          <div className="mx-auto max-w-6xl px-4">
            <StudioNav orientation="horizontal" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl items-start px-4 md:px-8">
        <aside className="sticky top-14 hidden w-48 shrink-0 self-start border-r border-border py-8 pr-6 md:block">
          <StudioNav />
          <div className="mt-8 border-t border-border pt-4">
            <p className="font-mono text-[10px] text-foreground/45">images</p>
            <p className="mt-1 break-all font-mono text-[10px] text-foreground/65">
              {STORAGE_BUCKET}
            </p>
          </div>
        </aside>

        <main
          id="studio-content"
          className="min-w-0 flex-1 py-8 md:max-w-[calc(72rem-12rem)] md:py-10 md:pl-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
