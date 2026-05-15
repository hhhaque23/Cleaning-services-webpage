import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Team } from "../components/Team";
import { Guarantee } from "../components/Guarantee";
import { Reviews } from "../components/Reviews";
import { ServiceAreas } from "../components/ServiceAreas";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { AboutHero } from "../components/AboutHero";

export const metadata: Metadata = {
  title: "About · Pristine Cleaning Co.",
  description:
    "Real cleaners, real homes, real guarantee. Meet the team, the promise, and the reviews behind every Pristine clean.",
};

export default function AboutPage() {
  return (
    <main className="relative">
      <Navbar />
      <AboutHero />
      <Team />
      <Guarantee />
      <Reviews />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
