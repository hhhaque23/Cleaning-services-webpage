"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PHOTOS } from "@/lib/unsplash";

// Self-hosted Mixkit 720p clip (~4.4 MB) at public/hero.mp4. Same-origin
// avoids the hotlink gating that blocked the previous Mixkit URL in
// production. Replace the file in /public to change the footage.
const VIDEO_URL = "/hero.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    v.play().catch(() => {
      // Some browsers refuse autoplay; the poster still shows.
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />

      <div className="absolute inset-0">
        {!failed && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
            aria-hidden="true"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        )}

        {(failed || !ready) && (
          <Image
            src={PHOTOS.hero}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.985_0.006_220/0.78)] via-[oklch(0.985_0.006_220/0.32)] to-[oklch(0.985_0.006_220/0.08)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.006_220/0.18)] via-transparent to-[oklch(0.985_0.006_220/0.5)]" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/85 via-30% to-transparent" />
    </div>
  );
}
