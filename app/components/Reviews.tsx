"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

type Review = {
  name: string;
  city: string;
  service: string;
  body: string;
};

// Placeholder reviews — swap these for real client reviews as they come in.
const REVIEWS: Review[] = [
  {
    name: "Sarah M.",
    city: "Plymouth",
    service: "Biweekly",
    body:
      "Every other week my whole place is spotless — counters, baseboards, even the hard-water spots on the shower glass are gone. Same cleaner each time, and she remembers the little things.",
  },
  {
    name: "Daniel K.",
    city: "Ypsilanti",
    service: "Deep clean",
    body:
      "The deep clean blew me away. They scrubbed the stovetop, degreased the backsplash, and got grime off grout I'd given up on. My kitchen actually sparkles now.",
  },
  {
    name: "Lena P.",
    city: "Saline",
    service: "Weekly",
    body:
      "Two kids and a labrador means constant mess. They pulled pet hair out of corners I didn't know existed and left every floor gleaming — and the eco products didn't bother anyone.",
  },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
      className="group relative w-[80vw] sm:w-[26rem] flex-none mr-4 sm:mr-8 snap-start rounded-2xl bg-[var(--surface-elevated)] border border-line hover:border-grass-500/40 shadow-soft hover:shadow-card transition-all p-6"
    >
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, oklch(0.58 0.15 238 / 0.12), transparent 70%)",
        }}
      />
      <Quote className="relative h-6 w-6 text-grass-500/55" strokeWidth={2.2} />
      <blockquote className="relative mt-3 text-ink-900 text-[16px] sm:text-[17px] leading-[1.55] font-medium">
        &ldquo;{r.body}&rdquo;
      </blockquote>
      <figcaption className="relative mt-5 flex flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-1 text-grass-700">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.3,
                delay: i * 0.06,
                type: "spring",
                stiffness: 320,
                damping: 16,
              }}
            >
              <Star className="h-3.5 w-3.5 fill-grass-500 stroke-grass-500" />
            </motion.span>
          ))}
          <span className="ml-2 text-[11px] uppercase tracking-wider text-ink-700 font-semibold">
            {r.service}
          </span>
        </div>
        <span className="font-semibold text-ink-950">
          {r.name}
          <span className="text-ink-600 font-normal"> · {r.city}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Reviews() {
  const rowA = REVIEWS;
  const rowB = [...REVIEWS].reverse();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playState = visible ? "running" : "paused";

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-14 sm:py-32 overflow-hidden scroll-mt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 topo-lines opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="grid lg:grid-cols-[1fr_auto] gap-6 items-end max-w-7xl"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              Real homes, real reviews
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance leading-[1.05]">
              Five-star cleans{" "}
              <span className="italic font-medium text-ink-700">across Wayne &amp; Washtenaw County.</span>
            </h2>
            <p className="mt-3 text-ink-700 text-lg leading-relaxed">
              10+ five-star reviews — and growing.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-16 space-y-8 group">
        <div className="relative">
          <div
            className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowA, ...rowA].map((r, i) => (
              <ReviewCard key={`a-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none animate-marquee [animation-direction:reverse] [animation-duration:46s] group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowB, ...rowB].map((r, i) => (
              <ReviewCard key={`b-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-40 bg-gradient-to-r from-[var(--surface)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-40 bg-gradient-to-l from-[var(--surface)] to-transparent" />
      </div>
    </section>
  );
}
