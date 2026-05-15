import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pristine Cleaning Co. · Book a cleaner in 60 seconds",
  description:
    "Rochester Hills and metro Detroit's no-friction home cleaning. Transparent pricing, same-day availability, eco-friendly products. Book online in under a minute.",
  metadataBase: new URL("https://pristine.example.com"),
  openGraph: {
    title: "Pristine Cleaning Co.",
    description:
      "Book a vetted cleaner in 60 seconds. Transparent pricing. Same-day availability. Rochester Hills and metro Detroit.",
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
        {children}
      </body>
    </html>
  );
}
