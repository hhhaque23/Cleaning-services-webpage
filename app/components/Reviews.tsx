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

function Card({ r }: { r: Review }) {
  return (
    <div className="w-[20rem] sm:w-[22rem] flex-none rounded-2xl bg-white border border-ink-200/70 shadow-card p-5 mr-4">
      <div className="flex items-start justify-between">
        <Quote className="h-7 w-7 text-ink-300" />
        <div className="flex items-center gap-0.5 text-grass-600">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-grass-500 stroke-grass-500" />
          ))}
        </div>
      </div>
      <p className="mt-3 text-ink-900/90 text-[15px] leading-relaxed">
        &ldquo;{r.body}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="relative h-10 w-10 flex-none rounded-full overflow-hidden ring-2 ring-white shadow">
          <Image src={r.photo} alt="" aria-hidden="true" fill sizes="40px" className="object-cover" />
        </span>
        <div className="leading-tight min-w-0">
          <div className="text-sm font-semibold text-ink-950 truncate">{r.name}</div>
          <div className="text-xs text-ink-700">
            {r.city} · <span className="font-semibold">{r.service}</span>
          </div>
        </div>
      </div>
    </div>
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
      { rootMargin: "120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playState = visible ? "running" : "paused";

  return (
    <section ref={sectionRef} id="reviews" className="relative py-16 sm:py-24 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-grass-500/12 text-grass-700 text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
            <Star className="h-3.5 w-3.5 fill-grass-700" /> Real homes, real reviews
          </div>
          <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-ink-950">
            2,300+ five-star cleans across metro Detroit.
          </h2>
          <p className="mt-3 text-ink-800/80 text-lg">
            We don&apos;t curate. Every neighborhood, every service tier, every review.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 space-y-4 group">
        <div className="relative">
          <div
            className="flex animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowA, ...rowA].map((r, i) => (
              <Card key={`a-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="flex animate-marquee [animation-direction:reverse] [animation-duration:46s] group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: playState }}
          >
            {[...rowB, ...rowB].map((r, i) => (
              <Card key={`b-${i}`} r={r} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[var(--bg-deep)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[var(--bg-deep)] to-transparent" />
      </div>
    </section>
  );
}
