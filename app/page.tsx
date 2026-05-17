import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Stats } from "./components/Stats";
import { RecentTransformations } from "./components/RecentTransformations";
import { HowItWorks } from "./components/HowItWorks";
import { SubscriptionCallout } from "./components/SubscriptionCallout";
import { PhotoQuote } from "./components/PhotoQuote";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <RecentTransformations />
      <HowItWorks />
      <SubscriptionCallout />
      <PhotoQuote />
      <FinalCTA />
      <Footer />
    </main>
  );
}
