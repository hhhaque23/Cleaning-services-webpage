"use client";

import Image from "next/image";
import { PHOTOS } from "@/lib/unsplash";

// Was a looping MP4. User asked to take the video out for perf and noise; the
// hero is now a single still photo with the same overlay treatment.
export function HeroVideo() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />

      <Image
        src={PHOTOS.hero}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.985_0.006_220/0.82)] via-[oklch(0.985_0.006_220/0.38)] to-[oklch(0.985_0.006_220/0.12)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.006_220/0.18)] via-transparent to-[oklch(0.985_0.006_220/0.55)]" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/85 via-30% to-transparent" />
    </div>
  );
}
