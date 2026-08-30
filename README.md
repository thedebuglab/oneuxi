<div align="center">

# ⚡ OneUXI

**The Zero-Overhead, SEO-First UI Library for React & Next.js**

*Easy by default · Semantic HTML first · Accessible · CSS Variable Driven · Zero runtime JS abstractions*

<br />

[![npm version](https://img.shields.io/npm/v/oneuxi?color=111111&style=flat-square)](https://www.npmjs.com/package/oneuxi)
[![license](https://img.shields.io/github/license/thedebuglab/oneuxi?color=111111&style=flat-square)](https://github.com/thedebuglab/oneuxi/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/oneuxi?color=111111&style=flat-square)](https://bundlephobia.com/package/oneuxi)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React 18+](https://img.shields.io/badge/React-18%2B-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Next.js 15+](https://img.shields.io/badge/Next.js-15%2B-000000?style=flat-square&logo=next.js)](https://nextjs.org/)

<br />

</div>

---

## 🎯 Core Philosophy

```
Easy API + Data-driven UI + Progressive Enhancement + SEO-first Semantic HTML + Minimal JavaScript
```

OneUXI is engineered for high-performance applications where SEO, accessibility, and clean architecture are non-negotiable.

| Feature | Advantage |
| :--- | :--- |
| **🔍 SEO-First HTML** | Content is rendered server-side in raw HTML. Accordion panels are never removed from the DOM. |
| **♿ Accessibility Default** | WAI-ARIA compliant out of the box with built-in keyboard navigation & focus states. |
| **⚡ Zero Runtime Overhead** | Styled with plain CSS & CSS variables. No CSS-in-JS injection, no Framer Motion bloat. |
| **🎨 Deep Customization** | Customize globally via CSS variables or locally using `data-*` attribute selectors. |
| **📦 3 Installation Modes** | Choose between full package, per-component npm packages, or CLI source-code ownership. |

---

## 📦 Installation & Import Strategies

OneUXI supports three distinct consumption workflows to fit any team or project requirement:

### Strategy A: Full Package (Recommended)

Install the single `oneuxi` package for access to all components with full tree-shaking support.

```bash
# npm
npm install oneuxi

# pnpm
pnpm add oneuxi

# yarn
yarn add oneuxi
```

**Import Syntax:**
```tsx
import { Button, Accordion } from "oneuxi";
```

> **Note:** Tree-shaking is enabled out of the box. Importing `Button` from `"oneuxi"` will **not** bundle the Accordion component or styles.

---

### Strategy B: Per-Component Micro Packages

For ultra-strict bundle budgets, install only the exact component packages you need. No root wrapper overhead.

```bash
# Install individual components
npm install @oneuxi/button
npm install @oneuxi/accordion
```

**Import Syntax:**
```tsx
import { Button } from "@oneuxi/button";
import { Accordion } from "@oneuxi/accordion";
```

---

### Strategy C: Source-Copy CLI Mode (Full Code Ownership)

Copy component source code directly into your codebase for zero third-party dependency locking (similar to shadcn/ui).

```bash
# Copy button to components/ui/button.tsx
npx oneuxi add button

# Copy accordion to components/ui/accordion.tsx
npx oneuxi add accordion
```

**Import Syntax:**
```tsx
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
```

---

### 🎨 Importing Styles & Next.js Integration

OneUXI uses self-contained CSS files powered by CSS variables.

#### 1. Import CSS Files
Add component styles to your global CSS or root layout:

```tsx
// app/layout.tsx (or _app.tsx / index.tsx)
import "@oneuxi/button/styles.css";
import "@oneuxi/accordion/styles.css";
```

#### 2. Next.js App Router Setup
Add `transpilePackages` to your `next.config.ts` for instant workspace & source transpilation:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["oneuxi", "@oneuxi/button", "@oneuxi/accordion"],
};

export default nextConfig;
```

---

## 🚀 Quick Start Example

```tsx
import { Button, Accordion } from "oneuxi";
import "@oneuxi/button/styles.css";
import "@oneuxi/accordion/styles.css";

export default function Page() {
  return (
    <main style={{ maxWidth: 640, margin: "40px auto", padding: 24 }}>
      <h1>Product FAQ</h1>
      
      {/* Accordion Component */}
      <Accordion
        variant="bordered"
        items={[
          {
            id: "seo",
            title: "Is OneUXI SEO friendly?",
            content: "Yes! All content is present in the initial server HTML response."
          },
          {
            id: "styling",
            title: "How is it styled?",
            content: "Using standard CSS variables and data-attributes."
          }
        ]}
      />

      {/* Button Component */}
      <div style={{ marginTop: 24 }}>
        <Button variant="solid" tone="primary" size="md">
          Get Started
        </Button>
      </div>
    </main>
  );
}
```

---

## 🧩 Component API Reference

### 🔘 Button (`@oneuxi/button`)

Semantic `<button>` component with no layout-shift loading spinners, icon placement, and full variant/tone matrix.

#### Variants & Tones Code Matrix

```tsx
// Visual Variants
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="soft">Soft</Button>
<Button variant="link">Link</Button>

// Color Tones
<Button tone="primary">Primary</Button>
<Button tone="neutral">Neutral</Button>
<Button tone="danger">Danger</Button>

// Sizes & Options
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button fullWidth>Full Width</Button>

// Icons & Loading State (No Layout Shift)
<Button startIcon={<PlusIcon />}>Add Item</Button>
<Button endIcon={<ArrowIcon />}>Continue</Button>
<Button loading={isSubmitting}>Save Changes</Button>
```

#### Button Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"solid" \| "outline" \| "ghost" \| "soft" \| "link"` | `"solid"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button dimensions & typography size |
| `tone` | `"primary" \| "neutral" \| "danger"` | `"primary"` | Color palette tone |
| `loading` | `boolean` | `false` | Shows centered spinner & disables button without layout shifts |
| `fullWidth` | `boolean` | `false` | Expands button width to `100%` of container |
| `startIcon` | `ReactNode` | `undefined` | Icon rendered before text label |
| `endIcon` | `ReactNode` | `undefined` | Icon rendered after text label |
| `unstyled` | `boolean` | `false` | Strips all default OneUXI styles for raw HTML control |
| `disabled` | `boolean` | `undefined` | Standard HTML disabled state |
| `...rest` | `ButtonHTMLAttributes` | — | Supports `onClick`, `type`, `id`, `aria-*`, `data-*`, `ref` |

---

### 🗂️ Accordion (`@oneuxi/accordion`)

SEO-first disclosure component using CSS grid (`grid-template-rows: 0fr -> 1fr`) for zero-JS height transitions.

#### 1. Data-Driven API (Recommended)

Pass data directly. Perfect for FAQs, CMS items, and dynamic API responses.

```tsx
// Simple usage
<Accordion
  items={[
    { id: "1", title: "Question 1", content: "Answer 1" },
    { id: "2", title: "Question 2", content: "Answer 2" },
  ]}
/>

// Custom Field Name Mapping
<Accordion
  items={cmsData}
  keyBy="faqId"
  titleBy="question"
  contentBy="answer"
  variant="separated"
/>
```

#### 2. Composable API (Full Control)

```tsx
<Accordion type="single" variant="bordered" headingLevel={2}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>What is Composable Mode?</Accordion.Trigger>
    <Accordion.Content>
      It allows rendering custom React nodes inside triggers and panels.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

#### Accordion Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"single" \| "multiple"` | `"single"` | Single open item vs multiple simultaneous open items |
| `collapsible` | `boolean` | `true` | Allows closing open item in single mode |
| `value` | `string \| string[]` | `undefined` | Controlled state value |
| `defaultValue` | `string \| string[]` | `undefined` | Uncontrolled initial open value |
| `onValueChange` | `(value: string \| string[]) => void` | `undefined` | Controlled change callback |
| `variant` | `"minimal" \| "bordered" \| "separated"` | `"minimal"` | Layout & border styling variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding & text sizing |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | HTML Heading element (`<h2>` - `<h6>`) for document outline |
| `items` | `AccordionItemData[]` | `undefined` | Data array for data-driven rendering |
| `keyBy` | `string` | `"id"` | Object key name for item identifier |
| `titleBy` | `string` | `"title"` | Object key name for header title |
| `contentBy` | `string` | `"content"` | Object key name for panel content |

#### ♿ WAI-ARIA & Keyboard Navigation

| Key | Action |
| :--- | :--- |
| `Enter` / `Space` | Toggle focused accordion item |
| `ArrowDown` | Move focus to next accordion trigger |
| `ArrowUp` | Move focus to previous accordion trigger |
| `Home` | Jump focus to first accordion trigger |
| `End` | Jump focus to last accordion trigger |

---

## 🎨 Design System & CSS Variables

OneUXI tokens are pure CSS custom properties. Customize globally by overriding `:root` values or locally using `data-ui` attributes.

### Token Table

```css
:root {
  /* Colors */
  --ui-bg: #ffffff;
  --ui-fg: #111111;
  --ui-muted: #6b7280;
  --ui-border: #e5e7eb;
  --ui-primary: #111111;
  --ui-primary-fg: #ffffff;
  --ui-danger: #dc2626;

  /* Radius */
  --ui-radius-sm: 4px;
  --ui-radius-md: 6px;
  --ui-radius-lg: 10px;

  /* Motion */
  --ui-duration-fast: 120ms;
  --ui-duration-normal: 180ms;
}
```

### Dark Mode Integration

Dark mode works seamlessly out of the box via OS preference or manual HTML attribute override:

```html
<!-- Explicit Dark Mode -->
<html data-theme="dark">

<!-- Explicit Light Mode (Overrides dark system preference) -->
<html data-theme="light">
```

---

## 🏗️ Monorepo Architecture

```
oneuxi/
├── packages/
│   ├── core/         # Design tokens CSS (@oneuxi/core)
│   ├── button/       # Button component package (@oneuxi/button)
│   ├── accordion/    # Accordion component package (@oneuxi/accordion)
│   └── oneuxi/       # Main aggregator package & CLI binary (oneuxi)
└── apps/
    └── demo/
        └── next/     # Next.js 15 App Router interactive demo
```

---

## 🛠️ Development & Testing

```bash
# Clone repository
git clone https://github.com/thedebuglab/oneuxi.git
cd oneuxi

# Install dependencies
pnpm install

# Run unit & SSR tests (Vitest + RTL)
pnpm test

# Run TypeScript validation across monorepo
pnpm typecheck

# Build all packages (tsup ESM/CJS/DTS)
pnpm build

# Launch Next.js demo application
pnpm dev
```

---

## 📄 License

MIT © [The Debug Lab](https://github.com/thedebuglab)
