"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";
import { EASE_OUT_QUINT } from "./motion/motion-primitives";

type Review = {
  name: string;
  city: string;
  service: string;
  body: string;
  photo: string;
};

const REVIEWS: Review[] = [
  {
    name: "Sarah M.",
    city: "Rochester Hills",
    service: "Biweekly",
    body:
      "Booked at 10pm Sunday, cleaner showed up Monday morning. The same person every two weeks since. I forgot what doing chores even feels like.",
    photo: PHOTOS.reviewers.sarah,
  },
  {
    name: "Daniel K.",
    city: "Troy",
    service: "Move-out",
    body:
      "Landlord refunded my full deposit, no questions asked. The photo report at the end was worth the price by itself.",
    photo: PHOTOS.reviewers.daniel,
  },
  {
    name: "Lena P.",
    city: "Birmingham",
    service: "Deep clean",
    body:
      "I have a labrador and a 2-year-old. They got pet hair out of corners I didn't know existed. Eco products didn't bother either of them.",
    photo: PHOTOS.reviewers.lena,
  },
  {
    name: "Aman S.",
    city: "Bloomfield Hills",
    service: "Weekly",
    body:
      "The price calculator was honest. Final invoice matched it exactly. No 'oh by the way' charges. Refreshing.",
    photo: PHOTOS.reviewers.aman,
  },
  {
    name: "Chloe R.",
    city: "Auburn Hills",
    service: "Standard",
    body:
      "Texted me 14 minutes after I booked. Cleaner had a photo and bio. Felt like meeting a neighbor, not a stranger.",
    photo: PHOTOS.reviewers.chloe,
  },
  {
    name: "Nathan G.",
    city: "Royal Oak",
    service: "Move-in",
    body:
      "We bought a place the previous owner had cats in for 15 years. They turned it around in 6 hours. Smells like a hotel now.",
    photo: PHOTOS.reviewers.nathan,
  },
  {
    name: "Rachel D.",
    city: "Rochester",
    service: "Biweekly",
    body:
      "My cleaner remembers that I prefer the kitchen left to last. Tiny detail, huge difference. Subscribed for over a year now.",
    photo: PHOTOS.reviewers.rachel,
  },
  {
    name: "Omar L.",
    city: "Sterling Heights",
    service: "Deep clean",
    body:
      "They missed a spot above the fridge. Texted them at 9pm, they came back at 8am the next day. That's a real guarantee.",
    photo: PHOTOS.reviewers.omar,
  },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
      className="group relative w-[22rem] sm:w-[26rem] flex-none mr-6 sm:mr-8 rounded-2xl bg-[var(--surface-elevated)] border border-line hover:border-grass-500/40 shadow-soft hover:shadow-card transition-all p-6"
    >
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, oklch(0.68 0.18 145 / 0.12), transparent 70%)",
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
          <span className="text-ink-faint font-normal"> · {r.city}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Reviews() {
  const rowA = REVIEWS.slice(0, 5);
  const rowB = REVIEWS.slice(3, 8);
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
      className="relative py-24 sm:py-32 overflow-hidden scroll-mt-24"
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
              2,300+ five-star cleans{" "}
              <span className="italic font-medium text-ink-700">across metro Detroit.</span>
            </h2>
          </div>
          <p className="text-ink-700 lg:text-right max-w-xs">
            We don&apos;t curate. Every neighborhood, every tier.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-16 space-y-8 group">
        <div className="relative">
          <div
            className="flex animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowA, ...rowA].map((r, i) => (
              <ReviewCard key={`a-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="flex animate-marquee [animation-direction:reverse] [animation-duration:46s] group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowB, ...rowB].map((r, i) => (
              <ReviewCard key={`b-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--surface)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--surface)] to-transparent" />
      </div>
    </section>
  );
}
