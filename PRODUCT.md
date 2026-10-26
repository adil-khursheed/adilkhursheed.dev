# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Adil Khursheed's skills, experience, and shipped work to decide whether to make contact or interview. Secondary: prospective freelance clients assessing capability and trust, and peers/developers browsing projects, technical writing, and reusable components. The site is portfolio-first; the blog and component library support the same credibility goal rather than standing alone.

## Product Purpose

This is Adil Khursheed's personal site: a portfolio of real projects and technical capability, extended with a technical blog and a reusable component library. It exists to turn professional interest into contact and to give peers a useful reference. Success means a visitor quickly understands what Adil builds, sees credible evidence of it, and takes the next step (reach out, read more, or reuse a component).

## Positioning

The site combines a first-person engineering portfolio with two credibility multipliers a static portfolio cannot truthfully offer: a technical blog written from real building experience and a component library of genuinely reusable, production-grade UI pieces. Supabase-backed auth/content infrastructure supports the blog and components rather than being decorative.

## Operating Context

Visitors browse on desktop and mobile, in light and dark themes, scanning for evidence of capability. They move between a home introduction, projects, blog articles, and component examples. Peers may copy or adapt component code. The site is a public, always-available web surface with no login required for core content; authenticated capabilities may be added for content management.

## Capabilities and Constraints

Confirmed today: Next.js 16 App Router with React 19, Tailwind CSS 4, shadcn/Base UI primitives, Motion for animation, and Supabase (server/client/proxy + a public REST client). Shipped surfaces: the home page (annotated hero, About with portrait, a Leadlly role section with a four-screen viewer, a skills ledger, featured projects, and a contact form) and a `/projects` page with type and technology filters. Projects are read from a Supabase `projects` table through `lib/projects.ts` and carry a `personal` or `freelance` type; the contact form writes to Supabase-hosted `contact_messages`.

A private, owner-only studio at an unguessable route now backs the work and writing: magic-link sign-in limited to `ADMIN_EMAIL` plus an admin role, a ruled overview ledger, project create/edit with Supabase Storage cover images, and a Tiptap blog composer with draft/published status. It is excluded from navigation, search metadata, and `robots.txt`; writes are gated by server-side owner checks and row-level security. Public blog pages are not yet implemented, and the Components route remains linked but unbuilt.

Public pages ship with canonical URLs, indexable robots directives, a generated `sitemap.xml`, an Open Graph/Twitter card, and JSON-LD (Person, WebSite, ProfilePage, CollectionPage, ItemList, BreadcrumbList). `NEXT_PUBLIC_SITE_URL` overrides the default production origin used by canonical, sitemap, and social metadata.

Explicitly undecided: the final set of projects and case-study detail, the public blog reading surface, component inventory, whether component code is copyable/downloadable, and whether comments or other reader features ship. No pricing, client roster, metrics, or testimonials are established.

## Loading and Data

The `projects` table is the source of truth for the work sections; when it is empty or unreachable the UI renders deliberate empty states rather than failing. Pages that read projects set `revalidate = 60` so new rows appear without a redeploy. Legacy content images live under `public/projects` and `public/experience`; new studio uploads live in the public `project-images` bucket and are referenced by URL. Blog posts live in `blog_posts` with a draft or published status; only the studio reads them today.

## Brand Commitments

Name: Adil Khursheed. Voice: first-person, direct, technically fluent, no corporate third-person remove. Existing identity asset: the portrait at `public/adil-khursheed.jpg`. The hero states "Full Stack Web Developer" and the stack; preserve that factual framing unless Adil changes it.

## Evidence on Hand

Portrait image at `public/portrait/adil-khursheed.png` (the original `public/adil-khursheed.jpg` is retained). Stack evidence: TypeScript, React.js, Next.js, Node.js, Express.js, MongoDB, plus the current repository. Role evidence: Frontend Developer at Leadlly (Apr 2024–May 2026; past role) with four portal screenshots under `public/experience`. Ten real projects with repository and live links under `public/projects`.

Absences future work must not fill by invention: no testimonials, client logos, benchmarks, performance metrics, user counts, awards, or employment history have been provided.

## Product Principles

1. Evidence over assertion: show real work, real code, and real writing rather than claiming expertise.
2. One person, clearly: every surface should feel authored by Adil, not like a generic template or agency site.
3. Usefulness earns trust: the blog and component library must be genuinely useful to peers, not teasers.
4. Never fabricate: omit missing proof instead of inventing projects, metrics, or testimonials.
5. Fast and legible first: the site should load and scan quickly on ordinary devices before it impresses.
