"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, TrendingUp, Repeat, ShieldCheck } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    `${prefix}${v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`
  );
  const [display, setDisplay] = useState(
    `${prefix}0${decimals ? "." + "0".repeat(decimals) : ""}${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, motionVal, rounded, duration]);

  return <span ref={ref}>{display}</span>;
}

export function Stats() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.78_0.16_145/0.1)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-[20rem] w-[20rem] rounded-full bg-[oklch(0.65_0.13_220/0.08)] blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              Since 2019
            </div>
            <div className="mt-3 flex items-start gap-2 font-display font-extrabold text-ink-950 leading-[0.92] tracking-[-0.04em]">
              <span className="text-[clamp(5rem,11vw,10rem)]">
                <Counter to={12384} suffix="" duration={2} />
              </span>
              <span className="text-[clamp(2rem,4vw,3.5rem)] text-grass-600 mt-3">
                +
              </span>
            </div>
            <p className="mt-2 text-lg text-ink-700 max-w-md text-pretty">
              homes cleaned across metro Detroit, by a team that&apos;s mostly
              been on the same crew since year one.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-5 sm:gap-7 max-w-md">
              <Inline
                figure={
                  <>
                    <Counter to={4.9} decimals={1} duration={1.4} />
                    <span className="text-ink-600 font-medium text-lg">/5</span>
                  </>
                }
                label="2,300+ reviews"
              />
              <Inline
                figure={
                  <>
                    <Counter to={92} duration={1.4} />
                    <span className="text-ink-600 font-medium text-lg">%</span>
                  </>
                }
                label="Rebook in 30 days"
              />
              <Inline
                figure={
                  <>
                    $<Counter to={2} duration={1.2} />M
                  </>
                }
                label="Liability cover"
              />
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 28, rotate: -2.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[26rem] aspect-[3/4] mx-auto lg:mx-0 lg:ml-auto overflow-hidden rounded-[1.5rem]"
          >
            <Image
              src={PHOTOS.bathroom}
              alt="A bathroom on a quiet weekday afternoon after a Pristine clean"
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-[oklch(0.13_0.045_230/0.35)] via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 right-4 text-[var(--surface)] text-[11px] uppercase tracking-[0.14em] font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.13_0.045_230/0.55)] backdrop-blur-sm px-2.5 py-1">
                <span className="inline-block h-1 w-1 rounded-full bg-grass-400" />
                Tuesday, 2:14 PM
              </span>
            </figcaption>
          </motion.figure>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 sm:mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-600 border-t border-line pt-6"
        >
          <span className="inline-flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-grass-600" />
            <span className="font-semibold text-ink-950">
              <Counter to={3.4} decimals={1} duration={1.2} />x
            </span>
            <span>more reviews than the next local competitor</span>
          </span>
          <span className="text-line-strong">·</span>
          <span>
            Featured in{" "}
            <span className="text-ink-950 font-semibold">Hour Detroit</span>,{" "}
            <span className="text-ink-950 font-semibold">Crain&apos;s</span>, and{" "}
            <span className="text-ink-950 font-semibold">Rochester Patch</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Inline({
  figure,
  label,
}: {
  figure: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <div className="font-display font-extrabold text-2xl sm:text-3xl text-ink-950 tracking-[-0.02em] tabular-nums leading-none">
        {figure}
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-700">
        {label}
      </div>
    </div>
  );
}
