"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PHOTOS } from "@/lib/unsplash";

// Free-license stock from Mixkit. Swap in any direct .mp4 URL.
const VIDEO_URL = "https://assets.mixkit.co/videos/36522/36522-720.mp4";

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

      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.985_0.006_220/0.92)] via-[oklch(0.985_0.006_220/0.55)] to-[oklch(0.985_0.006_220/0.25)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.006_220/0.35)] via-transparent to-[oklch(0.985_0.006_220/0.6)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,transparent_30%,oklch(0.985_0.006_220/0.4)_80%)]" />

      <div className="absolute top-[-12%] left-[8%] h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.09_220/0.22)] blur-3xl animate-blob-drift" />
      <div className="absolute top-[18%] right-[2%] h-[20rem] w-[20rem] rounded-full bg-[oklch(0.85_0.14_145/0.14)] blur-3xl animate-blob-drift [animation-delay:-6s]" />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/70 to-transparent" />
    </div>
  );
}
