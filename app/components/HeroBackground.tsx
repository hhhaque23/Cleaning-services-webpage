"use client";

import Image from "next/image";
import { PHOTOS } from "@/lib/unsplash";

type Tile = {
  src: string;
  position: string;
  rotation: string;
  burnDelay: string;
  driftDelay: string;
  riseDelay: string;
  opacity: number;
  hideOnMobile?: boolean;
};

const TILES: Tile[] = [
  {
    src: PHOTOS.kitchen,
    position: "left-[-3%] top-[10%] h-44 w-56 sm:h-52 sm:w-72 lg:h-60 lg:w-[22rem]",
    rotation: "-rotate-[4deg]",
    burnDelay: "0s",
    driftDelay: "0s",
    riseDelay: "0.05s",
    opacity: 0.55,
  },
  {
    src: PHOTOS.bedroom,
    position: "right-[-5%] top-[-3%] h-36 w-52 sm:h-44 sm:w-72 lg:h-48 lg:w-80",
    rotation: "rotate-[3deg]",
    burnDelay: "-7s",
    driftDelay: "-5s",
    riseDelay: "0.18s",
    opacity: 0.45,
  },
  {
    src: PHOTOS.bathroom,
    position: "left-[8%] top-[44%] h-32 w-44 sm:h-40 sm:w-56 lg:h-44 lg:w-64",
    rotation: "rotate-[2deg]",
    burnDelay: "-12s",
    driftDelay: "-9s",
    riseDelay: "0.32s",
    opacity: 0.42,
    hideOnMobile: true,
  },
  {
    src: PHOTOS.livingRoom,
    position: "left-[-2%] bottom-[6%] h-40 w-52 sm:h-48 sm:w-72 lg:h-56 lg:w-[22rem]",
    rotation: "-rotate-[2deg]",
    burnDelay: "-4s",
    driftDelay: "-15s",
    riseDelay: "0.45s",
    opacity: 0.5,
  },
  {
    src: PHOTOS.emptyRoom,
    position: "right-[6%] bottom-[-4%] h-32 w-44 sm:h-36 sm:w-56 lg:h-44 lg:w-64",
    rotation: "-rotate-[4deg]",
    burnDelay: "-10s",
    driftDelay: "-7s",
    riseDelay: "0.55s",
    opacity: 0.4,
    hideOnMobile: true,
  },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_28%,transparent_70%)]" />

      <div className="absolute top-[-12%] left-[8%] h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.09_220/0.32)] blur-3xl animate-blob-drift" />
      <div className="absolute top-[14%] right-[2%] h-[22rem] w-[22rem] rounded-full bg-[oklch(0.85_0.14_145/0.18)] blur-3xl animate-blob-drift [animation-delay:-6s]" />
      <div className="absolute bottom-[-8%] left-[28%] h-[22rem] w-[22rem] rounded-full bg-[oklch(0.65_0.13_220/0.18)] blur-3xl animate-blob-drift [animation-delay:-12s]" />

      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_18%,rgba(0,0,0,0.4)_50%,black_85%)]">
        {TILES.map((t, i) => (
          <div
            key={i}
            className={`absolute ${t.position} ${t.rotation} ${
              t.hideOnMobile ? "hidden md:block" : ""
            } animate-tile-drift will-change-transform`}
            style={{ animationDelay: t.driftDelay }}
          >
            <div
              className="relative h-full w-full animate-tile-rise"
              style={
                {
                  animationDelay: t.riseDelay,
                  "--tile-opacity": t.opacity,
                } as React.CSSProperties
              }
            >
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-card ring-1 ring-[oklch(0.65_0.13_220/0.12)]">
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 360px, 280px"
                  className="object-cover animate-ken-burns will-change-transform"
                  style={{ animationDelay: t.burnDelay }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.65_0.13_220/0.22)] via-transparent to-[oklch(0.985_0.006_220/0.28)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/60 to-transparent" />
    </div>
  );
}
