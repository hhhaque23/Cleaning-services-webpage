import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { FinalCTA } from "../../components/FinalCTA";
import { ServiceDetail } from "../../components/ServiceDetail";
import { SLUG_TO_TIER, TIER_SLUGS } from "@/lib/tiers";
import { TIER_META } from "../../components/Booking/pricing";

type Props = { params: { tier: string } };

export function generateStaticParams() {
  return TIER_SLUGS.map((tier) => ({ tier }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tier = SLUG_TO_TIER[params.tier];
  if (!tier) return { title: "Not found" };
  const meta = TIER_META[tier];
  return {
    title: `${meta.label} · Pristine Cleaning Co.`,
    description: `${meta.label} cleaning details and pricing. ${meta.tagline}. Book online in 60 seconds.`,
  };
}

export default function ServicePage({ params }: Props) {
  const tier = SLUG_TO_TIER[params.tier];
  if (!tier) notFound();

  return (
    <main className="relative">
      <Navbar />
      <ServiceDetail tier={tier} />
      <FinalCTA />
      <Footer />
    </main>
  );
}
