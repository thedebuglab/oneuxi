"use client";

import { useState } from "react";
import { Button } from "@oneuxi/button";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M3 4h10M6 4V3h4v1M5 4l.5 8h5l.5-8" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function DemoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="demo-row">
      <span className="demo-label">{label}</span>
      {children}
    </div>
  );
}

export function ButtonDemo() {
  const [saving, setSaving] = useState(false);

  function simulateSave() {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  }

  return (
    <section className="demo-section" aria-labelledby="button-demo-title">
      <h2 className="demo-section-title" id="button-demo-title">
        Button
      </h2>
      <p className="demo-section-desc">
        A semantic <code className="demo-code">&lt;button&gt;</code> element with
        variants, sizes, tones, loading state, and icon support.
      </p>

      {/* Variants */}
      <DemoRow label="Variant">
        <Button variant="solid" size="sm">Solid</Button>
        <Button variant="outline" size="sm">Outline</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
        <Button variant="soft" size="sm">Soft</Button>
        <Button variant="link" size="sm">Link</Button>
      </DemoRow>

      {/* Tones */}
      <DemoRow label="Tone">
        <Button tone="primary" size="sm">Primary</Button>
        <Button tone="neutral" size="sm">Neutral</Button>
        <Button tone="danger" size="sm">Danger</Button>
      </DemoRow>

      {/* Sizes */}
      <DemoRow label="Size">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </DemoRow>

      {/* Outline × Tones */}
      <DemoRow label="Outline">
        <Button variant="outline" tone="primary" size="sm">Primary</Button>
        <Button variant="outline" tone="neutral" size="sm">Neutral</Button>
        <Button variant="outline" tone="danger" size="sm">Danger</Button>
      </DemoRow>

      {/* Ghost × Tones */}
      <DemoRow label="Ghost">
        <Button variant="ghost" tone="primary" size="sm">Primary</Button>
        <Button variant="ghost" tone="neutral" size="sm">Neutral</Button>
        <Button variant="ghost" tone="danger" size="sm">Danger</Button>
      </DemoRow>

      {/* Soft × Tones */}
      <DemoRow label="Soft">
        <Button variant="soft" tone="primary" size="sm">Primary</Button>
        <Button variant="soft" tone="neutral" size="sm">Neutral</Button>
        <Button variant="soft" tone="danger" size="sm">Danger</Button>
      </DemoRow>

      {/* Icons */}
      <DemoRow label="Icons">
        <Button startIcon={<PlusIcon />} size="sm">New item</Button>
        <Button endIcon={<ArrowRightIcon />} size="sm">Continue</Button>
        <Button
          variant="outline"
          tone="danger"
          startIcon={<TrashIcon />}
          size="sm"
        >
          Delete
        </Button>
      </DemoRow>

      {/* States */}
      <DemoRow label="States">
        <Button disabled size="sm">Disabled</Button>
        <Button loading size="sm">Loading</Button>
        <Button
          loading={saving}
          onClick={simulateSave}
          size="sm"
        >
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </DemoRow>

      {/* Full width */}
      <div style={{ marginTop: "8px" }}>
        <Button fullWidth size="sm">Full width button</Button>
      </div>
    </section>
  );
}
