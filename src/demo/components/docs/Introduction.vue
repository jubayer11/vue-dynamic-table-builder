<template>
  <section class="doc-section">
    <!-- What is this package -->
    <div id="what" class="doc-block">
      <h2>What is this package?</h2>
      <p>
        <strong>Vue Dynamic Table Builder</strong> is a powerful Vue 3 component system designed to help developers build highly customizable, slot-driven, responsive tables with real-world features like pagination, action columns, expandable rows, and deep SCSS control.
      </p>
      <p>
        It's not just another data table. This builder gives you:
      </p>
      <ul>
        <li>🧩 Full control via <code>TableConfig</code> and <code>TableStyleConfig</code></li>
        <li>🎛️ Smart slot-based column rendering</li>
        <li>🎯 Expandable rows with slots, styling, and logic hooks</li>
        <li>🔁 Paginate with "Load more" or "Numbered" options</li>
      </ul>

    </div>

    <!-- Features & use cases -->
    <div id="features" class="doc-block">
      <h2>Features & Use Cases</h2>
      <ul>
        <li>✅ Dynamic column headers, serial columns, and checkbox selectors</li>
        <li>✅ Fully responsive layout with breakpoints and column hiding</li>
        <li>✅ Icon-based or button-based action systems with route/popup support</li>
        <li>✅ Deep theming using SCSS variables and per-row/per-cell overrides</li>
        <li>✅ Designed for dashboards, CMSs, and admin panels</li>
      </ul>
    </div>

    <!-- Live demo & GitHub -->
    <div id="demo" class="doc-block">
      <h2>Live Demo & GitHub</h2>
      <p>
        Explore the full feature set in our live demo site and check out the source code:
      </p>
      <ul>
        <li>
          🔗 <a href="https://jubayer11.github.io/vue-dynamic-table-builder/" target="_blank" rel="noopener">Live Demo ↗</a>
        </li>
        <li>
          💻 <a href="https://github.com/jubayer11/vue-dynamic-table-builder" target="_blank" rel="noopener">GitHub Repository ↗</a>
        </li>
        <li>
          📦 <a href="https://www.npmjs.com/package/@jubayer11/vue-dynamic-table-builder" target="_blank" rel="noopener">npm Package ↗</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
/**
 * @component Introduction
 * Overview of the Vue Dynamic Table Builder: purpose, features, and links.
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
.dark-mode .doc-block h2 {
  color: #f3f4f6;
}
.dark-mode .doc-block p,
.dark-mode .doc-block li {
  color: #d1d5db;
}
.dark-mode a {
  color: #93c5fd;
}
</style>
