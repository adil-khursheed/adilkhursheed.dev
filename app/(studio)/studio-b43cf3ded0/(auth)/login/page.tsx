import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/actions/studio-auth";
import { MagicLinkForm } from "@/components/admin/magic-link-form";
import { Button } from "@/components/ui/button";
import {
  getSessionUser,
  isAdminUser,
  isOwnerEmail,
} from "@/lib/admin/auth";
import { STUDIO_BASE } from "@/lib/admin/constants";

export const metadata: Metadata = {
  title: "Studio access",
  robots: { index: false, follow: false },
};

const notices: Record<string, string> = {
  link: "That sign-in link is invalid or has expired. Request a fresh one below.",
  denied: "That account is not the owner. The session has been signed out.",
};

export default async function StudioLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getSessionUser();

  if (isAdminUser(user)) redirect(STUDIO_BASE);

  const { error } = await searchParams;
  const ownerButUnprovisioned = isOwnerEmail(user);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2.5 self-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <span className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-[10px] text-primary-foreground">
          AK
        </span>
        <span className="text-sm font-medium tracking-tight">studio</span>
      </Link>

      <h1 className="text-3xl tracking-tight sm:text-4xl">Studio access</h1>
      <p className="mt-4 text-sm/6 text-foreground/65">
        This area is private. Sign in with the owner email and the link will
        arrive in that inbox.
      </p>

      <div className="mt-8 border-t border-border pt-6">
        {ownerButUnprovisioned ? (
          <div className="mb-6 border border-border bg-card p-4">
            <p className="text-sm/6 text-foreground/75">
              You are signed in, but this account is not provisioned for studio
              access yet.
            </p>
            <p className="mt-2 font-mono text-[10px] text-foreground/55">
              run pnpm bootstrap:admin, then refresh
            </p>
            <form action={signOut} className="mt-3">
              <Button type="submit" variant="outline" size="sm">
                sign out
              </Button>
            </form>
          </div>
        ) : null}

        {error && notices[error] ? (
          <p
            role="alert"
            className="mb-6 text-xs text-destructive"
          >
            {notices[error]}
          </p>
        ) : null}

        <MagicLinkForm />

        <p className="mt-8 border-t border-border pt-4 font-mono text-[10px] text-foreground/45">
          only the owner address can complete this sign-in
        </p>
      </div>
    </div>
  );
}
