This is Adil Khursheed's portfolio: Next.js 16, React 19, Tailwind CSS 4, and Supabase.

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy the existing `.env` values into `.env.local` for local overrides. Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
ADMIN_EMAIL=
SUPABASE_ACCESS_TOKEN=
```

`SUPABASE_ACCESS_TOKEN` is only needed by `pnpm seed` and `pnpm bootstrap:admin`; it is never sent to the browser.

## Studio

The private studio lives at `/studio-b43cf3ded0` and is not linked from public navigation, sitemap, or robots.

1. Set `ADMIN_EMAIL` in `.env.local` to the owner address.
2. Run `pnpm bootstrap:admin` once. This creates or upgrades the owner account, grants `app_metadata.role = "admin"`, sets the auth redirect allowlist, and disables sign-ups.
3. Visit `/studio-b43cf3ded0/login` and request a magic link.

Project covers upload to the public `project-images` Supabase Storage bucket. Blog posts are stored in `blog_posts`; the public reading surface is not built yet.

## Database

Apply the migration and seed data with:

```bash
pnpm seed
```

The schema lives in `supabase/migrations/`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
