"use client";

import { useState } from "react";
import { Accordion } from "@oneuxi/accordion";

const FAQ_ITEMS = [
  {
    id: "seo",
    title: "What is SEO and why does it matter?",
    content:
      "SEO (Search Engine Optimization) improves a website's visibility in search engines. OneUXI Accordion renders all content server-side so search engines can index it without JavaScript.",
  },
  {
    id: "nextjs",
    title: "Why is Next.js a good fit for OneUXI?",
    content:
      "Next.js supports server-side rendering out of the box, which aligns with OneUXI's SEO-first principle. Components render their HTML on the server, and JavaScript only enhances the interaction.",
  },
  {
    id: "a11y",
    title: "How does OneUXI handle accessibility?",
    content:
      "OneUXI follows the WAI-ARIA Accordion design pattern with aria-expanded, aria-controls, role=region, and full keyboard navigation (ArrowDown, ArrowUp, Home, End, Enter, Space).",
  },
  {
    id: "dark",
    title: "How does dark mode work?",
    content:
      "Dark mode uses CSS custom properties with data-theme=dark on the root element, and also responds to the prefers-color-scheme media query. No JavaScript is needed for theme rendering.",
  },
];

const CUSTOM_DATA = [
  { faqId: "q1", question: "What does keyBy do?", answer: "The keyBy prop maps a custom field name to use as the unique key for each accordion item." },
  { faqId: "q2", question: "What does titleBy do?", answer: "The titleBy prop maps a custom field name to use as the trigger title text." },
  { faqId: "q3", question: "What does contentBy do?", answer: "The contentBy prop maps a custom field name to use as the expanded content." },
];

function DemoBlock({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="demo-accordion-wrap">
      <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--ui-muted)", marginBottom: "12px" }}>
        {label}
      </p>
      {description && (
        <p style={{ fontSize: "0.8125rem", color: "var(--ui-muted)", marginBottom: "12px", opacity: 0.8 }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function AccordionDemo() {
  const [controlledOpen, setControlledOpen] = useState<string>("seo");

  return (
    <section className="demo-section" aria-labelledby="accordion-demo-title">
      <h2 className="demo-section-title" id="accordion-demo-title">
        Accordion
      </h2>
      <p className="demo-section-desc">
        SEO-first, accessible accordion with a data-driven API and a composable API.
        Content is always server-rendered — JavaScript only handles interactions.
      </p>

      {/* ── Data-driven API ── */}
      <DemoBlock
        label="Data-driven (recommended)"
        description="Pass an items array. All content is in the DOM for SEO."
      >
        <Accordion items={FAQ_ITEMS} variant="minimal" />
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── Custom field mapping ── */}
      <DemoBlock label="Custom field mapping — keyBy / titleBy / contentBy">
        <Accordion
          items={CUSTOM_DATA}
          keyBy="faqId"
          titleBy="question"
          contentBy="answer"
          variant="bordered"
        />
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── Composable API ── */}
      <DemoBlock label="Composable API — full control">
        <Accordion type="single" variant="separated">
          <Accordion.Item value="composable-1">
            <Accordion.Trigger>What is the composable API?</Accordion.Trigger>
            <Accordion.Content>
              The composable API gives you full control over the structure.
              Use <code style={{ fontFamily: "monospace", fontSize: "0.8em" }}>Accordion.Item</code>,{" "}
              <code style={{ fontFamily: "monospace", fontSize: "0.8em" }}>Accordion.Trigger</code>, and{" "}
              <code style={{ fontFamily: "monospace", fontSize: "0.8em" }}>Accordion.Content</code> directly.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="composable-2">
            <Accordion.Trigger>Can I mix rich content?</Accordion.Trigger>
            <Accordion.Content>
              <p style={{ marginBottom: "8px" }}>Yes — the composable API accepts any React node as content.</p>
              <ul style={{ paddingLeft: "20px", color: "var(--ui-muted)" }}>
                <li>Lists</li>
                <li>Images</li>
                <li>Other components</li>
              </ul>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="composable-3" disabled>
            <Accordion.Trigger>Disabled item</Accordion.Trigger>
            <Accordion.Content>This item is disabled and cannot be opened.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── Multiple mode ── */}
      <DemoBlock label='type="multiple" — multiple items open at once'>
        <Accordion items={FAQ_ITEMS.slice(0, 3)} type="multiple" variant="bordered" />
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── Controlled ── */}
      <DemoBlock label="Controlled mode">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {FAQ_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setControlledOpen(item.id === controlledOpen ? "" : item.id)}
              style={{
                padding: "4px 10px",
                fontSize: "0.75rem",
                fontFamily: "inherit",
                border: "1px solid var(--ui-border)",
                borderRadius: "4px",
                cursor: "pointer",
                background: controlledOpen === item.id ? "var(--ui-primary)" : "transparent",
                color: controlledOpen === item.id ? "var(--ui-primary-fg)" : "var(--ui-fg)",
                transition: "all 0.15s",
              }}
            >
              {item.id}
            </button>
          ))}
        </div>
        <Accordion
          items={FAQ_ITEMS}
          value={controlledOpen}
          onValueChange={(v) => setControlledOpen(v as string)}
          variant="minimal"
        />
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── Variants ── */}
      <DemoBlock label='variant="minimal"'>
        <Accordion items={FAQ_ITEMS.slice(0, 2)} variant="minimal" />
      </DemoBlock>
      <DemoBlock label='variant="bordered"'>
        <Accordion items={FAQ_ITEMS.slice(0, 2)} variant="bordered" />
      </DemoBlock>
      <DemoBlock label='variant="separated"'>
        <Accordion items={FAQ_ITEMS.slice(0, 2)} variant="separated" />
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── Sizes ── */}
      <DemoBlock label='size="sm"'>
        <Accordion items={FAQ_ITEMS.slice(0, 2)} size="sm" variant="bordered" />
      </DemoBlock>
      <DemoBlock label='size="md" (default)'>
        <Accordion items={FAQ_ITEMS.slice(0, 2)} size="md" variant="bordered" />
      </DemoBlock>
      <DemoBlock label='size="lg"'>
        <Accordion items={FAQ_ITEMS.slice(0, 2)} size="lg" variant="bordered" />
      </DemoBlock>

      <hr className="demo-divider" />

      {/* ── headingLevel ── */}
      <DemoBlock
        label="headingLevel={2} — configurable semantic heading"
        description="Important for correct document outline structure and SEO."
      >
        <Accordion items={FAQ_ITEMS.slice(0, 2)} headingLevel={2} variant="minimal" />
      </DemoBlock>
    </section>
  );
}
