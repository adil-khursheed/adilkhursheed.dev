// Provisions the single studio owner and locks sign-ups.
//
// Usage:
//   1. Add ADMIN_EMAIL=you@example.com to .env.local (or .env).
//   2. pnpm bootstrap:admin
//
// Uses the Supabase Management API token already present as
// SUPABASE_ACCESS_TOKEN. The service role key is fetched at runtime and never
// written to disk.

import { existsSync, readFileSync } from "node:fs";
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
const adminEmail = (env.ADMIN_EMAIL || "").trim().toLowerCase();
const siteUrl = (env.NEXT_PUBLIC_SITE_URL || "https://adilkhursheed.vercel.app")
  .trim()
  .replace(/\/$/, "");

if (!projectUrl || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env.local.",
  );
  process.exit(1);
}

if (!adminEmail) {
  console.error("Add ADMIN_EMAIL=you@example.com to .env.local first.");
  process.exit(1);
}

const ref = new URL(projectUrl).hostname.split(".")[0];
const managementHeaders = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

async function management(path, init = {}) {
  const response = await fetch(`https://api.supabase.com/v1${path}`, {
    ...init,
    headers: { ...managementHeaders, ...(init.headers || {}) },
  });

  if (!response.ok) {
    console.error(`Supabase management API ${path} failed (${response.status})`);
    console.error(await response.text());
    process.exit(1);
  }

  return response.json();
}

const keys = await management(`/projects/${ref}/api-keys`);
const serviceKey = keys.find(
  (key) => key.name === "service_role" || key.type === "secret",
)?.api_key;

if (!serviceKey) {
  console.error("No service role key returned by the management API.");
  process.exit(1);
}

const authHeaders = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
};

async function auth(path, init = {}) {
  const response = await fetch(`${projectUrl}/auth/v1${path}`, {
    ...init,
    headers: { ...authHeaders, ...(init.headers || {}) },
  });

  if (!response.ok) {
    console.error(`Auth admin API ${path} failed (${response.status})`);
    console.error(await response.text());
    process.exit(1);
  }

  return response.status === 204 ? null : response.json();
}

const users = await auth("/admin/users?page=1&per_page=200");
let owner = (users.users ?? []).find(
  (user) => user.email?.toLowerCase() === adminEmail,
);

if (!owner) {
  owner = await auth("/admin/users", {
    method: "POST",
    body: JSON.stringify({ email: adminEmail, email_confirm: true }),
  });
  console.log(`created owner account ${adminEmail}`);
} else {
  console.log(`found owner account ${adminEmail}`);
}

await auth(`/admin/users/${owner.id}`, {
  method: "PUT",
  body: JSON.stringify({
    app_metadata: { ...(owner.app_metadata ?? {}), role: "admin" },
  }),
});
console.log("granted app_metadata.role = admin");

const allowList = [
  `${siteUrl}/**`,
  "http://localhost:3000/**",
  "http://localhost:3001/**",
  "http://127.0.0.1:3000/**",
  "http://127.0.0.1:3001/**",
].join(",");

await management(`/projects/${ref}/config/auth`, {
  method: "PATCH",
  body: JSON.stringify({
    site_url: siteUrl,
    uri_allow_list: allowList,
    disable_signup: true,
  }),
});
console.log(`site url set to ${siteUrl}`);
console.log("allow list set for production and localhost");
console.log("sign-ups disabled");

console.log("");
console.log("Studio is ready. Sign in with a magic link:");
console.log(`  ${siteUrl}/studio-b43cf3ded0/login`);
