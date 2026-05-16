# Pristine Cleaning Co. — Design

## Aesthetic lane

Premium-utilitarian consumer brand with theatrical motion. Stripe-meets-DoorDash-meets-Linear: confident dark surfaces against tinted off-white, photography of real homes, asymmetric layouts, scroll-linked depth, cursor-following spotlights, magnetic CTAs, and aurora gradient ambience. Less form-on-page, more interactive product surface.

Named references:
- **Stripe** for the booking-flow sidebar pricing pattern, digit-roll precision, and trust-via-precision.
- **DoorDash / Caviar** for the "order it like delivery" mental model and confident green commitment color.
- **Linear** for spotlight + aurora ambience on dark surfaces.
- **Vercel** for aurora gradient backdrops and motion-rich hero treatments.
- **Notion 2024 marketing** for tinted off-white surfaces and decisive type.

## Color strategy

A single deep teal anchors identity across navbar, dark surfaces, type, and the booking sidebar. Saturated green is the action color, used with conviction on every commitment CTA. The off-white surface is a tinted off-white, never pure `#fff`. Backdrops use aurora blob layers (subtle, blurred grass + cyan) for ambient warmth on light surfaces and cursor-following radial spotlights on dark surfaces.

### Tokens (OKLCH)

| Role | OKLCH | Usage |
|---|---|---|
| `--surface` | `oklch(0.985 0.006 220)` | page background |
| `--surface-elevated` | `oklch(0.995 0.004 220)` | cards on dark sections |
| `--surface-tint` | `oklch(0.93 0.02 220)` | tinted rhythm bands (HowItWorks, PhotoQuote, ServiceAreas, SubscriptionCallout) |
| `--ink` | `oklch(0.23 0.05 230)` | body text, primary surfaces |
| `--ink-deep` | `oklch(0.15 0.045 230)` | dark surfaces, footer |
| `--ink-deeper` | `oklch(0.11 0.04 230)` | hero photo overlays |
| `--ink-spotlight` | `oklch(0.13 0.045 230)` | spotlight surfaces (FinalCTA, booking sidebar, tracking) |
| `--ink-soft` | `oklch(0.43 0.04 230)` | secondary text |
| `--ink-faint` | `oklch(0.62 0.025 230)` | tertiary text |
| `--cyan` | `oklch(0.65 0.13 220)` | brand accent (spotlights, ambient blobs) |
| `--grass` | `oklch(0.68 0.18 145)` | commitment CTA color |
| `--grass-deep` | `oklch(0.52 0.16 145)` | CTA hover |
| `--grass-glow` | `oklch(0.78 0.16 145)` | glow halos behind CTAs |
| `--line` | `oklch(0.92 0.012 220)` | borders, dividers |

Every neutral carries a faint cyan tint. Untinted gray is avoided. Pure `#fff` may appear only when explicitly contextual (e.g., dark-mode text on `--ink-950`); `#000` is never used.

## Typography

**Bricolage Grotesque** (display) + **Hanken Grotesk** (body). Both via `next/font/google`.

- Bricolage carries headlines: warm humanist sans with slightly contracted letterforms. Personality without preciousness.
- Hanken carries body and UI: precise, modern, neutral. Lets Bricolage do the voice.

Display headlines use **`SplitText` per-word reveal** with `rotateX` and stagger, paired with italic emphasis on a secondary fragment of the same headline. Body text fades up after the headline lands.

### Scale (fluid)

```
display-hero  clamp(2.75rem, 6.2vw, 5.5rem)  weight 700  line 1.02  tracking -0.028em
display-1     clamp(2.25rem, 4vw, 3.6rem)    weight 700  line 1.05  tracking -0.022em
display-2     clamp(1.6rem, 2.6vw, 2.15rem)  weight 600  line 1.15  tracking -0.015em
body-lg       1.125rem  weight 400  line 1.55
body          1rem      weight 400  line 1.6
label         0.75rem   weight 600  line 1.2  tracking 0.06em  uppercase
```

Step ratio approximately 1.3. No flat scales.

## Layout

- **Asymmetric over centered.** Hero is split, not stacked. Stats is a bento grid. Subscription callout is split. ServiceAreas pairs a wide map with chip controls.
- **Container widths vary by content.** Booking flow is wider (`max-w-7xl`). FAQ and copy-heavy sections narrower (`max-w-3xl`). Don't wrap everything the same.
- **Section rhythm.** Vertical padding scales with importance: hero / final CTA / booking get more space than service-areas or trust-bar. `--surface` and `--surface-tint` alternate for rhythm.
- **Cards aren't the default.** Trust signals are inline marquee pills. How-it-works steps share a visible scroll-progress spine, not three identical bordered boxes. Tiers card grid is kept where cards are the right affordance.

## Motion vocabulary

Three layered themes:

1. **Spotlight / aurora** — cursor- and scroll-driven radial gradients on dark surfaces (FinalCTA, booking sidebar, customer tracking). Background ambient `Aurora` (grass / cyan / mixed) on most sections.
2. **Magnetic + lift** — every primary CTA, tier card, add-on pill, date chip, and frequency card responds to cursor proximity with a subtle pull. Tap = spring scale.
3. **Stagger choreography** — section entrances orchestrate child elements with intentional ordering. SplitText, sparkline path-draws, star fill sweeps, check-icon draws.

### Timing tokens

- **Entrance**: 0.55–0.85s, ease `[0.22, 1, 0.36, 1]` (out-quint), with 12–22px y-offset and optional rotateX for headlines.
- **Step transitions** (booking, page transitions): 0.32–0.45s, x-slide 18–22px with subtle 0.98 scale.
- **Number tweens**: 1.4–2.2s on count-ups, 0.45s on price ticker, digit-roll via `useMotionValue` + `useTransform`.
- **Continuous loops**: aurora blob drift 14–22s, pulse-ring 2.4s, ken-burns 22s, marquee 38–48s, HQ halo 5s, rotating border 6s.
- **Magnetic strength**: 0.18–0.34 with 90–140px radius depending on CTA importance.

All animations gate on `prefers-reduced-motion`. Continuous loops drop to static positions. Step transitions reduce to opacity-only. SplitText renders plain text.

## Motion primitives (`app/components/motion/`)

- `SplitText` — word/char/line-mode headline reveals with rotateX and stagger.
- `MagneticButton` — cursor-proximity translate with spring smoothing.
- `CountUp` — view-in-triggered numeric tween.
- `Spotlight` — cursor-following radial gradient overlay.
- `ScrollProgressRail` — global top-of-page progress rail, gradient cyan→grass.
- `Aurora` — slow-drifting gradient blob layer.
- `AnimatedBorder` — rotating conic-gradient ring.
- `RevealOnView` — drop-in `whileInView` wrapper.
- `Confetti` — celebratory particle burst (success, completion).
- `motion-primitives.ts` — shared variants (`fadeUp`, `splitWord`, `splitChar`, `tilePop`, `pillSlide`, `checkDraw`), easing tokens, viewport configs.

## Components

- `glass` utility is reserved for **floating overlay cards** (hero satellites). Not for navbar (uses tinted-white-on-scroll), not for trust strip (uses marquee).
- Buttons: dark `ink-950` primary, grass `grass-500` for commitment CTAs (price-discovery, final booking, "book this tier"). Hover lifts shadow + adds soft glow halo behind. Magnetic interaction is opt-in via `MagneticButton` wrapper.
- Inputs: 2xl rounded, surface-elevated background with `line` border, **floating label**, grass focus ring at low alpha, icon scale-bounce on focus.
- Tiers / frequency cards: active state lifts with grass underglow and rotating-border affordance.
- Page transitions: `app/template.tsx` wraps children in `AnimatePresence` keyed by pathname for opacity + 8px y-fade.

## Bans (enforced)

- No em dashes (`—` or `--`) in any copy. Use `·` or `,` instead.
- No pure `#000`. Pure `#fff` only as text on `--ink-950` surfaces.
- No untinted gray. Every neutral uses an OKLCH ink scale with cyan undertone.
- No side-stripe `border-left` / `border-right` accents as the only emphasis.
- No icon-above-heading repeated card grids as section grammar. Cards are used selectively (tier picker, team grid, frequency cards).
- Plus Jakarta Sans, Inter, Geist, and other generic SaaS pairings are not used. Fonts are Bricolage + Hanken.
- No tiny uppercase tracked label above every heading. Use sparingly, once or twice per page max.
- Reduced-motion users get static layouts. Never silently hide content that depends on motion.
