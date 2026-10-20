---
name: Adil Khursheed
description: A technical portfolio built on an annotated design canvas.
colors:
  azure-signal: "oklch(0.6723 0.1606 244.9955)"
  azure-signal-dark: "oklch(0.6692 0.1607 245.011)"
  azure-wash: "oklch(0.9392 0.0166 250.8453)"
  azure-wash-dark: "oklch(0.1928 0.0331 242.5459)"
  ink: "oklch(0.1884 0.0128 248.5103)"
  paper: "oklch(1 0 0)"
  void: "oklch(0 0 0)"
  chalk: "oklch(0.9328 0.0025 228.7857)"
  card-light: "oklch(0.9784 0.0011 197.1387)"
  card-dark: "oklch(0.2097 0.008 274.5332)"
  mist: "oklch(0.9222 0.0013 286.3737)"
  mist-dark: "oklch(0.209 0 0)"
  muted-ink-dark: "oklch(0.5637 0.0078 247.9662)"
  border-light: "oklch(0.9317 0.0118 231.6594)"
  border-dark: "oklch(0.2674 0.0047 248.0045)"
  input-light: "oklch(0.9809 0.0025 228.7836)"
  input-dark: "oklch(0.302 0.0288 244.8244)"
  destructive: "oklch(0.6188 0.2376 25.7658)"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, sans-serif, system-ui"
    fontSize: "6rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Outfit, ui-sans-serif, sans-serif, system-ui"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "2.25rem"
    letterSpacing: "0.025em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1.5rem"
    letterSpacing: "0.025em"
  label-sm:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: "1.25rem"
    letterSpacing: "0.025em"
  label-xs:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: "1.5rem"
    letterSpacing: "0.025em"
rounded:
  sm: "16.8px"
  md: "18.8px"
  lg: "20.8px"
  xl: "24.8px"
  2xl: "37.44px"
  3xl: "45.76px"
  4xl: "54.08px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  nav-shell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px"
  button-primary:
    backgroundColor: "{colors.azure-signal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    height: "28px"
    padding: "0 8px"
  button-primary-hover:
    backgroundColor: "oklch(0.6723 0.1606 244.9955 / 0.8)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: "28px"
  input:
    backgroundColor: "{colors.input-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "28px"
    padding: "0 8px"
  card:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  avatar:
    size: "32px"
    rounded: "{rounded.full}"
  tech-chip:
    backgroundColor: "{colors.azure-signal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "2px 8px"
---

# Design System: Adil Khursheed

## Overview

**Creative North Star: "The Annotated Canvas"**

The interface behaves like a live design surface that can be inspected while it is being read. Full-bleed hairlines separate the hero beats, hatched rails frame the content column, and small monospace annotations name the exact typographic utilities applied to each line. The effect is technical without becoming a terminal: the annotation layer is quiet, low-contrast, and always secondary to the work.

The mood is precise and technical. Surfaces are flat, corners are generously rounded, and controls are compact, quiet instruments rather than loud calls to action. Outfit carries the reading voice; IBM Plex Mono appears only where the system is talking about itself. Light and dark themes are treated as absolute ends of the same system, with paper white and true black as anchors rather than soft off-whites or charcoals.

This world must never be mistaken for a generic SaaS gradient landing page. There are no purple-blue hero gradients, floating glass orbs, or stacked marketing cards. Structure is communicated with one-pixel lines, tonal fills, and full-bleed rules. The portrait, the work, and the annotation system carry the identity.

**Key Characteristics:**
- Annotated hero: mono class labels sit directly above and below the headline.
- Full-bleed hairlines and hatched edge rails define the column.
- Flat by default: no drop shadows anywhere in the system.
- One azure accent used sparingly against pure paper or true black.
- Large, soft radii on compact controls; thin borders everywhere else.

## Colors

A near-monochrome technical palette anchored by pure paper and true black, interrupted by a single azure signal.

### Primary
- **Azure Signal** (oklch(0.6723 0.1606 244.9955)): The only chromatic voice. Used on the name inside the hero headline and as the fill of the rotating technology chip. It marks identity and current focus, not backgrounds or large surfaces.
- **Azure Signal Dark** (oklch(0.6692 0.1607 245.011)): The dark-theme equivalent, held at nearly identical lightness and chroma so the accent does not brighten when the theme flips.

### Neutral
- **Paper** (oklch(1 0 0)): Light-theme page background and the foreground color on azure.
- **Void** (oklch(0 0 0)): Dark-theme page background, used as true black rather than a near-black.
- **Ink** (oklch(0.1884 0.0128 248.5103)): Light-theme foreground, cool and slightly blue rather than pure black.
- **Chalk** (oklch(0.9328 0.0025 228.7857)): Dark-theme foreground, a cool near-white.
- **Cool Card** (oklch(0.9784 0.0011 197.1387)): Light card and popover surface, barely separated from paper.
- **Charcoal Card** (oklch(0.2097 0.008 274.5332)): Dark card and popover surface, lifted only by tone.
- **Mist** (oklch(0.9222 0.0013 286.3737)): Light muted fills, including ghost-button hover.
- **Mist Dark** (oklch(0.209 0 0)): Dark muted fills.
- **Muted Ink** (oklch(0.5637 0.0078 247.9662)): Dark-theme secondary text.
- **Hairline** (oklch(0.9317 0.0118 231.6594)): Light borders, rail lines, and horizontal rules.
- **Hairline Dark** (oklch(0.2674 0.0047 248.0045)): Dark borders, rail lines, and horizontal rules.
- **Input Paper** (oklch(0.9809 0.0025 228.7836)): Light input fill before opacity is applied.
- **Input Slate** (oklch(0.302 0.0288 244.8244)): Dark input fill before opacity is applied.
- **Destructive Red** (oklch(0.6188 0.2376 25.7658)): Error borders, rings, and destructive actions only.

### Named Rules
**The Signal Rarity Rule.** Azure occupies less than a tenth of any viewport. It appears on the hero name and the rotating chip; spreading it to section backgrounds, borders, or decorative gradients breaks the system.

**The Absolute Ends Rule.** The neutral ends are pure white in light mode and pure black in dark mode. Depth and softness come from tinted foregrounds and hairlines, never from a beige or charcoal page background.

## Typography

**Display Font:** Outfit (with ui-sans-serif, sans-serif, system-ui)
**Body Font:** Outfit (with ui-sans-serif, sans-serif, system-ui)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace)

**Character:** Outfit gives the site a clean, contemporary engineering voice with slightly geometric forms. IBM Plex Mono is reserved for system narration: class annotations, measurements, and utility labels. The pairing reads as a designer's canvas being described by its own inspector.

### Hierarchy
- **Display** (400 at large sizes, 500 below the large breakpoint; 1.5rem → 3rem → 3.75rem → 6rem; line-height 1; letter-spacing -0.05em): The hero statement only. It is balanced with `text-balance` and always paired with the annotation strips.
- **Body** (400 at large sizes, 500 below the large breakpoint; 1.125rem / 2.25rem): The hero supporting paragraph and long-form reading. Body measure is capped at the medium breakpoint (768px), roughly 65–75 characters.
- **Label** (400; 0.625rem–0.75rem; line-height 1.5rem; letter-spacing 0.025em): Monospace annotations above and below hero blocks. Rendered at 20–25% foreground opacity so they read as scaffolding, not content.
- **UI** (500; 0.75rem–0.875rem; line-height 1.625): Buttons, inputs, nav links, and card titles. Compact and uniform across controls.

### Named Rules
**The Annotation Rule.** Monospace labels describe the system and never carry primary content. They stay at 10–12px and in lowercase, in one of two registers. *Scaffolding* annotations (the hero class strips) sit at 20% foreground opacity and are decorative; *informational* annotations (section captions, counts, image credits, field counters) sit at 65% and are readable content. Never push a label above 65%, and never let a label take the display or body type family.

**The Four-Step Display Rule.** The hero headline steps through 1.5rem, 3rem, 3.75rem, and 6rem at its responsive breakpoints. Do not introduce intermediate display sizes; the jump is part of the voice.

## Layout

The page is a single centered column capped at 72rem (max-w-6xl) with 1rem side padding on mobile and 2rem from the medium breakpoint up. The main content sits inside a relative shell whose left and right edges carry 1rem (mobile) or 2rem (desktop) hatched rails: a 50% border fill, one-pixel side borders, and a repeating 315-degree line pattern at 10px by 10px. The rails are full-height and fixed to the scroll container, so they read as the edges of a canvas.

Hero blocks are separated by full-bleed hairlines built from pseudo-elements that span 200vw and start at -100vw, escaping the content column without creating horizontal scroll. Annotation strips occupy fixed heights (4rem mobile, 6rem desktop above the headline; 1.5rem mobile, 2.5rem desktop below it) and align their text to the bottom edge. The supporting paragraph is capped at 768px, while the headline spans the full column.

The navbar is fixed to the top, centered, 93% wide with a 72rem maximum, and rendered as a translucent pill with 12px padding and backdrop blur. The 8xl container token (1440px) exists but the current content column and nav both use 72rem. Density is generous vertically in the hero and compact inside controls.

### Named Rules
**The Rail Rule.** Content never touches the viewport edge on desktop. The hatched rails own the outer 2rem, and no card or image may overlap them.

**The Full-Bleed Hairline Rule.** Structural separators escape the column to 200vw. Use the established pseudo-element technique rather than border-top on the content wrapper.

## Elevation & Depth

The system is flat by default. Every shadow token in the theme resolves to a fully transparent color, so cards, buttons, and the nav cast no shadow. Depth is conveyed through tonal surface shifts, one-pixel borders and rings, backdrop blur behind the fixed nav, and the hatched rails at the page edges. There is no ambient shadow vocabulary, and adding one would be a new visual world rather than a refinement.

### Named Rules
**The Flat-By-Default Rule.** If a surface needs separation, use a hairline, a tonal fill, or blur. Never add a drop shadow, glow, or floating glass card.

## Shapes

The base radius is 1.3rem (20.8px), producing a soft but not playful family: 16.8px for small controls, 18.8px for medium controls and buttons, 20.8px for cards and chips, 24.8px for extra-large surfaces, and progressively larger steps up to 54px. Fully round pills are reserved for the floating navbar and avatars. Borders stay at one pixel; shapes are never outlined with heavy strokes.

The recurring silhouette is a large-radius instrument panel inside a square, ruled canvas. Rounded controls sit against straight full-bleed lines and rectangular hatched rails, and that contrast is the form language.

### Named Rules
**The One Radius Family Rule.** All corners derive from the single 1.3rem base. Do not mix sharp-cornered cards with pill controls in the same cluster.

## Components

### Buttons
- **Shape:** Medium radius (18.8px), compact 28px height.
- **Primary:** Azure Signal fill, Paper text, 0 8px padding, 0.75rem medium type. Hover drops the fill to 80% opacity.
- **Hover / Focus:** Color-only hover; focus-visible adds a 1px ring border plus a 2px 30%-opacity ring. Active state translates down 1px.
- **Ghost / Icon:** Transparent background, 28px square, Mist hover in light mode and 50% Mist in dark mode. Used for the theme toggle.
- **Secondary / Outline / Destructive:** Secondary uses the ink/chalk pair; outline uses a hairline border with a 50% input hover; destructive uses a 10–20% red wash rather than a solid red fill.

### Chips
- **Style:** The rotating technology chip is a fully filled azure pill-ish rectangle at card radius (20.8px), Paper text, 0.5rem horizontal padding, 0.125rem vertical padding, 1.125rem medium type.
- **State:** Only one term is visible at a time. Characters enter from below with a blur and exit upward, using a spring (damping 30, stiffness 400) on a 3000ms rotation.

### Cards / Containers
- **Corner Style:** Large radius (20.8px), with image corners matched top or bottom.
- **Background:** Cool Card in light mode, Charcoal Card in dark mode.
- **Shadow Strategy:** None. A one-pixel ring at 10% foreground opacity supplies the edge.
- **Border:** No solid border; the ring is the boundary.
- **Internal Padding:** 16px default, 12px in the small size, with 16px gaps between sections.

### Inputs / Fields
- **Style:** Medium radius (18.8px), 28px height, one-pixel input-colored border, and a 20% input-color fill in light mode (30% in dark mode). Text is 0.875rem on mobile and 0.75rem from the medium breakpoint up.
- **Focus:** Border shifts to the ring color with a 2px 30%-opacity ring.
- **Error / Disabled:** Error uses the destructive border and a 20–40% destructive ring. Disabled drops to 50% opacity and loses pointer events.

### Navigation
- **Style:** Fixed translucent pill, 93% width capped at 72rem, 12px padding, full radius, and background blur. The avatar sits at the left; the theme toggle and text links sit at the right with 1rem gaps.
- **Typography:** Links inherit the 1rem body size; controls use compact UI type.
- **States:** Links use default foreground without underlines; the theme toggle is a ghost icon button with a circular clip-path reveal when switching themes.
- **Mobile:** The pill remains centered and full-width at 93%; the hatched rails shrink from 2rem to 1rem.

### Signature: Annotated Hero
The hero is the system's signature component: a monospace class-annotation strip, a full-bleed hairline, the display headline with the name in azure, another hairline, a second annotation strip, and the body paragraph with an inline azure technology chip. The annotations name the utilities in use (`text-2xl`, `tracking-tighter`, `text-balance`) and deliberately sit at low opacity so they read as the surface describing itself.

### Section Rhythm
Every section below the hero follows one pattern: vertical padding (4rem mobile, 6rem desktop), a full-bleed hairline above, an optional scaffolding annotation strip naming the section, then a `SectionHeading`. The heading pairs an Outfit title (1.875rem → 2.25rem → 3rem) with an informational mono caption at 65% on the opposite edge, wrapping under the title when space is tight. Sections never open with a card or a filled panel.

### Signature: Work Viewer
A captioned screenshot viewer used for the featured role. A single 16:10 plate at extra-large radius sits on a muted fill with a 10% ring; images are cropped `object-top` so product chrome stays legible. Below it, a live mono caption on the left and an `NN / NN` counter on the right. A row of four 16:10 thumbnails acts as the selector: the active thumb carries an azure ring at full opacity, inactive thumbs sit at 70% opacity with a 10% ring. The group is focusable and responds to left/right arrow keys; crossfades are 350ms and disabled under `prefers-reduced-motion`.

### Project Rows
Projects are rows, never cards. The featured variant is a 12-column split: a large image plate (or the annotated placeholder) on one side and the copy on the other, with the side alternating by index. The compact variant stacks a 16:9 plate above a title, a one-line description, a mono tech list, and repo/live action links. All plates share the muted fill plus 10% ring treatment. A missing image renders the same plate as an intentional empty frame with a mono label, so an absent asset still looks composed.

### Skills Ledger
Skills are a four-column ledger of plain lists under mono group headers, separated by hairlines. No chips, tags, or pills: the site already reserves pills for the navbar and avatars, so skills read as a directory rather than a tag cloud.

### Contact Form
A two-column grid on desktop (name and email side by side, message full width) inside a plate at extra-large radius. Fields use the Input style below; the message field carries a mono character counter that turns to the destructive color near its limit. Submitting swaps the form for a success panel at the same plate size so the layout does not collapse. Validation errors render below the field in destructive type. A hidden honeypot field guards submissions and is never visible or focusable.

### Footer
A full-bleed hairline over a compact row: mono copyright on one side, social links on the other. No sitemap columns, no newsletter block, no secondary background fill.

### Social Links
Icon links (GitHub, LinkedIn, Instagram, X) rendered as 2rem ghost targets with a Mist hover. An optional labelled variant prints the platform name in lowercase mono next to each icon, used in About and the footer.

## Do's and Don'ts

### Do:
- **Do** keep azure below roughly 10% of any viewport and reserve it for identity and current-focus moments.
- **Do** use full-bleed hairlines and the hatched rails to create structure instead of cards or shadows.
- **Do** render system annotations in IBM Plex Mono at 10–12px with 20–25% foreground opacity.
- **Do** move the display headline through exactly 1.5rem, 3rem, 3.75rem, and 6rem at the existing breakpoints.
- **Do** pair large radii (16.8–24.8px) with one-pixel borders on compact controls.
- **Do** keep hero reveals at 0.4s ease-in-out and honor `prefers-reduced-motion`.

### Don't:
- **Don't** add drop shadows, glows, or floating glass cards; the system is flat.
- **Don't** introduce gradient heroes, purple-blue SaaS palettes, or decorative orb imagery.
- **Don't** use azure as a section background, border color, or multi-stop gradient.
- **Don't** set body copy wider than the 768px medium breakpoint.
- **Don't** use the reserved Georgia serif for UI or body copy; it is currently dormant.
- **Don't** use monospace for paragraphs or primary reading content.
