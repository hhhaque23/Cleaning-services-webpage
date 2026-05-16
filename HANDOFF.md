# Pristine Cleaning Co. — Handoff

## Mission

A premium home-cleaning service site for **Rochester Hills, MI** that converts a curious visitor into a confirmed booking in under sixty seconds, without phone calls or quote forms. Two surfaces from the start:

- **Customer side** — landing page, live-pricing booking flow, customer tracking page after they submit.
- **Operator side** — password-protected ops dashboard at `/admin` showing every incoming booking with status workflow (new → confirmed → scheduled → completed / cancelled).

Brand voice (from `PRODUCT.md` / `DESIGN.md`): utilitarian-premium, "Stripe-meets-DoorDash," confident dark surfaces against tinted off-white, real photography of real homes, asymmetric over centered. Type: Bricolage Grotesque (display) + Hanken Grotesk (body).

Deployed on Railway at `https://cleaning-services-webpage-production.up.railway.app`.

---

## What's built and shipped

### Customer-facing routes

| Route | Purpose |
|---|---|
| `/` | Home landing page |
| `/book` | Full booking flow (4 steps: configure → schedule → confirm → success) with `?tier=` and `?frequency=` query params |
| `/services/[tier]` | Per-tier detail pages: `/services/standard`, `/services/deep`, `/services/move-in-out` |
| `/about` | Team, guarantee, reviews, service-areas map, FAQ |
| `/booking/[id]` | Read-only customer tracking page (no auth, `noindex`) |

### Operator-facing routes

| Route | Purpose |
|---|---|
| `/admin/login` | Password prompt, shared-secret auth |
| `/admin` | Bookings dashboard with stats (today / week / new / week revenue), status filter chips, list view |
| `/admin/[id]` | Per-booking detail with customer info, job details, status workflow buttons (new → confirmed → scheduled → completed, plus cancel) |

### Backend

- **Postgres persistence** via `postgres` (postgres-js) client. Schema bootstraps lazily on first call. `lib/bookings.ts` is the server-only runtime; `lib/booking-types.ts` carries the client-safe types and `STATUS_META`.
- **In-memory fallback** when `DATABASE_URL` is unset: a `Map` stashed on `globalThis` so the singleton survives Next.js route bundle duplication. Marked clearly in the admin dashboard with a yellow banner.
- **Auth**: HMAC-signed cookie via `lib/auth.ts`, 12-hour TTL. **Demo mode** when `ADMIN_PASSWORD` is unset — any non-empty password is accepted, login form shows a yellow banner so it's obvious the door is open.
- **Middleware** (`middleware.ts`) protects `/admin/*` and bounces unauthenticated requests to `/admin/login`.
- **API**:
  - `POST /api/bookings` — submit a booking, returns `{ id, status }`
  - `GET /api/bookings/[id]` — fetch by id (used by tracking page)
  - `PATCH /api/bookings/[id]` — update status (admin only)
  - `POST /api/admin/login` / `POST /api/admin/logout` / `GET /api/admin/mode`

### Design system bits worth knowing

- OKLCH everywhere, all custom colors use the `<alpha-value>` placeholder so `/N` alpha modifiers compose correctly with gradients.
- `--surface` (page bg), `--surface-tint` (deeper tinted band; HowItWorks, PhotoQuote, ServiceAreas use it), `--surface-elevated`.
- Section rhythm: tinted bands alternate with `--surface` for variety; dark moments are FinalCTA and Footer; grass is reserved for accents + the corner-animated shapes inside SubscriptionCallout and ServiceAreas (not full panels anymore).
- Animation pattern: `whileInView` + `viewport.once: true` for one-shot entrance, with a few intentional infinite loops (corner-orb pulses, HQ halo on the service map, Reviews marquee).

---

## What's deferred, broken, or punted

### Setup the user still needs to do

- **Set `ADMIN_PASSWORD` on Railway** (`railway variable set "ADMIN_PASSWORD=..." --service Cleaning-services-webpage`). Until done, the admin login is in demo mode and any password works. Confirmed currently still in demo mode (last we checked).
- **Delete the duplicate Postgres service** on Railway. During provisioning, two Postgres instances were created (`Postgres` and `Postgres-Bg-T`). The web service is wired to the first one via the `${{ Postgres.DATABASE_URL }}` reference variable, but the second instance is still running and billing. The Railway CLI doesn't expose service deletion; this needs the dashboard: Services → `Postgres-Bg-T` → Settings → Danger zone → Remove service.

### Known dead code / hygiene

- `PHOTOS.kitchen` in `lib/unsplash.ts` still points at the cooking-couple Unsplash URL but is no longer referenced by any visible component (Standard tier hero, Deep tier includes header, AboutHero all routed to `PHOTOS.livingRoom`). The entry can be removed when convenient.
- `HeroVideo.tsx` still exists as a component (kept its name), but it now renders a still photo only — the `<video>` element and the self-hosted `/hero.mp4` were removed at user request. The component could be renamed/refactored.

### Features not implemented (out of scope this session)

- **No email/SMS notifications** when a booking is submitted. The hook is in `POST /api/bookings` where `createBooking` returns. Add Resend or Twilio there if you want owner alerts.
- **No payment integration**. The booking flow ends at the success step with a confirmation ID; nothing is charged. Booking copy currently says "no charge until clean is complete," which is honest with the current implementation but means there's no Stripe yet.
- **No real availability backend**. `StepSchedule` shows a deterministic-looking `availabilityFor()` map in code. To make slot availability real, you'd need to query bookings table and subtract from a capacity matrix, or wire a real calendar (Cal.com, Google Calendar API, etc.).
- **No tests**. No unit, integration, or e2e suite. Builds verified manually.
- **No image optimization service**. Using Unsplash URL params directly (`w=1600&q=78`). Next.js `<Image>` re-optimizes through its own loader but with external URLs you don't get full Next image-CDN benefits.
- **Pexels / Mixkit hotlinking gated**: tried both for hero video; both blocked when requested from the Railway production origin. Self-hosted Mixkit clip worked but was then removed at user request. If you want video back, drop an `.mp4` into `public/` and point a component at `/your-file.mp4` (same-origin always works).

### UX areas that may still need iteration

The user iterated heavily on visual direction. Watch for:

- **HowItWorks SVG glyphs** — three custom animated symbols (slider, calendar with cursor-click + grass glow + checkmark, moon with stars on both sides). All play once on view-in. User has redirected this section 6+ times; further redirects likely.
- **ServiceAreas map** — Oakland County outline with 16 city dots, dashed grass lines fanning from Rochester Hills HQ. Single parent-viewport observer with cascading framer-motion variants (fixed the missing-label bug where individual `whileInView` observers on `<text>` elements failed). HQ has a continuously pulsing halo. South-band labels still dense; if more redirects come, consider leader lines or alternating font sizes.
- **Subscription panel** — converted from drenched grass to tinted-surface + three animated grass/cyan corner orbs. User explicitly preferred this approach over the green slab.
- **Color rhythm** — user oscillated between "too white" and "too SaaS slab." Current landing is: `--surface` for most sections, `--surface-tint` for HowItWorks / PhotoQuote / ServiceAreas, drenched dark for FinalCTA and Footer, hero photo. Subscription and ServiceAreas use animated grass corner shapes instead of grass backgrounds.

### Performance work done; watch list

- Self-hosted hero video removed (was the biggest cost).
- `filter: blur(7px)` removed from the calendar glow halos and HQ map halo; replaced with stacked translucent circles.
- Navbar `backdrop-blur-lg` lowered to `backdrop-blur-sm` with higher background alpha.
- Photo source URLs trimmed to `w=1600 q=78` (was `w=2400 q=85`).
- Reviews marquee pauses offscreen via IntersectionObserver.

Things still continuously animating (low cost but watch on weaker GPUs):
- SubscriptionCallout corner orbs (3 elements pulsing transform + opacity).
- ServiceAreas corner orbs (3 elements pulsing transform + opacity).
- ServiceAreas HQ halo (one transform + opacity loop, 5s).
- Reviews marquee (two rows, paused offscreen).

If new lag reports come in, the HQ halo on the service map is the next thing to drop.

---

## File map

### App routes
- `app/page.tsx` — home composition
- `app/about/page.tsx`, `app/book/page.tsx`, `app/services/[tier]/page.tsx`, `app/booking/[id]/page.tsx`
- `app/admin/layout.tsx`, `app/admin/_AdminShell.tsx`, `app/admin/page.tsx`, `app/admin/[id]/page.tsx`, `app/admin/[id]/StatusActions.tsx`, `app/admin/login/page.tsx`
- `app/api/bookings/route.ts`, `app/api/bookings/[id]/route.ts`
- `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`, `app/api/admin/mode/route.ts`

### Components (`app/components/`)
- `Navbar.tsx` — sticky pill, scroll-spy active underline, Ops button
- `Hero.tsx` + `HeroVideo.tsx` — hero section (HeroVideo now renders still photo)
- `TrustBar.tsx`, `Stats.tsx`, `HowItWorks.tsx`, `SubscriptionCallout.tsx`, `PhotoQuote.tsx`, `FinalCTA.tsx`, `Footer.tsx` (home)
- `AboutHero.tsx`, `Team.tsx`, `Guarantee.tsx`, `Reviews.tsx`, `ServiceAreas.tsx`, `FAQ.tsx` (about)
- `ServiceDetail.tsx` (per-tier detail)
- `Booking/BookingFlow.tsx`, `Booking/StepConfigure.tsx`, `Booking/StepSchedule.tsx`, `Booking/StepConfirm.tsx`, `Booking/StepSuccess.tsx`, `Booking/PriceTicker.tsx`, `Booking/SuccessCheck.tsx`, `Booking/pricing.ts`

### Libraries (`lib/`)
- `bookings.ts` — server-only DB layer + in-memory fallback
- `booking-types.ts` — client-safe types and STATUS_META
- `auth.ts` — HMAC session + demo mode
- `tiers.ts` — tier slug mapping
- `unsplash.ts` — photo URL catalog

### Infrastructure
- `middleware.ts` — admin route protection
- `next.config.js` — Unsplash hostname allowlist
- `tailwind.config.ts` — OKLCH color tokens, custom keyframes
- `app/globals.css` — surface tokens, font-face setup, OKLCH variables
- `railway.json` — deployment config (Nixpacks builder)

---

## Quick verification when picking this up

```bash
npm install
npm run build        # should pass
npm run dev          # then open http://localhost:3000

# Smoke test the booking flow end to end
# 1. /book → fill steps → submit → land on success with a PR-XXXXXX id
# 2. /booking/PR-XXXXXX → confirm read-only tracking page shows status "new"
# 3. /admin/login → any password (demo) → /admin → confirm booking listed
# 4. Click booking → status workflow buttons advance to confirmed → scheduled → completed
# 5. Reload /booking/PR-XXXXXX → status text reflects latest
```

If the dashboard banner says "DATABASE_URL is not set," bookings are going to in-memory (lost on every deploy). On production this is wired via Railway's reference variable `${{ Postgres.DATABASE_URL }}` on the web service.

---

## Commit history highlights

Recent meaningful commits (newest first):

- `caef01d` — ServiceAreas: animated corner shapes + roomier map
- `c96e738` — ServiceAreas: Oakland County outline, all 16 labels render
- `8dc18fc` — SubscriptionCallout: corner-animated grass shapes on tinted surface
- `3347294` — Reviews row 2 back; ServiceAreas reborn as Michigan cluster map
- `a68b163` — Break up the white: deeper tint band token, alternating sections, soft grass blurs
- `5dcf60c` — Smooth animations: drop filter-blur, lighten navbar blur, one marquee row
- `0e1423a` — Moon glyph: stars on the right side too
- `8d60854` — Calendar glyph: S M T W T F S labels, darker cell tone
- `464a6f0` — Calendar glyph: zoom in, no labels, 22 px cells fill the panel
- `fed3fec` — HowItWorks glyphs round 3: 2-week calendar 3 clicks, real crescent, simpler slider
- `f11bc73` — Surgical pass: chrome, typography, one photographic moment
- `f43faf4` — Add ops backend: bookings API, admin dashboard, customer tracking
- `585f772` — Split into hybrid multi-route, photo-backed hero, fix savings clip
- `bb0134f` — Bump next to 14.2.35 to patch HIGH CVEs

`git log --oneline` for the full sequence.
