import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProgressRail } from "./components/motion/ScrollProgressRail";
import { PastelRibbons } from "./components/motion/PastelRibbons";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spectrecleaningsolutions.com"),
  title: "Spectre Cleaning Solutions · Book a cleaner in 60 seconds",
  description:
    "Washtenaw County's no-friction home & office cleaning. Transparent pricing, same-day availability, eco-friendly products. Book online in under a minute.",
  openGraph: {
    title: "Spectre Cleaning Solutions",
    description:
      "Book a vetted cleaner in 60 seconds. Transparent pricing. Same-day availability. Ann Arbor and Washtenaw County.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased bg-[var(--surface)] text-[var(--ink)]">
        <PastelRibbons />
        <ScrollProgressRail />
        {children}
      </body>
    </html>
  );
}
