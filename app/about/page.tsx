import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reviews } from "../components/Reviews";
import { ServiceAreas } from "../components/ServiceAreas";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { AboutHero } from "../components/AboutHero";

export const metadata: Metadata = {
  title: "About · Spectre Cleaning Solutions",
  description:
    "A new, locally-owned Wayne & Washtenaw County cleaning crew based in Canton. The promise and the reviews behind every Spectre clean.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <Navbar />
      <AboutHero />
      <Reviews />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
