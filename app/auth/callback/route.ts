import { NextResponse, type NextRequest } from "next/server";

import { isAdminUser, isOwnerEmail } from "@/lib/admin/auth";
import { STUDIO_BASE, STUDIO_LOGIN } from "@/lib/admin/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext && requestedNext.startsWith(STUDIO_BASE)
      ? requestedNext
      : STUDIO_BASE;

  const supabase = await createSupabaseServerClient();
  let verified = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    verified = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "magiclink" | "email",
    });
    verified = !error;
  }

  if (!verified) {
    return NextResponse.redirect(new URL(`${STUDIO_LOGIN}?error=link`, origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminUser(user)) {
    return NextResponse.redirect(new URL(next, origin));
  }

  if (isOwnerEmail(user)) {
    return NextResponse.redirect(
      new URL(`${STUDIO_LOGIN}?error=provision`, origin),
    );
  }

  await supabase.auth.signOut();
  return NextResponse.redirect(
    new URL(`${STUDIO_LOGIN}?error=denied`, origin),
  );
}
