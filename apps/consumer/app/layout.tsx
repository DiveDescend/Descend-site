import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Descend — Discover & Book Scuba Diving",
  description:
    "Discover dive sites, explore operators, and book scuba diving experiences worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
