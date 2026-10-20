import { createClient } from "@supabase/supabase-js";

import { env } from "@/env";

export const supabasePublic = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);
