---
version: 1
slug: "app-studio-studio-b43cf3ded0-page-tsx"
primary_target: "app/(studio)/studio-b43cf3ded0/page.tsx"
related_targets: []
---

# Studio surface brief

## Scope

Private, owner-only studio at an unguessable route under the existing portfolio. Mode: Operate. It inherits the established "Annotated Canvas" world rather than opening a new identity round. It covers sign-in, an overview ledger, project create/edit with Personal or Freelance type and Supabase Storage images, and blog create/edit with a rich text editor and draft/published status. Public blog pages are out of scope.

## Audience and job

Audience: Adil only, authenticated by magic link and an admin role. Job: see the current archive at a glance, add or edit a project in under a few minutes, upload its image, and draft writing without leaving the panel. Success: a new project or draft is saved, visible to the public site where applicable, and the panel never leaks into public navigation or search.

## Constraints

Single owner; no other account may reach the route or write through RLS. The panel must not appear in nav, sitemap, or metadata. Existing design tokens, typefaces, radii, hairlines, and flat-by-default depth are fixed. All editing happens through server actions; storage stays in the public `project-images` bucket.

## Direction contract

THESIS: A private working ledger inside the annotated canvas. It refuses the generic SaaS admin shell of stat cards, gradient sidebars, and floating panels; structure comes from ruled rows, mono annotations, and one signal accent.

OWN-WORLD: Paper white and true black anchors, hairline rules that escape the column, IBM Plex Mono for system labels, Outfit for all reading and controls, compact 18.8px radii, azure only on primary actions and current selection, never as a surface fill.

STORY: Adil signs in once, lands on a ledger of what already exists, and moves straight into adding a project or drafting a post. Every screen makes the private boundary and the save state legible.

FIRST VIEWPORT: A slim studio bar with the wordmark, "private · noindex" mono note, view-site link, and sign out. Below it, a ruled status strip with project, freelance, and draft counts, then the project ledger occupying the main column with an azure "new project" action. No hero, no cards.

FORM: Local extension of the incumbent Annotated Canvas; position one on the inherited-world path. No new direction roll was needed. seed: none (unavailable).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Finish review

Reviewed inline (no subagent capability) against desktop and 390px mobile captures at true device metrics. Verdict: ship. No overflow, no detector findings, no comp (code-led Operate surface). DESIGN.md and PRODUCT.md updated; no new rasters were produced, so no provenance is owed beyond the existing project imagery.
