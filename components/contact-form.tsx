"use client";

import { useActionState, useState } from "react";
import { ArrowRight01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { initialContactState } from "@/lib/contact";

const MAX_MESSAGE = 4000;

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[11px] lowercase text-foreground/65"
        >
          {label}
        </label>
        {hint}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactState,
  );
  const [messageLength, setMessageLength] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (state.status === "success" && !dismissed) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg bg-card p-6 ring-1 ring-foreground/10">
        <span className="font-mono text-[11px] lowercase text-primary">
          message sent
        </span>
        <h3 className="text-xl tracking-tight">Thanks — your message is in.</h3>
        <p className="max-w-[46ch] text-sm/6 text-foreground/70">
          I&apos;ll get back to you as soon as I can. If you want a head start,
          the projects page shows how I work.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setMessageLength(0);
            setDismissed(true);
          }}
          className="mt-1"
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="relative -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="name" error={state.errors?.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "name-error" : undefined
            }
            className="h-11 px-3 text-sm md:text-sm"
          />
        </Field>

        <Field id="email" label="email" error={state.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "email-error" : undefined
            }
            className="h-11 px-3 text-sm md:text-sm"
          />
        </Field>
      </div>

      <Field
        id="message"
        label="message"
        error={state.errors?.message}
        hint={
          <span className="font-mono text-[10px] text-foreground/65">
            {messageLength} / {MAX_MESSAGE}
          </span>
        }
      >
        <Textarea
          id="message"
          name="message"
          placeholder="What are you building, and where could I help?"
          required
          maxLength={MAX_MESSAGE}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          onChange={(event) => setMessageLength(event.target.value.length)}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={isPending} className="gap-2">
          {isPending ? (
            <HugeiconsIcon
              icon={Loading03Icon}
              className="size-3.5 animate-spin"
            />
          ) : (
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          )}
          {isPending ? "Sending" : "Send message"}
        </Button>
        {state.status === "error" && state.message ? (
          <p role="alert" className="text-xs text-destructive">
            {state.message}
          </p>
        ) : (
          <p className="font-mono text-[11px] lowercase text-foreground/65">
            no newsletters, just a reply
          </p>
        )}
      </div>
    </form>
  );
}
