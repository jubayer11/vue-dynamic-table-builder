<template>
  <section class="doc-wrapper">
    <div class="section-header">
      <h1 class="section-title">📂 Expandable Rows</h1>
      <p class="section-description">
        You can enable expandable rows to show detailed content per entry, like user profiles, system logs, or nested data. This is useful when each row carries additional information that doesn’t belong in the main columns.
      </p>
    </div>

    <div class="doc-subsection" id="enable">
      <h2 class="subsection-title">How to Enable</h2>
      <p class="subsection-description">
        To activate expandable rows, you must declare the total number of columns using:
      </p>
      <pre><code class="language-js">
const dataShow = new ResponsiveColumnConfig(9);
customTable.updateDataShow(dataShow);
      </code></pre>
      <p class="subsection-description">
        Or use full breakpoint control to change visible columns dynamically:
      </p>
      <pre><code class="language-js">
dataShow.setColumnByBreakPointsArray(breakPointsValue.xxsm, 0);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xsm, 2);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xm, 3);
dataShow.setColumnByBreakPointsArray(breakPointsValue.sm, 4);
dataShow.setColumnByBreakPointsArray(breakPointsValue.md, 6);
dataShow.setColumnByBreakPointsArray(breakPointsValue.lg, 8);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xl, 9);
customTable.updateDataShow(dataShow);
      </code></pre>
    </div>

    <div class="doc-subsection" id="expandable-columns">
      <h2 class="subsection-title">Expandable Column Types</h2>
      <p class="subsection-description">
        When expandable rows are active, users can include column indexes with visual formatting or nesting.
      </p>
      <pre><code class="language-js">
customTable.updateTotalColumn(9);
      </code></pre>
    </div>

    <div class="doc-subsection" id="slots">
      <h2 class="subsection-title">Slots Inside Expanded Rows</h2>
      <p class="subsection-description">
        You can provide custom templates using the <code>#expandable-specific-column</code> slot. This allows you to define how data should appear once the row is expanded.
      </p>
      <pre><code class="language-html">
&lt;template #expandable-specific-column="{ item, colIndex }"&gt;
  &lt;template v-if="colIndex === 5"&gt;
    &lt;p class="expand-notes"&gt;{{ item }}&lt;/p&gt;
  &lt;/template&gt;
&lt;/template&gt;
      </code></pre>
      <p class="subsection-description">
        You must also declare the slot-bound indexes in your config:
      </p>
      <pre><code class="language-js">
customTable.updateSpecificColumnIndexPropertyArray([0, 3, 4, 5, 6, 7]);
      </code></pre>
    </div>

    <div class="doc-subsection" id="styling">
      <h2 class="subsection-title">Styling Expanded Rows</h2>
      <p class="subsection-description">
        You can apply style overrides to the expanded content just like normal cells, using:
      </p>
      <pre><code class="language-js">
customStyle.updateExpandColumnNormalDataIdIndex('dataIdIndex', obj.id, colIndex, 'custom-class');
      </code></pre>
    </div>
  </section>
</template>

<script setup>
// intentionally empty
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
