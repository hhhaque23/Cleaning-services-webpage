"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, TrendingUp, Repeat, ShieldCheck } from "lucide-react";

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
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-end">
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
              <span className="text-[clamp(5.5rem,12vw,11rem)]">
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
          </motion.div>

          <div className="space-y-5 lg:pb-3">
            <Inline
              icon={Star}
              tone="grass"
              figure={
                <>
                  <Counter to={4.9} decimals={1} duration={1.4} />
                  <span className="text-ink-600 font-medium text-2xl">/5</span>
                </>
              }
              label="From 2,300+ verified reviews"
              delay={0.05}
            />
            <Inline
              icon={Repeat}
              tone="ink"
              figure={
                <>
                  <Counter to={92} duration={1.4} />
                  <span className="text-ink-600 font-medium text-2xl">%</span>
                </>
              }
              label="Of clients book us again within 30 days"
              delay={0.12}
            />
            <Inline
              icon={ShieldCheck}
              tone="ink"
              figure={
                <>
                  $<Counter to={2} duration={1.2} />M
                </>
              }
              label="Liability coverage on every clean, bonded"
              delay={0.19}
            />
          </div>
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
  icon: Icon,
  tone,
  figure,
  label,
  delay,
}: {
  icon: typeof Star;
  tone: "ink" | "grass";
  figure: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      className="flex items-start gap-4 group"
    >
      <span
        className={`inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl mt-1 ${
          tone === "grass"
            ? "bg-[oklch(0.78_0.16_145/0.16)] text-grass-700"
            : "bg-[oklch(0.65_0.13_220/0.1)] text-ink-700"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <div className="font-display font-extrabold text-4xl text-ink-950 tracking-[-0.02em] tabular-nums">
          {figure}
        </div>
        <p className="mt-1.5 text-[15px] text-ink-700 max-w-sm">{label}</p>
      </div>
    </motion.div>
  );
}
