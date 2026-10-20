import Link from "next/link";

import { STUDIO_BASE } from "@/lib/admin/constants";

export default function StudioNotFound() {
  return (
    <div className="border-y border-border py-12">
      <p className="font-mono text-[10px] lowercase text-foreground/45">
        not found
      </p>
      <h1 className="mt-2 text-2xl tracking-tight">That entry is gone.</h1>
      <p className="mt-2 max-w-[48ch] text-sm/6 text-foreground/60">
        It may have been deleted, or the link is wrong. Head back to the
        studio overview.
      </p>
      <Link
        href={STUDIO_BASE}
        className="mt-4 inline-flex h-8 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        back to studio
      </Link>
    </div>
  );
}
