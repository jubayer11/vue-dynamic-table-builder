<template>
  <div class="doc-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="doc-title">🧩 Slots in Dynamic Table</h2>
      <p class="doc-description">
        Vue Dynamic Table Builder allows slot-based customization for both standard cells and expanded rows.
        You can target specific column indices using <code>updateSpecificColumnIndexPropertyArray()</code>
        and define custom rendering for each cell using <code>#specific-column</code> or <code>#expandable-specific-column</code>.
      </p>
    </div>

    <!-- Subsection: Normal Column Slots -->
    <section class="doc-section" id="column-slots">
      <h3 class="sub-title">📌 Normal Column Slot Example</h3>
      <p class="sub-description">
        Target normal columns using the <code>#specific-column</code> slot. The example below renders a user avatar with a name.
      </p>
      <pre class="code-block" v-pre>
<code>
&lt;template #specific-column="{ item, colIndex }"&gt;
  &lt;template v-if="colIndex === 0"&gt;
    &lt;div class="user-cell"&gt;
      &lt;img :src="item[1]" alt="avatar" class="user-avatar" /&gt;
      &lt;span class="user-name"&gt;{{ item[0] }}&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/template&gt;
</code>
</pre>

    </section>

    <!-- Subsection: Expandable Row Slots -->
    <section class="doc-section" id="expand-slots">
      <h3 class="sub-title">📂 Expandable Row Slot Example</h3>
      <p class="sub-description">
        When a row expands, you can customize the expanded content with the <code>#expandable-specific-column</code> slot.
      </p>
      <pre class="code-block"><code>&lt;template #expandable-specific-column=&quot;{ item, colIndex }&quot;&gt;
  &lt;template v-if=&quot;colIndex === 5&quot;&gt;
    &lt;p class=&quot;expand-note&quot;&gt;{{ item }}&lt;/p&gt;
  &lt;/template&gt;
&lt;/template&gt;
</code></pre>
    </section>

    <!-- Subsection: Conditional Rendering -->
    <section class="doc-section" id="conditional-render">
      <h3 class="sub-title">🔀 Conditional Rendering</h3>
      <p class="sub-description">
        You can conditionally style or render components based on slot column index or data.
      </p>
      <pre class="code-block"><code>&lt;template #specific-column=&quot;{ item, colIndex }&quot;&gt;
  &lt;template v-if=&quot;colIndex === 3&quot;&gt;
    &lt;span :class=&quot;['status-badge', item.toLowerCase()]&quot;&gt;{{ item }}&lt;/span&gt;
  &lt;/template&gt;
&lt;/template&gt;
</code></pre>
    </section>
  </div>
</template>

<script setup>
// empty for documentation
</script>

<style scoped>
.doc-wrapper {
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  max-width: 1000px;
  margin: 3rem auto;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.03);
}

.section-heading {
  text-align: center;
  margin-bottom: 2rem;
}

.doc-title {
  font-size: 1.9rem;
  font-weight: 800;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.doc-description {
  font-size: 1.05rem;
  color: #4b5563;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
}

.doc-section {
  margin-top: 2.5rem;
}

.sub-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.sub-description {
  font-size: 0.95rem;
  color: #374151;
  margin-bottom: 1rem;
  max-width: 680px;
}

.code-block {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  overflow-x: auto;
  line-height: 1.5;
  color: #111827;
  border: 1px solid #e5e7eb;
}

/* Dark mode */
.dark-mode .doc-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  box-shadow: 0 30px 60px rgba(255, 255, 255, 0.05);
}

.dark-mode .doc-description,
.dark-mode .sub-description {
  color: #cbd5e1;
}

.dark-mode .sub-title {
  color: #f3f4f6;
}

.dark-mode .code-block {
  background-color: #1f2937;
  border-color: #334155;
  color: #e2e8f0;
}
</style>
