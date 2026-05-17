"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { PHOTOS } from "@/lib/unsplash";

// Deterministic pseudo-random so SSR + CSR markup match on first paint.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One photo per tile, every tile is a different image. Positions chosen so
// tiles cluster around the edges of the viewport and stay clear of the
// vertical center where most copy + buttons live.
type PhotoTile = {
  src: string;
  alt: string;
  // % of viewport
  x: number;
  y: number;
  w: number; // tile width in vw
  rotate: number;
  delay: number;
  drift: boolean;
};

function buildTiles(): PhotoTile[] {
  // Distinct photos pulled from the collage thumbnails.
  const distinct = [
    { src: PHOTOS.collage.kitchen, alt: "Bright modern kitchen after a clean" },
    { src: PHOTOS.collage.bathroom, alt: "Sparkling bathroom" },
    { src: PHOTOS.collage.bedroom, alt: "Bedroom in morning light" },
    { src: PHOTOS.collage.livingRoom, alt: "Tidy living room" },
    { src: PHOTOS.collage.diningRoom, alt: "Dining room set for service" },
    { src: PHOTOS.collage.hallway, alt: "Polished hallway" },
    { src: PHOTOS.collage.loungeCorner, alt: "Living room corner" },
    { src: PHOTOS.collage.windowSeat, alt: "Window seat in afternoon light" },
    { src: PHOTOS.collage.kitchenAlt, alt: "White kitchen counter" },
    { src: PHOTOS.collage.bathroomAlt, alt: "Tiled bathroom" },
    { src: PHOTOS.collage.livingRoomAlt, alt: "Mid-century living room" },
    { src: PHOTOS.collage.bedroomAlt, alt: "Warm bedroom" },
  ];

  // Just four tiles: one at each corner, mostly off-page so only a thin slice
  // peeks into the viewport. Decoration, not content.
  // [x%, y%, w(vw)]
  const positions: [number, number, number][] = [
    [-8, 12, 11],    // top-left, mostly off-page
    [92, 18, 10],    // top-right, mostly off-page
    [-7, 78, 11],    // bottom-left, mostly off-page
    [94, 82, 10],    // bottom-right, mostly off-page
  ];

  const rand = mulberry32(7);
  return positions.map(([x, y, w], i) => ({
    src: distinct[i % distinct.length].src,
    alt: distinct[i % distinct.length].alt,
    x,
    y,
    w,
    rotate: (rand() - 0.5) * 8, // ±4 deg
    delay: rand() * 6,
    drift: rand() < 0.5,
  }));
}

export function CleaningAtmosphere() {
  const reduce = useReducedMotion();
  const tiles = useMemo(() => buildTiles(), []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        contain: "paint",
      }}
    >
      {tiles.map((t, i) => {
        // Per-tile inner styles: rounded card, soft shadow, hard mask so the
        // photo doesn't dominate (gradient overlay to ink-deep at low alpha).
        const innerStyle: React.CSSProperties = {
          width: `${t.w}vw`,
          aspectRatio: "4 / 5",
          minWidth: 96,
          minHeight: 120,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow:
            "0 18px 50px -28px oklch(0.15 0.045 230 / 0.4), 0 2px 12px -6px oklch(0.15 0.045 230 / 0.15)",
          position: "relative",
          willChange: t.drift && !reduce ? "transform" : undefined,
        };

        const wrapperStyle: React.CSSProperties = {
          position: "absolute",
          left: `${t.x}%`,
          top: `${t.y}%`,
          transform: `translate(-50%, -50%) rotate(${t.rotate}deg)`,
          opacity: 0.35,
        };

        const inner = (
          <div style={innerStyle}>
            <Image
              src={t.src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover"
              loading="lazy"
            />
            {/* Light overlay so the photo recedes into the page surface. */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, oklch(0.97 0.012 220 / 0.35) 0%, oklch(0.97 0.012 220 / 0.55) 60%, oklch(0.97 0.012 220 / 0.7) 100%)",
              }}
            />
          </div>
        );

        if (t.drift && !reduce) {
          return (
            <motion.div
              key={i}
              style={wrapperStyle}
              animate={{ y: [0, -10, 0], rotate: [t.rotate, t.rotate + 1.2, t.rotate] }}
              transition={{
                duration: 14 + (i % 4) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: t.delay,
              }}
            >
              {inner}
            </motion.div>
          );
        }

        return (
          <div key={i} style={wrapperStyle}>
            {inner}
          </div>
        );
      })}

      {/* Soft surface wash on top so center content reads cleanly. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.97 0.012 220 / 0.45), transparent 75%)",
        }}
      />
    </div>
  );
}
