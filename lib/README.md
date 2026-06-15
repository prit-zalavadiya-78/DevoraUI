<div align="center">

# 🚀 devora-ui

### Premium Dark-Themed React Components — Ready in Seconds

[![npm version](https://img.shields.io/npm/v/devora-ui?style=for-the-badge&logo=npm&logoColor=white&color=6366f1)](https://www.npmjs.com/package/devora-ui)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Bundle](https://img.shields.io/badge/Styles-Inline_CSS-059669?style=for-the-badge)](#-zero-config-design)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

<br/>

**23 production-ready React components** with a premium dark aesthetic.  
Zero CSS imports. Zero Tailwind. Zero configuration. Just `npm install` and build.

<br/>

[Install](#-installation) · [Quick Start](#-quick-start) · [Components](#-components) · [API Reference](#-api-reference) · [Platform](https://devoraui-1.onrender.com)

---

</div>

<br/>

## 📦 Installation

```bash
npm install devora-ui
```

> **Peer dependency:** React 19+ (`react` must be installed in your project)

<br/>

## ⚡ Quick Start

```jsx
import { Button, Card, Input, Modal } from "devora-ui";

function App() {
  return (
    <Card title="Welcome to DevoraUI" description="Build faster with premium components.">
      <Input label="Email" placeholder="you@example.com" />
      <Button text="Get Started" variant="primary" />
    </Card>
  );
}
```

That's it. No CSS imports, no theme providers, no configuration files. Every component renders with a polished dark theme out of the box.

<br/>

## 🎨 Zero-Config Design

Every component in `devora-ui` follows these design principles:

| Principle | Details |
|---|---|
| **Dark-first** | Backgrounds: `#0f172a`, `#020617` — designed for dark UIs |
| **Inline styles** | Zero CSS files, zero Tailwind — works in any React setup |
| **System fonts** | `system-ui, -apple-system, sans-serif` — no font loading |
| **Self-contained** | Each component is a single file with no cross-dependencies |
| **Sensible defaults** | Every prop has a default — components look great with zero configuration |
| **Rich accents** | Gradients like `#6366f1 → #7c3aed`, subtle borders, premium shadows |

<br/>

## 🧩 Components

### Overview

| Category | Components | Count |
|---|---|---|
| **🎯 Actions** | `Button` · `GlowButton` | 2 |
| **📝 Form Inputs** | `Input` · `Textarea` · `Select` · `Checkbox` · `RadioGroup` · `Switch` · `FileUploader` | 7 |
| **📐 Layout** | `Card` · `Navbar` · `Sidebar` · `Tabs` · `Accordion` · `Pagination` | 6 |
| **💬 Feedback** | `Alert` · `Badge` · `Toast` · `Tooltip` · `LoadingCard` | 5 |
| **🪟 Overlays** | `Modal` · `Drawer` | 2 |
| **📊 Data Display** | `DataTable` | 1 |

<br/>

## 📖 API Reference

### Button

A versatile button with multiple variants, sizes, and states.

```jsx
import { Button } from "devora-ui";

<Button text="Get Started" />
<Button text="Learn More" variant="secondary" />
<Button text="Cancel" variant="ghost" />
<Button text="Delete" variant="danger" size="sm" />
<Button text="Processing..." loading={true} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `"Get Started"` | Button label |
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `disabled` | `boolean` | `false` | Disable interactions |
| `loading` | `boolean` | `false` | Show loading state |
| `onClick` | `function` | `() => {}` | Click handler |

---

### GlowButton

A gradient button with a glowing box-shadow effect.

```jsx
import { GlowButton } from "devora-ui";

<GlowButton text="Get Started" />
<GlowButton text="Dark Mode" variant="dark" />
<GlowButton text="Light" variant="light" size="lg" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `"Click Me"` | Button label |
| `variant` | `"primary" \| "dark" \| "light"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `disabled` | `boolean` | `false` | Disable interactions |
| `onClick` | `function` | — | Click handler |

---

### Input

A labeled text input with helper text and error state.

```jsx
import { Input } from "devora-ui";

<Input label="Email" placeholder="you@example.com" />
<Input label="Password" type="password" error="Password is required" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Email"` | Input label |
| `placeholder` | `string` | `"Enter your email"` | Placeholder text |
| `value` | `string` | `""` | Controlled value |
| `type` | `string` | `"text"` | HTML input type |
| `helperText` | `string` | `"We will never share your email."` | Helper message below input |
| `error` | `string` | `""` | Error message (overrides helperText) |
| `accent` | `string` | `"#6366f1"` | Accent color (hex) |
| `onChange` | `function` | `() => {}` | Change handler (receives value) |

---

### Card

A content card with title, description, accent bar, and footer.

```jsx
import { Card } from "devora-ui";

<Card
  title="Dashboard"
  description="View your analytics and manage settings."
  footer="Last updated: today"
  accent="#059669"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Card title"` | Card heading |
| `description` | `string` | `"Card description goes here."` | Card body text |
| `footer` | `string` | `"Footer text"` | Footer content |
| `accent` | `string` | `"#6366f1"` | Accent bar color (hex) |

---

### Alert

A dismissible alert banner with type-based color coding.

```jsx
import { Alert } from "devora-ui";

<Alert title="Success!" message="Your changes have been saved." type="success" />
<Alert title="Error" message="Something went wrong." type="error" />
<Alert title="Warning" message="This action is irreversible." type="warning" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Important Update"` | Alert title |
| `message` | `string` | `"We've updated our privacy policy..."` | Alert body |
| `type` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Alert color variant |
| `accent` | `string` | `"#6366f1"` | Custom accent (fallback if type is unknown) |
| `bg` | `string` | `"#0f172a"` | Background color |
| `onClose` | `function` | `() => {}` | Close button handler |

---

### Modal

A dialog with overlay, title, description, and confirm/cancel actions. Supports both controlled and uncontrolled modes.

```jsx
import { Modal } from "devora-ui";

// Uncontrolled (opens by default)
<Modal title="Confirm Action" description="Are you sure?" />

// Controlled
const [open, setOpen] = useState(false);
<Modal
  open={open}
  title="Delete Item"
  description="This cannot be undone."
  confirmText="Delete"
  onConfirm={() => handleDelete()}
  onCancel={() => setOpen(false)}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `true` | Initial open state (uncontrolled) |
| `title` | `string` | `"Modal title"` | Dialog heading |
| `description` | `string` | `"This is a modal description."` | Dialog body |
| `confirmText` | `string` | `"Confirm"` | Confirm button text |
| `cancelText` | `string` | `"Cancel"` | Cancel button text |
| `onConfirm` | `function` | `() => {}` | Confirm handler |
| `onCancel` | `function` | `() => {}` | Cancel / close handler |

---

### Drawer

A slide-in side panel with overlay. Supports controlled and uncontrolled modes.

```jsx
import { Drawer } from "devora-ui";

<Drawer title="Settings" onClose={() => console.log("closed")}>
  <p>Drawer content here</p>
</Drawer>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `true` | Initial open state (uncontrolled) |
| `title` | `string` | `"Drawer"` | Panel heading |
| `children` | `ReactNode` | `"Drawer content"` | Panel body content |
| `onClose` | `function` | `() => {}` | Close handler |

---

### Tabs

A tabbed interface with dynamic content switching.

```jsx
import { Tabs } from "devora-ui";

<Tabs
  tabs={[
    { label: "Overview", content: "Overview content goes here." },
    { label: "Activity", content: "Recent activity feed." },
    { label: "Settings", content: "Application preferences." },
  ]}
  defaultIndex={0}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `Array<{ label, content }>` | 3 default tabs | Tab definitions |
| `defaultIndex` | `number` | `0` | Initially active tab |

---

### Navbar

A horizontal navigation bar with active link state and CTA button.

```jsx
import { Navbar } from "devora-ui";

<Navbar
  logo="MyApp"
  links={["Home", "Features", "Pricing", "Docs"]}
  ctaText="Sign Up"
  onCtaClick={() => console.log("CTA clicked")}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `string` | `"Devora UI"` | Brand text |
| `links` | `string[]` | `["Home", "Features", "Pricing", "Docs"]` | Nav links |
| `ctaText` | `string` | `"Get Started"` | CTA button text |
| `onLinkClick` | `function` | `() => {}` | Link click handler (receives link name) |
| `onCtaClick` | `function` | `() => {}` | CTA click handler |

---

### Toast

A notification message with tone-based styling.

```jsx
import { Toast } from "devora-ui";

<Toast title="Saved" message="Your changes have been saved." tone="success" />
<Toast title="Error" message="Failed to save." tone="error" />
<Toast title="Info" message="New version available." tone="info" />
<Toast title="Warning" message="Disk space is low." tone="warning" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Success"` | Toast heading |
| `message` | `string` | `"Action completed successfully."` | Toast body |
| `tone` | `"success" \| "error" \| "info" \| "warning"` | `"success"` | Color variant |

---

### Tooltip

A hover-triggered tooltip with placement options.

```jsx
import { Tooltip } from "devora-ui";

<Tooltip label="Hover me" content="This is helpful info" placement="top" />
<Tooltip label="Bottom tip" content="Appears below" placement="bottom" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Hover me"` | Trigger button text |
| `content` | `string` | `"Tooltip content"` | Tooltip message |
| `placement` | `"top" \| "bottom"` | `"top"` | Tooltip position |

---

### Switch

A toggle switch with label. Supports controlled and uncontrolled modes.

```jsx
import { Switch } from "devora-ui";

<Switch label="Enable notifications" />
<Switch label="Dark mode" defaultChecked={true} />
<Switch label="Disabled" disabled={true} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Enable notifications"` | Toggle label |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled) |
| `disabled` | `boolean` | `false` | Disable interactions |
| `onChange` | `function` | `() => {}` | Change handler (receives boolean) |

---

### DataTable

A simple data table with column headers and row data.

```jsx
import { DataTable } from "devora-ui";

<DataTable
  columns={["Name", "Role", "Status"]}
  rows={[
    ["Asha", "Designer", "Active"],
    ["Rahul", "Engineer", "Invited"],
    ["Mira", "PM", "Active"],
  ]}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `string[]` | `["Name", "Role", "Status"]` | Column headers |
| `rows` | `string[][]` | 3 default rows | Row data (2D array) |

---

### Additional Components

The following components follow the same patterns — imported and used the same way:

| Component | Key Props |
|---|---|
| `Textarea` | `label`, `placeholder`, `value`, `helperText`, `error`, `onChange` |
| `Select` | `label`, `options`, `value`, `onChange` |
| `Checkbox` | `label`, `checked`, `defaultChecked`, `disabled`, `onChange` |
| `RadioGroup` | `label`, `options`, `value`, `onChange` |
| `Accordion` | `items` (array of `{ title, content }`) |
| `Sidebar` | `logo`, `links`, `activeLink`, `onLinkClick` |
| `Pagination` | `totalPages`, `currentPage`, `onPageChange` |
| `Badge` | `text`, `variant`, `size` |
| `LoadingCard` | `title`, `message` |
| `FileUploader` | `label`, `accept`, `onFileSelect` |

<br/>

## 🔧 Build Info

| Output | Format | File |
|---|---|---|
| ESM | `import { Button } from "devora-ui"` | `dist/index.mjs` |
| CJS | `const { Button } = require("devora-ui")` | `dist/index.js` |

Built with [tsup](https://tsup.egoist.dev/) — tree-shakeable, zero-runtime bundler.

<br/>

## 🤖 AI-Powered Platform

`devora-ui` is part of **DevoraUI** — a full-stack platform where you can also **generate custom React components with AI**.

🌐 **Try it live:** [devoraui-1.onrender.com](https://devoraui-1.onrender.com)

- Describe any UI in plain English
- Get production-ready React code in seconds
- Preview live in a sandbox before committing
- Save to your personal component library
- Purchase AI credits via Razorpay or bring your own API key

📂 **Full source:** [github.com/prit-zalavadiya-78/DevoraUI](https://github.com/prit-zalavadiya-78/DevoraUI)

<br/>

## 📄 License

ISC © DevoraUI

<br/>

---

<div align="center">

**Built with 🔥 by [Prit Zalavadiya](https://github.com/prit-zalavadiya-78)**

<sub>If devora-ui helps your project, consider giving it a ⭐ on [GitHub](https://github.com/prit-zalavadiya-78/DevoraUI)</sub>

</div>
