# Spectre Cleaning Solutions — Handoff

> Last refreshed 2026-06-05, after the **Operations overhaul** (capacity/availability, ops calendar,
> settings/cleaners, reschedule/edit) and the **ops-console z-index fix**. This document reflects the
> current `main`.

## Mission

A premium home-cleaning service site for **Washtenaw County, MI** (based in Ann Arbor) that converts a
visitor into a confirmed booking in under sixty seconds, without phone calls or quote forms. Two
surfaces:

- **Customer side** — landing page, live-pricing booking flow (now backed by **real availability**),
  per-tier and office pages, and a customer tracking page (kept, but **no longer linked from the UI** —
  customers get updates by text; reachable by direct URL only).
- **Operator side** — password-protected ops console at `/admin`: dashboard, **ops calendar**,
  **settings/cleaners**, and per-booking management (status workflow, reschedule, reassign, edit).

Brand voice (`PRODUCT.md` / `DESIGN.md`): utilitarian-premium, "Stripe-meets-DoorDash," confident
dark surfaces against tinted off-white, real photography of real homes/offices, asymmetric over
centered. Type: Bricolage Grotesque (display) + Hanken Grotesk (body). OKLCH color system; accent is
cool cyan (legacy `grass` tokens alias to `accent`).

Deployed on Railway at `https://cleaning-services-webpage-production.up.railway.app` (Nixpacks,
`npm start`, auto-deploys from `main`).

---

## What's built and shipped

### Customer-facing routes

| Route | Purpose |
|---|---|
| `/` | Home landing page |
| `/book` | Booking flow (Configure → Schedule → Confirm → Success). `?tier=` / `?frequency=` prefill. Residential/Office toggle; **Office mode is an email-quote panel, not a live booking** |
| `/services/[tier]` | Per-tier detail: `/services/standard`, `/services/deep`, `/services/move-in-out` |
| `/services/office` | Commercial office cleaning page; CTAs are `mailto:` quote requests (no live pricing) |
| `/about` | AboutHero, Reviews, ServiceAreas, FAQ, FinalCTA |
| `/booking/[id]` | Read-only customer tracking (no auth, `noindex`, `force-dynamic`). **Unlinked from the UI** — direct URL only (operator + success-screen links removed; updates are texted) |
| `/privacy`, `/terms` | Legal pages |
| SEO | `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` (Edge), `icon.tsx` (favicon) |

### Operator-facing routes (all wrapped by `app/admin/layout.tsx` → `_AdminShell`)

| Route | Purpose |
|---|---|
| `/admin/login` | Native HTML form POST → 303 with cookie set on the same response. Demo-mode banner when `ADMIN_PASSWORD` unset |
| `/admin` | Dashboard (`force-dynamic`). Stats: new / booked-today / booked-out windows / week revenue. Today grouped by window, "New — needs action", "Upcoming". Status + recurring filter chips |
| `/admin/[id]` | Booking detail: `StatusActions` (new → confirmed → scheduled → completed / cancel) **and** `ManageBooking` (assign cleaner, reschedule with live availability, edit any field — price recomputed server-side) |
| `/admin/calendar` | Week grid (7 days × 3 windows), capacity per cell, animated hover popovers, week nav |
| `/admin/settings` | `CleanersManager` — add/remove cleaners. **Capacity = number of cleaners** |

### Backend

- **Persistence** — `postgres` (postgres-js) in `lib/bookings.ts` and `lib/settings.ts`. Schema
  bootstraps lazily (`CREATE TABLE IF NOT EXISTS`) on first query. **In-memory fallback** on
  `globalThis` when `DATABASE_URL` is unset (survives Next route-bundle duplication, lost on restart;
  flagged with a yellow banner in admin).
- **Capacity & availability (real, was stubbed)** — `getCapacity()` in `lib/settings.ts` returns
  `Math.max(1, cleaners.length)` (default seed of 2, max 20, never 0). `slotUsage()` / `countSlot()`
  in `lib/bookings.ts` count non-cancelled bookings per `(date, window)`. Three windows/day:
  morning 8–11, midday 11–2, afternoon 2–5. **Dates are local-calendar `YYYY-MM-DD`, never
  `toISOString()`** — a system-wide invariant (avoids off-by-one across timezones).
- **Auth** — `lib/auth.ts`. HMAC-SHA256 session token (`expiry.signature`, 12h TTL) signed with
  **Web Crypto (`crypto.subtle`)** — Edge-safe, so `middleware.ts` verifies it fine. Cookie name
  `spectre_admin` (httpOnly, `secure` in prod, `sameSite=lax`). Constant-time compares.
  **Demo mode** when `ADMIN_PASSWORD` is unset or `< 4` chars: any non-empty password is accepted
  (uses a public `DEMO_SECRET`); login shows a yellow banner.
- **Pricing** — `app/components/Booking/pricing.ts` `computePrice(config)`. Tier base + per-bed/bath,
  sqft multiplier `1 + max(0, (sqft-1000)/1000) * 0.1` (**no upper cap**; server clamps sqft to
  300–20000), floor multiplier `+8%`/floor above the first, fixed add-on prices, then a
  frequency discount. **Always recomputed server-side** on POST and PUT — client prices are never
  trusted.
- **API**
  - `POST /api/bookings` — create (validates, recomputes price, capacity check → 409 if full).
    Does **not** auto-assign a cleaner (assignment is manual via `ManageBooking`).
  - `GET /api/bookings/[id]` — public read · `PATCH` — status/assignment (auth) · `PUT` — rich edit
    (auth): reschedule with capacity re-check (self-excluded), edit details (price recompute), assign,
    status. Backed by `updateBookingStatus()` (PATCH) and `updateBooking()` (PUT).
  - `GET /api/availability?start=YYYY-MM-DD&days=N&exclude=ID` — per-day per-window
    `{ booked, capacity, open }`. `exclude` subtracts a booking from its own slot (reschedule).
  - `GET/PUT /api/settings/cleaners` — list + capacity (PUT is auth, normalizes/dedupes, caps at 20).
  - `POST /api/admin/login` (native form) · `POST /api/admin/logout` · `GET /api/admin/mode`.
- **Middleware** (`middleware.ts`) protects `/admin/*` (allows `/admin/login`), redirects
  unauthenticated requests to `/admin/login?next=…`.

### Design system & layout

- OKLCH tokens in `app/globals.css` / `tailwind.config.ts`: `--surface`, `--surface-tint`,
  `--surface-elevated`, ink scale, `--accent`/`--cyan` (and `grass` → accent). `<alpha-value>`
  placeholders so `/N` opacity modifiers compose with gradients.
- **Motion primitives** in `app/components/motion/`: `SplitText`, `MagneticButton`, `CountUp`,
  `RevealOnView`, `ScrollProgressRail`, `Confetti`, plus the `PastelRibbons` backdrop. Shared eases/
  durations in `motion-primitives.ts`. (`AnimatedBorder`, `Spotlight` exist but are currently unused;
  `Confetti` **is** used by `StepSuccess` and `_TrackingView`.)
- `lib/site.ts` is the single source of brand facts (name, email, area, HQ, Thumbtack reviews URL).

### ⚠️ Layout / stacking invariant (read before touching backgrounds)

`app/layout.tsx` renders a **fixed, full-screen `PastelRibbons` backdrop at `z-index: 0`** (and
`ScrollProgressRail` at `z-index: 80`) as siblings *before* `{children}`. Because the backdrop is a
*positioned* element, **any full-page route's content must establish its own stacking context above
it**, or the backdrop paints over the content:

- Marketing pages do this with `<main className="relative">` (see `app/page.tsx`).
- The admin console does it with `relative z-10` on the two `_AdminShell` wrappers
  (`app/admin/_AdminShell.tsx`). Its opaque `bg-[var(--surface)]` then gives ops a clean surface.

**Symptom if you forget** (this was a real bug, fixed in commit `9b7df08`): content is visible only
during the `app/template.tsx` page-transition fade — the transient `transform` briefly creates a
stacking context — and then **vanishes behind the ribbons** when the animation settles
("pops up and goes away instantly").

**Do NOT "fix" this by moving `PastelRibbons` to `z-index: -1`.** It was tried and reverted: at `-1`
the backdrop drops below the marketing pages' opaque section surfaces and the pastel ribbons get
washed out site-wide. Keep the backdrop at `z-index: 0` and give the page content its own stacking
context instead.

---

## What's deferred, broken, or punted

### Setup the user still needs to do

- **Set `ADMIN_PASSWORD` on Railway**
  (`railway variable set "ADMIN_PASSWORD=…" --service Cleaning-services-webpage`). Until then the
  admin login is in demo mode and any password works.
- **Delete the duplicate Postgres service** if not already done. Two were provisioned
  (`Postgres` and `Postgres-Bg-T`); the web service is wired to the first via
  `${{ Postgres.DATABASE_URL }}`. Removing a service needs the dashboard
  (Services → `Postgres-Bg-T` → Settings → Danger zone → Remove service).

### Features not implemented (out of scope so far)

- **No payments**. The flow ends at a confirmation ID; copy says "billed after the clean." No Stripe.
- **No email/SMS notifications**. Hook point: `POST /api/bookings` after `createBooking` returns
  (add Resend/Twilio there).
- **No tests** (no unit/integration/e2e). Verified manually / via Playwright screenshots.
- **No image optimization service** — `next.config.js` sets `unoptimized: true` and hotlinks
  Unsplash (`w=1600&q=78`).

### Known sharp edges

- **`/booking/[id]` has no access control.** It's `noindex`, but anyone who knows an `SP-XXXXXX` id
  can view that booking. Consider a token param if this matters.
- **sqft pricing is uncapped.** The multiplier has no ceiling; the server clamps sqft to 20000, where
  the multiplier reaches ~2.9×. The UI slider only spans 500–5000 (→ 1.4×). Decide whether to cap.
- **Capacity check is count-then-insert (not atomic).** Fine at this volume; TODO advisory lock if
  contention appears.
- **`/services/office` is missing from `app/sitemap.ts`.** Add it if you want it indexed explicitly.
- **Reviews are hardcoded placeholders** in `Reviews.tsx` (swap for real Thumbtack reviews).
- Three time windows are hardcoded in `StepSchedule.tsx`, `api/availability/route.ts`, and
  `lib/bookings.ts` — changing them is a multi-file edit.

---

## File map

### App routes
- `app/page.tsx` — home · `app/about/page.tsx` · `app/book/page.tsx`
- `app/services/[tier]/page.tsx` · `app/services/office/page.tsx`
- `app/booking/[id]/page.tsx` + `_TrackingView.tsx`
- `app/privacy/page.tsx` · `app/terms/page.tsx`
- `app/robots.ts` · `app/sitemap.ts` · `app/opengraph-image.tsx` · `app/icon.tsx`
- `app/admin/layout.tsx` · `app/admin/_AdminShell.tsx` · `app/admin/page.tsx`
- `app/admin/[id]/page.tsx` + `StatusActions.tsx` + `ManageBooking.tsx`
- `app/admin/calendar/page.tsx` + `CalendarGrid.tsx`
- `app/admin/settings/page.tsx` + `CleanersManager.tsx`
- `app/admin/login/page.tsx`
- `app/api/bookings/route.ts` · `app/api/bookings/[id]/route.ts`
- `app/api/availability/route.ts` · `app/api/settings/cleaners/route.ts`
- `app/api/admin/{login,logout,mode}/route.ts`

### Components (`app/components/`)
- Home: `Navbar`, `Hero`, `HeroVideo` (renders a still, no video), `TrustBar`, `Stats`,
  `RecentTransformations`, `HowItWorks`, `SubscriptionCallout`, `PhotoQuote`, `FinalCTA`, `Footer`,
  `SpectreMark`
- About: `AboutHero`, `Reviews`, `ServiceAreas`, `FAQ`
- `ServiceDetail` (per-tier)
- `Booking/`: `BookingFlow`, `StepConfigure`, `StepSchedule` (consumes `/api/availability`),
  `StepConfirm`, `StepSuccess`, `PriceTicker`, `SuccessCheck`, `pricing.ts`
- `motion/`: `PastelRibbons`, `ScrollProgressRail`, `SplitText`, `MagneticButton`, `CountUp`,
  `RevealOnView`, `Confetti`, `motion-primitives.ts` (+ unused `AnimatedBorder`, `Spotlight`)

### Libraries (`lib/`)
- `bookings.ts` — server-only data layer + in-memory fallback; slot/availability helpers, stats
- `settings.ts` — k/v store; cleaners list = capacity
- `auth.ts` — HMAC (Web Crypto) session + demo mode
- `booking-types.ts` — client-safe types, `STATUS_META`, `STATUS_FLOW`
- `site.ts` — brand constants · `tiers.ts` — slug map · `unsplash.ts` — photo catalog (`ALL_PHOTOS`)

### Infrastructure
- `middleware.ts` · `next.config.js` (Unsplash allowlist, `unoptimized`) · `tailwind.config.ts`
- `app/globals.css` (tokens, ribbon keyframes, reduced-motion) · `railway.json` (Nixpacks)

---

## Quick verification when picking this up

```bash
npm install
npm run build        # should pass
npm run dev          # open http://localhost:3000

# Customer flow
# 1. /book → fill steps → submit → success with an SP-XXXXXX id
# 2. /booking/SP-XXXXXX (direct URL — no longer linked from the flow) → tracking shows status "new"

# Operator flow
# 3. /admin/login → any password (demo) → /admin renders a populated dashboard
#    (confirm the BODY stays visible — it must not vanish after the page fade)
# 4. /admin/<id> → advance status; try Reschedule (live availability) and Edit details
# 5. /admin/calendar shows the booking in its window; /admin/settings adds/removes cleaners (= capacity)
```

If the dashboard banner says "DATABASE_URL is not set," bookings go to in-memory (lost on deploy). On
Railway it's wired via `${{ Postgres.DATABASE_URL }}`.

---

## Commit history highlights (newest first)

- `9b7df08` — Fix ops console vanishing: lift `/admin` content above the fixed PastelRibbons backdrop
  (`relative z-10` on the AdminShell wrappers; see the stacking invariant above)
- `ba25bf3` — Login: native form POST → 303 with cookie set on the same response (no client nav)
- `5d33932` — Fix admin login bounce: cookie + redirect via Server Action (superseded by `ba25bf3`)
- `56abf2f` — **Operations overhaul**: capacity/availability, ops calendar, dashboard, reschedule/edit
- `ae801a4` — Drop 24h guarantee + instant-quote calc; add Residential/Office tabs + Floors
- `38b3ea2` — Relocate to Ann Arbor / Washtenaw County
- `63b9a3e` — Rebrand to Spectre Cleaning Solutions

`git log --oneline` for the full sequence.
