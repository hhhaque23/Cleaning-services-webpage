import type { Metadata } from "next";
import { AdminShell } from "./_AdminShell";

export const metadata: Metadata = {
  title: "Operations · Pristine Cleaning Co.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
