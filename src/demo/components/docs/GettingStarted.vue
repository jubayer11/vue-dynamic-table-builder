<template>
  <section class="doc-section">
    <!-- 1. Installation -->
    <div id="install" class="doc-block">
      <h2>Installation</h2>
      <p>
        Install the package via <code>npm</code>:
      </p>
      <pre><code class="language-bash">npm install @jubayer11/vue-dynamic-table-builder</code></pre>
      <p>✅ No external peer dependencies required. Just Vue 3.</p>
    </div>

    <!-- 2. Minimal Setup -->
    <div id="minimal" class="doc-block">
      <h2>Minimal Setup</h2>
      <p>Here’s the simplest example to get started with <strong>DynamicTable</strong>:</p>
      <pre><code class="language-js">
import { computed, reactive } from 'vue'
import DynamicTable from '@jubayer11/vue-dynamic-table-builder'
import { TableConfig, TableStyleConfig, ResponsiveColumnConfig } from '@jubayer11/vue-dynamic-table-builder'

const config = reactive(new TableConfig())
const styleConfig = new TableStyleConfig()
const dataShow = new ResponsiveColumnConfig(2)

config.updateHeaders(['Name', 'Email'])
config.updateData([
  ['Alice', 'alice@example.com'],
  ['Bob', 'bob@example.com'],
]);
config.updateTotalColumn(2)
config.updateDataShow(dataShow)

const myTable = computed(() => config)
const myTableStyle = computed(() => styleConfig)
      </code></pre>
      <p>Then simply bind the config to your component:</p>
      <pre><code class="language-html">
&lt;DynamicTable
  :myTable="myTable"
  :customStyle="myTableStyle"
/&gt;
      </code></pre>
    </div>

    <!-- 3. CSS Import -->
    <div id="css" class="doc-block">
      <h2>CSS Import</h2>
      <p>Make sure to import the compiled styles in your main entry file:</p>
      <pre><code class="language-js">import '@jubayer11/vue-dynamic-table-builder/dist/style.css'</code></pre>
      <p>No SCSS setup or manual style configuration needed — everything is bundled.</p>
    </div>

    <!-- 4. Local Dev Setup -->
    <div id="dev-setup" class="doc-block">
      <h2>Local Dev Setup</h2>
      <p>If you're contributing or testing locally:</p>
      <pre><code class="language-bash">
git clone https://github.com/jubayer11/vue-dynamic-table-builder.git
cd vue-dynamic-table-builder
npm install
npm run dev
      </code></pre>
      <p>Use <code>vite.config.docs.js</code> to launch the documentation site locally.</p>
    </div>
  </section>
</template>

<script setup>
/**
 * @component GettingStarted
 * Installation, setup, and CSS usage guide for Vue Dynamic Table Builder.
 */
</script>

<style scoped>
.doc-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.doc-block {
  scroll-margin-top: 6rem;
  background: #ffffff;
  padding: 1.75rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
}

.doc-block h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.doc-block p {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}

pre {
  background: #f3f4f6;
  color: #111827;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

code {
  font-family: 'Fira Code', monospace;
}

.doc-block ul {
  padding-left: 1.5rem;
  list-style-type: disc;
  margin-top: 0.5rem;
}

.doc-block li {
  margin: 0.3rem 0;
  color: #374151;
  font-size: 0.97rem;
}

/* Links */
a {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

/* 🌙 Dark mode support */
.dark-mode .doc-block {
  background: #1e293b;
  border-color: #334155;
}

.dark-mode .doc-block h2 {
  color: #f3f4f6;
}
.dark-mode .doc-block p,
.dark-mode .doc-block li {
  color: #d1d5db;
}
.dark-mode pre {
  background: #0f172a;
  color: #f1f5f9;
}
.dark-mode a {
  color: #93c5fd;
}
</style>
