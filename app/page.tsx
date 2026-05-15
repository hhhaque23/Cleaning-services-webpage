import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Stats } from "./components/Stats";
import { Tiers } from "./components/Tiers";
import { BookingFlow } from "./components/Booking/BookingFlow";
import { HowItWorks } from "./components/HowItWorks";
import { SubscriptionCallout } from "./components/SubscriptionCallout";
import { Guarantee } from "./components/Guarantee";
import { Reviews } from "./components/Reviews";
import { Team } from "./components/Team";
import { ServiceAreas } from "./components/ServiceAreas";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <Tiers />
      <BookingFlow />
      <HowItWorks />
      <SubscriptionCallout />
      <Guarantee />
      <Reviews />
      <Team />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
