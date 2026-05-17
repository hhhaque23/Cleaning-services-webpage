"use client";

/**
 * PerspectiveGrid — a CSS-only 3D background layer that reads as a subtle
 * tiled floor receding toward the horizon. Grid lines slowly flow toward the
 * viewer, giving a "polished surface" feel without any WebGL or particles.
 *
 * - Fixed-attached so every section inherits the same backdrop.
 * - Behind all content (z-index: 0; content sits at z-index: auto/relative).
 * - Pure CSS animation via keyframes on background-position.
 * - Mask-image fades the grid at the top into the gradient so the horizon
 *   blends instead of cutting off.
 * - prefers-reduced-motion + mobile rules in globals.css already suspend
 *   continuous animations, so this layer goes static there.
 */
export function PerspectiveGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        perspective: "900px",
        perspectiveOrigin: "50% 30%",
      }}
    >
      <div
        className="animate-grid-flow"
        style={{
          position: "absolute",
          left: "-50%",
          right: "-50%",
          top: "30%",
          bottom: "-20%",
          backgroundImage:
            "linear-gradient(oklch(0.65 0.13 220 / 0.12) 1px, transparent 1px), " +
            "linear-gradient(90deg, oklch(0.65 0.13 220 / 0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px, 72px 72px",
          transform: "rotateX(62deg)",
          transformOrigin: "center top",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
          willChange: "background-position",
        }}
      />
    </div>
  );
}
