/**
 * SpectreMark — the Spectre Cleaning ghost mark.
 *
 * A clean, single-path ghost (eyes knocked out via even-odd fill) with an
 * optional cyan sparkle. `tone="current"` fills with `currentColor` so it
 * inherits text color (e.g. white on a dark chip); `tone="chrome"` paints a
 * brushed-silver gradient for standalone use. The full logo (ghost + squeegee)
 * lives at /spectre-logo.jpg for social/OG.
 */

type SpectreMarkProps = {
  className?: string;
  size?: number | string;
  /** "current" inherits color; "chrome" paints a silver gradient. */
  tone?: "current" | "chrome";
  /** Cyan sparkle accent at the shoulder. */
  sparkle?: boolean;
  title?: string;
};

// Ghost body: domed head, straight sides, four scalloped feet. The two
// trailing subpaths are the eyes — even-odd fill turns them into holes so the
// surface behind shows through (dark chip = dark eyes, light = light eyes).
const GHOST_PATH =
  "M4 10 a8 8 0 0 1 16 0 v9 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 a2 2 0 0 1 -4 0 Z " +
  "M10.35 10.7 a1.18 1.18 0 1 0 -2.36 0 a1.18 1.18 0 1 0 2.36 0 Z " +
  "M16.0 10.7 a1.18 1.18 0 1 0 -2.36 0 a1.18 1.18 0 1 0 2.36 0 Z";

const SPARKLE_PATH = "M19.4 2.4 l.62 1.58 1.58.62 -1.58.62 -.62 1.58 -.62-1.58 -1.58-.62 1.58-.62 Z";

export function SpectreMark({
  className,
  size = 24,
  tone = "current",
  sparkle = true,
  title,
}: SpectreMarkProps) {
  const fill = tone === "chrome" ? "url(#spectre-chrome)" : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {tone === "chrome" && (
        <defs>
          <linearGradient
            id="spectre-chrome"
            x1="5"
            y1="2"
            x2="19"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#d4dce4" />
            <stop offset="1" stopColor="#8e9bab" />
          </linearGradient>
        </defs>
      )}
      <path fillRule="evenodd" clipRule="evenodd" d={GHOST_PATH} fill={fill} />
      {sparkle && <path d={SPARKLE_PATH} fill="var(--accent, #4cc6e6)" />}
    </svg>
  );
}
