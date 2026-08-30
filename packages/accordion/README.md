<div align="center">

# 🗂️ @oneuxi/accordion

**SEO-First, Accessible Accordion Disclosure Component for React & Next.js**

*SEO-First Server HTML · Zero-JS Height Animations · WAI-ARIA Compliant · Data-Driven & Composable*

<br />

[![npm version](https://img.shields.io/npm/v/@oneuxi/accordion?color=111111&style=flat-square)](https://www.npmjs.com/package/@oneuxi/accordion)
[![license](https://img.shields.io/github/license/thedebuglab/oneuxi?color=111111&style=flat-square)](https://github.com/thedebuglab/oneuxi/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oneuxi/accordion?color=111111&style=flat-square)](https://bundlephobia.com/package/@oneuxi/accordion)
[![Telegram](https://img.shields.io/badge/Telegram-Join%20Community-26A5E4?style=flat-square&logo=telegram)](https://t.me/thedebuglab)

</div>

---

## 📦 Installation

```bash
npm install @oneuxi/accordion
```

### 🎨 Import Styles

```tsx
import "@oneuxi/accordion/styles.css";
```

---

## 🚀 Quick Start

### Data-Driven API (Recommended)

```tsx
import { Accordion } from "@oneuxi/accordion";
import "@oneuxi/accordion/styles.css";

export default function FAQ() {
  return (
    <Accordion
      variant="bordered"
      items={[
        { id: "1", title: "Is it SEO friendly?", content: "Yes! All content remains in initial server HTML." },
        { id: "2", title: "How does it animate?", content: "Using CSS grid-template-rows zero-JS animation." },
      ]}
    />
  );
}
```

### Composable API

```tsx
import { Accordion } from "@oneuxi/accordion";

<Accordion type="single" variant="bordered">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Title One</Accordion.Trigger>
    <Accordion.Content>Panel Content</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

---

## 📋 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"single" \| "multiple"` | `"single"` | Single open item vs multiple simultaneous open items |
| `collapsible` | `boolean` | `true` | Allows closing open item in single mode |
| `value` | `string \| string[]` | `undefined` | Controlled state value |
| `defaultValue` | `string \| string[]` | `undefined` | Uncontrolled initial open value |
| `onValueChange` | `(value: string \| string[]) => void` | `undefined` | Controlled change callback |
| `variant` | `"minimal" \| "bordered" \| "separated"` | `"minimal"` | Layout variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding & text size |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading element level (`<h2>`-`<h6>`) |
| `items` | `AccordionItemData[]` | `undefined` | Data array for data-driven rendering |
| `keyBy` | `string` | `"id"` | Key field for data-driven mode |
| `titleBy` | `string` | `"title"` | Title field for data-driven mode |
| `contentBy` | `string` | `"content"` | Content field for data-driven mode |

---

## ♿ WAI-ARIA & Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Enter` / `Space` | Toggle focused item |
| `ArrowDown` | Move focus to next trigger |
| `ArrowUp` | Move focus to previous trigger |
| `Home` | Jump focus to first trigger |
| `End` | Jump focus to last trigger |

---

## 💬 Community & Support

Join our Telegram community: **[https://t.me/thedebuglab](https://t.me/thedebuglab)**

---

## 📄 License

MIT © [The Debug Lab](https://github.com/thedebuglab)
