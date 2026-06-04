/**
 * SpectreMark — the Spectre Cleaning ghost picture (cut from the real logo).
 *
 * Renders the transparent chrome-ghost cutout at /spectre-ghost.png, scaled to
 * `size` (rendered height in px). Meant to sit on a dark chip beside the
 * "Spectre Cleaning" wordmark. Served unoptimized (tiny static asset).
 */
import Image from "next/image";

const GHOST_W = 318;
const GHOST_H = 300;

type SpectreMarkProps = {
  className?: string;
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
      unoptimized
      className={className}
      style={{ height: h, width: "auto" }}
    />
  );
}
