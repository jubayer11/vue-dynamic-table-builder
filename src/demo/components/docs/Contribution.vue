<template>
  <section class="doc-wrapper">
    <div class="section-header">
      <h1 class="section-title">🚀 Contribution Guide</h1>
      <p class="section-description">
        Contribute to the Vue Dynamic Table Builder by understanding its internal structure, development workflow, and pull request guidelines. We welcome clean, modular, and well-documented improvements.
      </p>
    </div>

    <div class="doc-subsection" id="folder-structure">
      <h2 class="subsection-title">📁 Folder Structure</h2>
      <p class="subsection-description">
        The project follows a clean separation between core logic, reusable components, and documentation.
      </p>
      <pre><code class="language-shell">.
src/
├── demo/                      # 💡 Demo components (interactive table examples)
├── lib/                       # 🧠 Core library files
│   ├── assets/
│   │   └── table/
│   │       ├── customColor.scss       # SCSS variables and color tokens
│   │       └── vue.svg                # Brand/icon asset
│   │
│   ├── components/           # ⚙️ Table components
│   │   ├── Icon/                      # Icon-based action wrappers
│   │   │   ├── ActionColumn.vue
│   │   │   ├── ButtonAnimation.vue
│   │   │   └── index.vue
│   │   ├── expandable-columns/        # Expandable row layouts (if any)
│   │   ├── index.vue                  # Table entry point
│   │   ├── MultipleColumn.vue
│   │   ├── NormalColumn.vue
│   │   ├── PaginationLoadMore.vue
│   │   ├── PaginationNumber.vue
│   │   ├── PerPageSelector.vue
│   │   ├── SerialCheckboxColumn.vue
│   │   ├── TableBody.vue
│   │   └── TableHeader.vue
│   │
│   ├── composable/           # 🧩 Composables (composition API logic)
│   │   ├── action/
│   │   ├── dynamicIconImport/
│   │   └── global/
│   │
│   ├── config/               # 🧾 Config classes
│   │   ├── TableConfig.js
│   │   └── TableStyleConfig.js
│   │
│   ├── utils/                # 🛠 Utility helpers
│   │   ├── action/
│   │   │   ├── ActionActivityType.js
│   │   │   ├── customizableTable.js
│   │   │   ├── isColumnHelper.js
│   │   │   ├── Pagination.js
│   │   │   ├── ResponsiveColumnConfig.js
│   │   │   ├── SpecificActionClass.js
│   │   ├── styleState.js
│   │   ├── TableResponsiveStyle.js
│   │   └── typeCheck.js
│   │
│   ├── index.js              # Library entry (export everything)
│   └── style.css             # Default base styles

</code></pre>
    </div>

    <div class="doc-subsection" id="dev-guide">
      <h2 class="subsection-title">🛠️ Development Guide</h2>
      <p class="subsection-description">
        To start local development:
      </p>
      <pre><code class="language-bash"># Install dependencies
yarn install

# Start dev server
yarn dev

# Build package
yarn build:lib

# Build GitHub demo
yarn build:docs</code></pre>
      <p class="subsection-description">
        Use <code>vite.config.lib.js</code> for building the table package, and <code>vite.config.docs.js</code> for the demo site.
      </p>
    </div>

    <div class="doc-subsection" id="issue-prs">
      <h2 class="subsection-title">📬 Issues & Pull Requests</h2>
      <p class="subsection-description">
        We follow simple and respectful contribution standards:
      </p>
      <ul>
        <li>Prefix commit messages with <code>[fix]</code>, <code>[feat]</code>, <code>[refactor]</code>, etc.</li>
        <li>Write meaningful titles and descriptions in pull requests.</li>
        <li>Group style-only changes separately from logic changes.</li>
        <li>Document any new props, slots, or exposed methods in the relevant doc file.</li>
        <li>For bugs, create a minimal reproduction inside the demo folder if possible.</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// No script logic needed for contribution documentation.
</script>

<style scoped>
.doc-wrapper {
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  max-width: 900px;
  margin: 3rem auto;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.section-description {
  font-size: 1.05rem;
  color: #4b5563;
  margin-top: 1rem;
  line-height: 1.6;
}

.doc-subsection {
  margin-bottom: 2.5rem;
}
.subsection-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.6rem;
}
.subsection-description {
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
}
pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
code {
  font-family: 'Fira Code', monospace;
  color: #111827;
}

ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

/* 🌙 Dark Mode */
.dark-mode .doc-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
}
.dark-mode .section-description,
.dark-mode .subsection-description {
  color: #94a3b8;
}
.dark-mode .subsection-title {
  color: #f3f4f6;
}
.dark-mode pre {
  background-color: #1f2937;
}
.dark-mode code {
  color: #e5e7eb;
}
</style>
