import type { Metadata } from "next";

import { StudioShell } from "@/components/admin/studio-shell";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return <StudioShell email={user.email ?? ""}>{children}</StudioShell>;
}
