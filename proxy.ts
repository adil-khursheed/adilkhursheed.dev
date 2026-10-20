import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { STUDIO_BASE, STUDIO_LOGIN } from "@/lib/admin/constants";
import { env } from "@/env";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isStudio =
    pathname === STUDIO_BASE || pathname.startsWith(`${STUDIO_BASE}/`);

  if (isStudio) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");

    const owner = env.ADMIN_EMAIL?.trim().toLowerCase();
    const allowed = Boolean(
      user &&
        owner &&
        user.email?.toLowerCase() === owner &&
        user.app_metadata?.role === "admin",
    );

    if (!allowed && pathname !== STUDIO_LOGIN) {
      const url = request.nextUrl.clone();
      url.pathname = STUDIO_LOGIN;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/studio-b43cf3ded0",
    "/studio-b43cf3ded0/:path*",
    "/auth/callback",
  ],
};
