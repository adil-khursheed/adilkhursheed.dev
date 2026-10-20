"use client";

import { useActionState } from "react";
import { Loading03Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { requestMagicLink, type MagicLinkState } from "@/app/actions/studio-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: MagicLinkState = { status: "idle" };

export function MagicLinkForm() {
  const [state, formAction, pending] = useActionState(
    requestMagicLink,
    initialState,
  );

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.status === "sent" ? (
        <div className="border border-border bg-card p-3">
          <p className="font-mono text-[10px] text-primary">link requested</p>
          <p className="mt-1 text-xs/5 text-foreground/65">
            If that address belongs to the owner, a sign-in link is on its way.
            It can take a minute and may land in spam.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-mono text-[11px] lowercase text-foreground/65"
        >
          owner email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          aria-invalid={Boolean(state.fieldError)}
          aria-describedby={state.fieldError ? "email-error" : undefined}
          className="h-11 px-3 text-sm md:text-sm"
        />
        {state.fieldError ? (
          <p id="email-error" role="alert" className="text-xs text-destructive">
            {state.fieldError}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="gap-2 self-start">
        {pending ? (
          <HugeiconsIcon
            icon={Loading03Icon}
            className="size-3.5 animate-spin"
          />
        ) : (
          <HugeiconsIcon icon={Mail01Icon} className="size-3.5" />
        )}
        {pending ? "Sending link" : "Email me a link"}
      </Button>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-xs text-destructive">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
