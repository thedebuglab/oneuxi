import type { Metadata } from "next";
import { ThemeToggle } from "./components/ThemeToggle";
import { ButtonDemo } from "./components/ButtonDemo";
import { AccordionDemo } from "./components/AccordionDemo";

export const metadata: Metadata = {
  title: "OneUXI Demo — Button & Accordion",
  description:
    "Interactive demo of OneUXI components: Button and Accordion. Accessible, SEO-first, TypeScript-ready.",
};

export default function DemoPage() {
  return (
    <main className="demo-page">
      {/* Header */}
      <header className="demo-header">
        <div className="demo-header-title">
          <span className="demo-logo">OneUXI</span>
          <span className="demo-tagline">
            React + Next.js UI Library · Easy by default
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Button component demo */}
      <ButtonDemo />

      <hr className="demo-divider" />

      {/* Accordion component demo */}
      <AccordionDemo />
    </main>
  );
}
