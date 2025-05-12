<template>
  <section class="doc-wrapper">
    <div class="section-header">
      <h1 class="section-title">🎨 Styling & SCSS</h1>
      <p class="section-description">
        Customize every part of the table using default SCSS tokens, utility classes, and the <code>TableStyleConfig</code> class. Dark mode is supported out of the box.
      </p>
    </div>

    <div class="doc-subsection" id="default">
      <h2 class="subsection-title">Default SCSS Tokens</h2>
      <p class="subsection-description">
        The table uses BEM-style class names across every component. You can override them using the <code>TableStyleConfig</code> class. Below is a simplified example:
      </p>
      <pre><code class="language-js">{{ tableStylesSnippet }}</code></pre>
    </div>

    <div class="doc-subsection" id="utility-classes">
      <h2 class="subsection-title">Utility Classes</h2>
      <p class="subsection-description">
        Utility classes help you apply reusable button, status, or icon styles inside custom slots or external templates.
      </p>
      <pre><code class="language-css">{{ utilityClassesSnippet }}</code></pre>
    </div>

    <div class="doc-subsection" id="custom-overrides">
      <h2 class="subsection-title">Overriding with TableStyleConfig</h2>
      <p class="subsection-description">
        Use built-in update methods or dot-path syntax to override any class dynamically. This gives you full styling flexibility across table parts.
      </p>
      <pre><code class="language-js">{{ overrideExample }}</code></pre>
    </div>

    <div class="doc-subsection" id="dark-mode">
      <h2 class="subsection-title">Dark Mode Support</h2>
      <p class="subsection-description">
        To enable dark mode, wrap your layout with a <code>.dark-mode</code> class. All styles adjust accordingly.
      </p>
      <pre><code class="language-css">{{ darkModeExample }}</code></pre>
    </div>
  </section>
</template>

<script setup>
const tableStylesSnippet = `const tableStyles = {
  main: "table__main",
  pagination: { wrapper: "table__pagination__wrapper", ... },
  head: { head: "table__head", headTh: "table__head__th", ... },
  ...
};`;

const utilityClassesSnippet = `.table-status--yes {
  background-color: #e0f7ec;
  color: #065f46;
}

.icon-wrapper--edit {
  background-color: rgba(0, 73, 183, 0.1);
}
.icon-wrapper--edit:hover {
  background-color: rgba(0, 73, 183, 0.2);
}`;

const overrideExample = `// Update global class
config.update("pagination.wrapper", "custom-pagination-wrapper");

// Sort icon override
config.updateHeadThSortIconNormalPath(0, "new-icon-path1");

// By index
config.updateExpandColumnMultipleContainerByIndex(2, "custom-wrapper");

// By ID and index
config.updateExpandColumnNormalDataIdIndex("row-13", 3, "highlight-data");`;

const darkModeExample = `.dark-mode .table-status--yes {
  background-color: #052e16;
  color: #bbf7d0;
}

.dark-mode .icon-wrapper--delete:hover {
  background-color: rgba(239, 68, 68, 0.3);
}`;
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
