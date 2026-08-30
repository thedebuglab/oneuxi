import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneUXI — React + Next.js UI Library",
  description:
    "Visual demo for OneUXI: accessible, SEO-first, TypeScript-ready React components. Easy by default.",
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
