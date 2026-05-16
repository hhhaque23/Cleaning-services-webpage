"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { PHOTOS } from "@/lib/unsplash";

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

function Quote_({ r }: { r: Review }) {
  return (
    <figure className="w-[22rem] sm:w-[26rem] flex-none mr-10 sm:mr-14">
      <Quote className="h-6 w-6 text-grass-500/55" strokeWidth={2.2} />
      <blockquote className="mt-3 text-ink-900 text-[17px] sm:text-[18px] leading-[1.55] font-medium">
        &ldquo;{r.body}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 text-sm">
        <span className="relative h-9 w-9 flex-none rounded-full overflow-hidden">
          <Image src={r.photo} alt="" aria-hidden="true" fill sizes="36px" className="object-cover" />
        </span>
        <span className="leading-tight min-w-0">
          <span className="block font-semibold text-ink-950 truncate">
            {r.name}
            <span className="text-ink-faint font-normal"> · {r.city}</span>
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-grass-700">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3 w-3 fill-grass-500 stroke-grass-500" />
            ))}
            <span className="ml-1.5 text-[11px] uppercase tracking-wider text-ink-700 font-semibold">
              {r.service}
            </span>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const rowA = REVIEWS;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playState = visible ? "running" : "paused";

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-20 sm:py-28 overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_auto] gap-6 items-end max-w-7xl"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-600 font-semibold">
              Real homes, real reviews
            </div>
            <h2 className="mt-3 font-display font-extrabold text-display-1 text-ink-950 text-balance">
              2,300+ five-star cleans across metro Detroit.
            </h2>
          </div>
          <p className="text-ink-700 lg:text-right max-w-xs">
            We don&apos;t curate. Every neighborhood, every tier.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-14 group">
        <div className="relative">
          <div
            className="flex animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowA, ...rowA].map((r, i) => (
              <Quote_ key={`a-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--surface)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--surface)] to-transparent" />
      </div>
    </section>
  );
}
