# Pristine Cleaning Co.

Premium animated landing page for a Rochester Hills / metro Detroit cleaning service. Next.js 14 + Tailwind + Framer Motion. Fully functional live-pricing booking flow.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Tech

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- Framer Motion (animations + step transitions)
- Lucide React (icons)
- Plus Jakarta Sans + Inter via `next/font/google`
- Unsplash imagery via `next/image`

## Files

- `app/page.tsx` — composes all sections
- `app/components/Booking/` — the 4-step booking flow with pricing engine in `pricing.ts`
- `lib/unsplash.ts` — central catalog of photo URLs
- `tailwind.config.ts` — palette tokens and custom keyframes (`blob-drift`, `marquee`, `pulse-ring`)

## Build

```bash
npm run build
npm start
```
