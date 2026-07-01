import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavGuard from "@/components/nav/nav-guard";
import BottomNav from "@/components/nav/bottom-nav";
import Footer from "@/components/nav/footer";
import AgentationOverlay from "@/components/dev/agentation-overlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Descend — Discover & Book Scuba Diving",
  description:
    "Discover dive sites, explore operators, and book scuba diving experiences worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <NavGuard />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <AgentationOverlay />
      </body>
    </html>
  );
}
