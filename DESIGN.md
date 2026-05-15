# Pristine Cleaning Co. — Design

## Aesthetic lane

Utilitarian-premium consumer brand. Closer to Stripe-meets-DoorDash than to a wellness brand. Confident dark surfaces against a tinted off-white. Photography of real homes and real people, not stylized lifestyle stock. Layout asymmetry over centered stacks. Type with personality but not preciousness.

Named references:
- **DoorDash / Caviar** for the "order it like delivery" mental model and confident green accent.
- **Notion 2024 marketing site** for tinted off-white surfaces and decisive type.
- **Stripe** for the booking-flow sidebar pricing pattern and trust-via-precision.

## Color strategy

**Committed.** A single deep teal anchors identity across navbar, dark surfaces, type, and the booking sidebar. Saturated green is the action color, used sparingly but with conviction. The off-white surface is a tinted off-white, never pure `#fff`.

### Tokens (OKLCH)

| Role | OKLCH | Hex approx | Usage |
|---|---|---|---|
| `--surface` | `oklch(0.985 0.006 220)` | `#F6FBFC` | page background, never #fff |
| `--surface-elevated` | `oklch(0.995 0.004 220)` | `#FBFEFE` | cards on dark sections |
| `--ink` | `oklch(0.23 0.05 230)` | `#10303B` | body text, primary surfaces |
| `--ink-deep` | `oklch(0.15 0.045 230)` | `#082432` | dark surfaces, footer |
| `--ink-soft` | `oklch(0.43 0.04 230)` | `#3F5C68` | secondary text |
| `--ink-faint` | `oklch(0.62 0.025 230)` | `#7A929B` | tertiary text |
| `--cyan` | `oklch(0.65 0.13 220)` | `#1AA1B6` | brand accent (sparingly) |
| `--grass` | `oklch(0.68 0.18 145)` | `#3CB763` | CTA / commitment color |
| `--grass-deep` | `oklch(0.52 0.16 145)` | `#1F8C49` | CTA hover |
| `--line` | `oklch(0.92 0.012 220)` | borders, dividers |

Pure `#fff` and `#000` are banned. Every neutral carries a faint cyan tint.

## Typography

**Bricolage Grotesque** (display) + **Geist** (body). Both via `next/font/google`. Neither is on the reflex-reject list.

- Bricolage carries headlines: warm humanist sans with slightly contracted letterforms. Personality without preciousness.
- Geist carries body and UI: precise, modern, neutral. Lets Bricolage do the voice.

### Scale (fluid)

```
display-hero  clamp(2.75rem, 6vw, 5.5rem)  weight 700  line 1.02  tracking -0.025em
display-1     clamp(2.25rem, 4vw, 3.5rem)  weight 700  line 1.05  tracking -0.02em
display-2     clamp(1.5rem, 2.5vw, 2rem)   weight 600  line 1.15  tracking -0.015em
body-lg       1.125rem  weight 400  line 1.55
body          1rem      weight 400  line 1.6
label         0.75rem   weight 600  line 1.2  tracking 0.06em  uppercase
```

Step ratio approximately 1.3. No flat scales.

## Layout

- **Asymmetric over centered.** Hero is split, not stacked. Subscription callout is asymmetric. Stats are an editorial composition, not a 4-column grid.
- **Container widths vary by content.** Booking flow is wider (`max-w-7xl`). FAQ and copy-heavy sections narrower (`max-w-3xl`). Don't wrap everything the same.
- **Section rhythm.** Vertical padding varies by importance: hero / final CTA / booking get more space than service-areas or trust-bar.
- **Cards aren't the default.** Trust signals are inline rows. How-it-works steps share a visible spine, not three identical bordered boxes. Tiers card grid is kept (cards are the right affordance there) but the popular tier breaks alignment deliberately.

## Motion

- Page-load: staggered fade-up on hero (delay-children 0.1, stagger 0.08, duration 0.6, ease `[0.22, 1, 0.36, 1]`).
- Scroll reveals: 12px y-offset, duration 0.55, eased `[0.22, 1, 0.36, 1]`.
- Step transitions: 20px x-slide, duration 0.35.
- Number tweens: 1.6s on count-ups, 0.45s on price.
- Background blobs: 16s slow drift.
- All animations gate on `prefers-reduced-motion`.

## Components

- `glass` utility is reserved for **floating overlay cards** (hero satellites). Not for navbar (uses tinted-white-on-scroll), not for trust strip (uses solid surface).
- Buttons: dark `ink-deep` primary, grass `grass` for commitment CTAs only (the price-discovery and final booking actions). Hover lifts shadow rather than shifting layout.
- Inputs: 2xl rounded, off-white surface with `line` border, focus ring uses brand cyan at low alpha.

## Bans (enforced)

- No em dashes (`—` or `--`) in any copy.
- No `background-clip: text` gradient text.
- No `#fff`, `#000`, or untinted gray.
- No side-stripe `border-left` / `border-right` accents.
- No icon-above-heading repeated card grids as section grammar.
- No tiny uppercase tracked label above every heading. Use sparingly; once or twice per page max.
- Plus Jakarta Sans, Inter, and the rest of the reflex-reject list are not used.
