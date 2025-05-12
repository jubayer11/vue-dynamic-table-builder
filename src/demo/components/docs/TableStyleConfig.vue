<template>
  <section class="doc-section">
    <!-- Overview -->
    <div id="overview" class="doc-block">
      <h2>What is TableStyleConfig?</h2>
      <p>
        <code>TableStyleConfig</code> is a powerful styling system that allows you to override and customize every part of the table — from header rows to pagination, action buttons, expandable sections, and more. All styles are defined via class names, and the structure mirrors your table layout.
      </p>
      <p>
        This makes the system scalable, themable, and ideal for building design-synchronized dashboards or admin UIs.
      </p>
    </div>

    <!-- Default Style Structure -->
    <div id="default-style" class="doc-block">
      <h2>Default Style Structure</h2>
      <p>
        When you create a new <code>TableStyleConfig()</code>, all styling keys are initialized with empty strings. You can override them by referencing the internal structure which mirrors your table layout.
      </p>
      <pre><code class="language-js">
const style = new TableStyleConfig()
style.update('main', 'my-table__wrapper')
style.update('pagination.wrapper', 'my-pagination__wrapper')
style.update('expandColumn.td.normal.wrapper', 'my-expand__td__wrapper')
      </code></pre>
    </div>

    <!-- Index-Based Styling -->
    <div id="per-index" class="doc-block">
      <h2>Index-Based Styling</h2>
      <p>
        You can apply specific classes to table columns based on their <strong>column index</strong>. This is useful for styling unique columns like serial numbers or profile pictures.
      </p>
      <pre><code class="language-js">
const style = new TableStyleConfig()
style.updateHeadThIndex(0, 'highlighted-th')
style.updateBodyTdIndex(0, 'highlighted-td')
style.updateTdWrapperIndex(0, 'custom-wrapper')
      </code></pre>
    </div>

    <!-- ID-Based Styling -->
    <div id="per-id" class="doc-block">
      <h2>ID-Based Styling</h2>
      <p>
        Style specific cells using both <code>row ID</code> and <code>column index</code>. Great for alerting or customizing a single record.
      </p>
      <pre><code class="language-js">
const style = new TableStyleConfig()
style.updateBodyTdIdIndex(3, 2, 'danger-cell')
style.updateTdItemIdIndex(3, 2, 'bold-text')
style.updateExpandColumnNormalDataIdIndex('data', 3, 2, 'highlight-expanded')
      </code></pre>
    </div>

    <!-- Using update() Methods -->
    <div id="update-methods" class="doc-block">
      <h2>Using <code>update()</code> Methods</h2>
      <p>
        All styling properties can be updated using dot-path syntax. This is ideal for config objects or computed values.
      </p>
      <pre><code class="language-js">
const style = new TableStyleConfig()
style.update('pagination.itemLink', 'custom-pagination-link')
style.update('pagination.loadMore.button', 'custom-load-more-button')
style.update('expandColumn.icon.plus.wrapper', 'plus-icon-wrapper')
style.update('expandColumn.icon.minus.path.0', 'icon-path-style')
      </code></pre>
      <p>
        These methods will throw errors if the path is invalid, helping prevent typos in deeply nested structures.
      </p>
    </div>
  </section>
</template>

<script setup>
/**
 * @component TableStyleConfig
 * Documentation for styling customization using TableStyleConfig.
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

.doc-block pre {
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.doc-block code {
  font-family: 'Fira Code', monospace;
  color: #2563eb;
}

/* 🌙 Dark mode support */
.dark-mode .doc-block h2 {
  color: #f3f4f6;
}
.dark-mode .doc-block p,
.dark-mode .doc-block li {
  color: #d1d5db;
}
.dark-mode pre {
  background-color: #1e293b;
  color: #e0f2fe;
}
.dark-mode code {
  color: #93c5fd;
}
</style>
