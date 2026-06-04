/**
 * SpectreMark — the Spectre Cleaning ghost mark.
 *
 * Renders the real logo artwork (a transparent chrome-ghost cutout at
 * /spectre-ghost.png) scaled to `size` (rendered height in px). Intended to
 * sit on a dark chip, where the silver ghost reads cleanly. `className` is
 * passed through; `size` controls height and width follows the aspect ratio.
 */
import Image from "next/image";

// Intrinsic dimensions of public/spectre-ghost.png.
const GHOST_W = 318;
const GHOST_H = 300;

type SpectreMarkProps = {
  className?: string;
  /** Rendered height in px (width follows the ghost's aspect ratio). */
  size?: number | string;
  alt?: string;
};

export function SpectreMark({ className, size = 24, alt = "Spectre Cleaning" }: SpectreMarkProps) {
  const h = typeof size === "number" ? size : parseInt(size, 10) || 24;
  return (
    <Image
      src="/spectre-ghost.png"
      alt={alt}
      width={GHOST_W}
      height={GHOST_H}
      className={className}
      style={{ height: h, width: "auto" }}
    />
  );
}
