import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const messages: Record<string, string> = {
  created: "Saved. The new entry is in the archive.",
  updated: "Saved. Your changes are live.",
  deleted: "Deleted. The entry is gone.",
};

export function StudioNotice({ saved }: { saved?: string }) {
  const message = saved ? messages[saved] : undefined;
  if (!message) return null;

  return (
    <div
      role="status"
      className="mb-6 flex items-center gap-2 border-y border-border py-2.5 font-mono text-[11px] text-foreground/65"
    >
      <HugeiconsIcon
        icon={CheckmarkCircle02Icon}
        className="size-3.5 text-primary"
      />
      {message}
    </div>
  );
}
