<div align="center">

# 🔘 @oneuxi/button

**Accessible, Zero-Overhead Button Component for React & Next.js**

*Semantic HTML · No Layout-Shift Loading State · Accessible · CSS Variable Driven*

<br />

[![npm version](https://img.shields.io/npm/v/@oneuxi/button?color=111111&style=flat-square)](https://www.npmjs.com/package/@oneuxi/button)
[![license](https://img.shields.io/github/license/thedebuglab/oneuxi?color=111111&style=flat-square)](https://github.com/thedebuglab/oneuxi/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oneuxi/button?color=111111&style=flat-square)](https://bundlephobia.com/package/@oneuxi/button)

</div>

---

## 📦 Installation

```bash
npm install @oneuxi/button
```

### 🎨 Import Styles

```tsx
import "@oneuxi/button/styles.css";
```

---

## 🚀 Quick Start

```tsx
import { Button } from "@oneuxi/button";
import "@oneuxi/button/styles.css";

export default function App() {
  return (
    <Button variant="solid" tone="primary" size="md">
      Save Changes
    </Button>
  );
}
```

---

## 🔘 Usage Matrix

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

---

## 📋 Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `"solid" \| "outline" \| "ghost" \| "soft" \| "link"` | `"solid"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Dimensions & typography size |
| `tone` | `"primary" \| "neutral" \| "danger"` | `"primary"` | Color tone |
| `loading` | `boolean` | `false` | Shows centered spinner without layout shift |
| `fullWidth` | `boolean` | `false` | Stretches width to `100%` |
| `startIcon` | `ReactNode` | `undefined` | Icon rendered before text label |
| `endIcon` | `ReactNode` | `undefined` | Icon rendered after text label |
| `unstyled` | `boolean` | `false` | Strips default OneUXI styles |
| `disabled` | `boolean` | `undefined` | Standard HTML disabled state |
| `...rest` | `ButtonHTMLAttributes` | — | All native button props supported |

---

## 📄 License

MIT © [The Debug Lab](https://github.com/thedebuglab)
