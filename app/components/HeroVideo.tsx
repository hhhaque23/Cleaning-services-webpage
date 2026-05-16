"use client";

// Was a looping MP4, then a full-bleed still photo. The full-bleed photo
// duplicated the photo in the hero column, which caused a visible
// "huge → shrinks" layout flash on first paint. Now this component only
// provides the ambient backdrop (grid pattern + soft gradient fade to the
// page surface). The hero photo lives in Hero.tsx's right column.
export function HeroVideo() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--surface)]/40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/80 via-30% to-transparent" />
    </div>
  );
}
