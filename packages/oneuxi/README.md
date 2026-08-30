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
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Community-26A5E4?style=flat-square&logo=telegram)](https://t.me/thedebuglab)

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

## 📦 Installation & Usage

```bash
npm install oneuxi
```

**Import Syntax:**
```tsx
import { Button, Accordion } from "oneuxi";
```

> **Note:** Tree-shaking is enabled out of the box. Importing `Button` from `"oneuxi"` will **not** bundle the Accordion component or styles.

### 🎨 Import Styles

```tsx
// In your global CSS or root layout:
import "@oneuxi/button/styles.css";
import "@oneuxi/accordion/styles.css";
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

## 🧩 Component APIs

### 🔘 Button

```tsx
<Button variant="solid" tone="primary" size="md" loading={isSubmitting}>
  Save Changes
</Button>
```

### 🗂️ Accordion

```tsx
<Accordion
  variant="bordered"
  items={[
    { id: "1", title: "Question 1", content: "Answer 1" },
    { id: "2", title: "Question 2", content: "Answer 2" },
  ]}
/>
```

---

## 💬 Community & Support

Join our Telegram community: **[https://t.me/thedebuglab](https://t.me/thedebuglab)**

---

## 📄 License

MIT © [The Debug Lab](https://github.com/thedebuglab)
