import { SpectreMark } from "./SpectreMark";

/**
 * Brand lockup: the Spectre ghost in a subtle chip + the "Spectre Cleaning"
 * wordmark. Single source of truth so the home navbar and the Operations
 * console stay identical. White wordmark — meant to sit on a dark surface
 * (the dark navbar, or a dark pill on the light Operations chrome).
 */
export function BrandLockup({
  size = "md",
  priority = false,
}: {
  size?: "md" | "lg";
  priority?: boolean;
}) {
  const c =
    size === "lg"
      ? { chip: "h-12 w-12 rounded-2xl", mark: 34, text: "text-xl" }
      : { chip: "h-9 w-9 rounded-xl", mark: 26, text: "text-[15px] sm:text-base" };
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`inline-flex items-center justify-center bg-white/5 ring-1 ring-white/10 ${c.chip}`}
      >
        <SpectreMark size={c.mark} alt="Spectre Cleaning Solutions" priority={priority} />
      </span>
      <span className={`font-display font-bold tracking-tight text-white ${c.text}`}>
        Spectre<span className="font-medium text-accent-400"> Cleaning</span>
      </span>
    </span>
  );
}
