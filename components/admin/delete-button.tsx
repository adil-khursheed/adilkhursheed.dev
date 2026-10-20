"use client";

import { useActionState, useState } from "react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ActionResult = {
  status: "idle" | "error";
  message?: string;
};

export function DeleteButton({
  action,
  id,
  label = "delete",
  confirmation = "Delete this entry?",
}: {
  action: (previous: ActionResult, formData: FormData) => Promise<ActionResult>;
  id: string;
  label?: string;
  confirmation?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {
    status: "idle",
  } as ActionResult);
  const [confirming, setConfirming] = useState(false);

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={id} />

      {confirming ? (
        <>
          <span className="font-mono text-[10px] text-foreground/65">
            {confirmation}
          </span>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-7 items-center gap-1.5 rounded-md bg-destructive/10 px-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/25 disabled:pointer-events-none disabled:opacity-50"
          >
            {pending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                className="size-3.5 animate-spin"
              />
            ) : null}
            yes, delete
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="inline-flex h-7 items-center rounded-md px-2 text-xs text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            keep
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex h-7 items-center rounded-md px-2 font-mono text-[10px] lowercase text-foreground/45 transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/25"
        >
          {label}
        </button>
      )}

      {state.status === "error" && state.message ? (
        <span role="alert" className="text-[11px] text-destructive">
          {state.message}
        </span>
      ) : null}
    </form>
  );
}
