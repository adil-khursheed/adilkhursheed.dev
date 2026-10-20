// Applies supabase/migrations/*.sql and supabase/seed.sql to a remote project
// through the Supabase Management API.
//
// Usage:
//   SUPABASE_ACCESS_TOKEN=sbp_xxx pnpm seed
// or put the token in .env.local (gitignored):
//   SUPABASE_ACCESS_TOKEN=sbp_xxx
//
// Requires a personal access token from https://supabase.com/dashboard/account/tokens

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv(file) {
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [
          line.slice(0, index).trim(),
          line
            .slice(index + 1)
            .trim()
            .replace(/^["']|["']$/g, ""),
        ];
      }),
  );
}

const env = {
  ...loadEnv(join(root, ".env")),
  ...loadEnv(join(root, ".env.local")),
  ...process.env,
};

const projectUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const token = env.SUPABASE_ACCESS_TOKEN;

if (!projectUrl || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ACCESS_TOKEN. Add the token to .env.local or pass it inline.",
  );
  process.exit(1);
}

const ref = new URL(projectUrl).hostname.split(".")[0];
const migrationsDir = join(root, "supabase", "migrations");

const files = [
  ...readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort()
    .map((file) => join(migrationsDir, file)),
  join(root, "supabase", "seed.sql"),
];

for (const file of files) {
  const query = readFileSync(file, "utf8");
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${ref}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );

  if (!response.ok) {
    console.error(`Failed on ${file} (${response.status})`);
    console.error(await response.text());
    process.exit(1);
  }

  console.log(`applied ${file.replace(root, "").replace(/\\/g, "/")}`);
}

console.log("Done.");
