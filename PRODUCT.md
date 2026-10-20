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

Confirmed today: Next.js 16 App Router with React 19, Tailwind CSS 4, shadcn/Base UI primitives, Motion for animation, and Supabase (server/client/middleware + a public REST client). Shipped surfaces: the home page (annotated hero, About with portrait, a Leadlly role section with a four-screen viewer, a skills ledger, featured projects, and a contact form) and a `/projects` page with a technology filter. Projects are read from a Supabase `projects` table through `lib/projects.ts`; the contact form writes to `supabase`-hosted `contact_messages`. Blog and Components routes remain linked in navigation but are not yet implemented.

Explicitly undecided: the final set of projects and case-study detail, blog publishing workflow, component inventory, whether component code is copyable/downloadable, and which Supabase-backed features (auth, comments, CMS) ship. No pricing, client roster, metrics, or testimonials are established. The Blog and Components routes are still open questions.

## Loading and Data

The `projects` table is the source of truth for the work sections; when it is empty or unreachable the UI renders deliberate empty states rather than failing. Pages that read projects set `revalidate = 60` so new rows appear without a redeploy. Content images live under `public/projects` and `public/experience`.

## Brand Commitments

Name: Adil Khursheed. Voice: first-person, direct, technically fluent, no corporate third-person remove. Existing identity asset: the portrait at `public/adil-khursheed.jpg`. The hero states "Full Stack Web Developer" and the stack; preserve that factual framing unless Adil changes it.

## Evidence on Hand

Portrait image at `public/portrait/adil-khursheed.png` (the original `public/adil-khursheed.jpg` is retained). Stack evidence: TypeScript, React.js, Next.js, Node.js, Express.js, MongoDB, plus the current repository. Role evidence: Frontend Developer at Leadlly (Apr 2024–present) with four portal screenshots under `public/experience`. Ten real projects with repository and live links under `public/projects`.

Absences future work must not fill by invention: no testimonials, client logos, benchmarks, performance metrics, user counts, awards, or employment history have been provided.

## Product Principles

1. Evidence over assertion: show real work, real code, and real writing rather than claiming expertise.
2. One person, clearly: every surface should feel authored by Adil, not like a generic template or agency site.
3. Usefulness earns trust: the blog and component library must be genuinely useful to peers, not teasers.
4. Never fabricate: omit missing proof instead of inventing projects, metrics, or testimonials.
5. Fast and legible first: the site should load and scan quickly on ordinary devices before it impresses.
