# Vue Dynamic Table Builder

![Vue 3 Compatible](https://img.shields.io/badge/Vue%203-Compatible-%23349b43)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)  
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Soon-blue)](https://your-demo-link.com)  
[![npm](https://img.shields.io/npm/v/@jubayer11/vue-dynamic-table-builder)](https://www.npmjs.com/package/@jubayer11/vue-dynamic-table-builder)  
[![Related Package](https://img.shields.io/badge/Also%20Check-Vue%20Dynamic%20Form%20Builder-orange)](https://www.npmjs.com/package/@jubayer11/vue-dynamic-form-builder)

---

A powerful, fully customizable table system for Vue 3 — supports dynamic configs, smart actions, expandable rows, and deep style control.

---

## ✨ Features

- ✅ Dynamic column configuration with `TableConfig`
- 🎨 Deep style overrides via `TableStyleConfig`
- 🎯 Slot-based rendering (headers, cells, actions, expandables)
- 📱 Fully responsive layout with breakpoint control
- 🌑 Dark mode ready
- 🔁 Pagination (numbered + load more)
- 🧠 Built-in support for buttons, icons, routes, and popups
- 🧩 Modular SCSS and icon system
- 🛠️ Works great in admin panels, dashboards, and complex UIs

---

## 💡 Why Use Vue Dynamic Table Builder?

Most table libraries give you props. This one gives you power.

**Vue Dynamic Table Builder** is not just a UI component — it's a configurable system built for real-world apps. Whether you're building an admin dashboard, reporting tool, or a user management system, this package gives you:

- 🔧 **Programmatic control** with `TableConfig` and `TableStyleConfig`
- 🧩 **Full slot flexibility** to override headers, cells, and rows
- 🎛️ **Smart actions** (icon or button) with route or popup behavior
- 🌐 **Responsive layout** with breakpoint-based column control
- 🎨 **Fine-grained style overrides** by row ID, column index, or default fallback
- 🔁 **Pagination options** for both traditional and load-more flows
- 🧠 **Built-in support** for expandable rows, action dialogs, status indicators, and more

Use it if you want **more than a basic table** — use it if you want **control, structure, and scalability.**

---

## 📦 Installation Guide

### 1. Install via NPM

```bash
npm install @jubayer11/vue-dynamic-table-builder
```

✅ No external peer dependencies required.  
✅ Works out of the box with Vue 3.

---

### 2. Import Required CSS

The table system includes prebuilt styles using modular SCSS and utility classes.  
Import the compiled styles into your project (typically in `main.js`, `main.ts`, or `App.vue`):

```js
import '@jubayer11/vue-dynamic-table-builder/dist/style.css';
```

✅ This ensures all table elements, icons, pagination, and states are styled correctly.  
✅ Alternatively, you can import it directly inside any component where the table is used.

---

### 3. Use in Your Component

```js
import DynamicTable from '@jubayer11/vue-dynamic-table-builder';
import { TableConfig, TableStyleConfig, ResponsiveColumnConfig } from '@jubayer11/vue-dynamic-table-builder';
```

Use `<DynamicTable />` in your template and configure it with `TableConfig` and `TableStyleConfig` as needed.

---

### 🔧 Optional: Local Development (Testing Source Code)

If you want to test or contribute to the package locally:

```bash
git clone https://github.com/jubayer11/vue-dynamic-table-builder.git
cd vue-dynamic-table-builder
npm install
npm run dev       # Start local dev server
npm run build     # Build for production
```

---

## ✅ You're Ready!

You’re now ready to build dynamic, flexible, and beautifully styled tables with full control over actions, styles, responsiveness, and slots.

Need help? Check out the [Full Documentation](https://your-docs-link.com) or [Live Demo](https://your-demo-link.com).

---

## ⚡ Minimal Setup Example

```vue
<script setup>
import { computed, reactive } from 'vue';
import DynamicTable from '@jubayer11/vue-dynamic-table-builder';
import {
  TableConfig,
  TableStyleConfig,
  ResponsiveColumnConfig
} from '@jubayer11/vue-dynamic-table-builder';

const config = reactive(new TableConfig());
const styleConfig = new TableStyleConfig();
const dataShow = new ResponsiveColumnConfig(2);

config.updateHeaders(['Name', 'Email']);
config.updateData([
  ['Alice', 'alice@example.com'],
  ['Bob', 'bob@example.com'],
]);
config.updateTotalColumn(2);
config.updateDataShow(dataShow);

const myTable = computed(() => config);
const myTableStyle = computed(() => styleConfig);
</script>

<template>
  <DynamicTable
    :myTable="myTable"
    :customStyle="myTableStyle"
  />
</template>
```

> For full usage examples, advanced configurations, and style overrides, [view the full documentation](https://your-docs-link.com).

---

## 🧪 Demo Gallery

Explore real-world examples of how you can use `@jubayer11/vue-dynamic-table-builder` to create highly interactive, scalable, and fully styled tables.

Each demo is available inside the `demo/` folder.

| Demo | Highlights |
|:---|:---|
| **Basic Table** | Minimal setup with headers and rows |
| **Multiple Action Table** | Dynamic action column with icons like view/edit/delete |
| **Action Button Table** | Action buttons with pop-up and route triggers |
| **Rich Status + Buttons** | Status indicators with success/cancel buttons |
| **Selectable + Per Page Table** | Checkbox row selection + per-page dropdown |
| **Expandable Row Table** | Fully expandable rows with nested data |
| **Pagination Modes Table** | Load more vs. numbered pagination switching |
| **Crazy Style Table** | Deep styling overrides via `TableStyleConfig` |
| **Slot Column Demo** | Full slot control over cell content |
| **All Features Combined** | Real-world admin panel with everything enabled |

🔗 **Live Demo**: [https://your-demo-link.com](https://your-demo-link.com)

---

### 📂 Where to Find Demo Files

| Demo | File Location                                         |
|:---|:------------------------------------------------------|
| **Basic Table** | `src/demo/components/BasicTableDemo.vue`              |
| **Multiple Action Table** | `src/demo/components/MultipleActionTableDemo.vue`     |
| **Action Button Table** | `src/demo/components/ActionButtonTableDemo.vue`       |
| **Rich Status + Buttons** | `src/demo/components/RichStatusActionButtonsDemo.vue` |
| **Selectable + Per Page** | `src/demo/components/SelectablePerPageTableDemo.vue`  |
| **Expandable Row Table** | `src/demo/components/ExpandableRowDemo.vue`           |
| **Pagination Modes** | `src/demo/components/PaginationModesDemo.vue`         |
| **Crazy Style Table** | `src/demo/components/CrazyStyleTableDemo.vue`         |
| **Slot Column Demo** | `src/demo/components/SlotColumnDemo.vue`              |
| **All Features Combined** | `src/demo/components/AllFeaturesCombinedDemo.vue`     |

✅ All demos are real, modular, and built with production workflows in mind.

---

## 📜 License

[MIT License](./LICENSE) © 2025 Jubayer Ahmed  
![Open Source](https://badgen.net/badge/open/source/green)

> 📢 This package is proudly open source under the [MIT License](./LICENSE).  
> Feel free to use, modify, and contribute — together we build better tools.

---

## 🙌 Credits

Designed and developed with ❤️ by **Jubayer Ahmed** ([Portfolio](https://www.jubayerahmed.com/))  
Built for dynamic UIs • Designed for control • Powered by real experience

---

## 🎯 Final Touches

- Vue 3 + Composition API native
- Action column: route, popup, or neither
- Expandable rows with style and slot control
- Per-ID/per-index deep style overrides
- Styled using modular SCSS + utility tokens
- Inspired by production UI needs — not just UI kits

---

## 🔗 Related Projects

Looking for a dynamic form system to pair with this table?

👉 Check out [`@jubayer11/vue-dynamic-form-builder`](https://www.npmjs.com/package/@jubayer11/vue-dynamic-form-builder)  
A schema-based Vue 3 form builder with field config, validation, layout control, and scoped styling.

---

✨ End of README ✨

If you find this project useful, consider starring ⭐ the repository — it helps others discover it too!

🤝 Contributions welcome — submit issues or PRs if you'd like to help improve it!
