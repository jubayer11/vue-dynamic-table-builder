<template>
  <div class="doc-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="doc-title">📱 Responsive Layout System</h2>
      <p class="doc-description">
        The Vue Dynamic Table Builder supports fully responsive layouts through <code>ResponsiveColumnConfig</code> and breakpoint configuration. You can define column visibility for different screen sizes and dynamically skip columns even within visible ranges.
      </p>
    </div>

    <!-- Breakpoint Classes -->
    <section class="doc-section">
      <h3 id="breakpoints">📏 Breakpoint Classes</h3>
      <p>
        Column breakpoints are simulated using internal class-based configuration. You can manually define how many columns to show per screen size using:
      </p>
      <pre class="code-block"><code>dataShow.setColumnByBreakPointsArray(breakPointsValue.xsm, 2);
dataShow.setColumnByBreakPointsArray(breakPointsValue.md, 6);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xl, 9);
customTable.updateDataShow(dataShow);</code></pre>
    </section>

    <!-- Hiding Columns -->
    <section class="doc-section">
      <h3 id="hiding-columns">🙈 Hiding Columns per Width</h3>
      <p>
        When the viewport width changes, only the specified number of columns will be shown. You can simulate this using column control buttons in demos or configure it manually.
      </p>
      <pre class="code-block"><code>// Example: Auto mode setup
dataShow.setColumnByBreakPointsArray(breakPointsValue.xsm, 2);
dataShow.setColumnByBreakPointsArray(breakPointsValue.md, 6);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xl, 9);</code></pre>
    </section>

    <!-- ResponsiveColumnConfig -->
    <section class="doc-section">
      <h3 id="responsive-config">⚙️ Using ResponsiveColumnConfig</h3>
      <p>
        Responsive layout works through the <code>ResponsiveColumnConfig</code> class, which can be passed to <code>customTable.updateDataShow()</code> to control layout behavior dynamically.
      </p>
      <pre class="code-block"><code>const dataShow = new ResponsiveColumnConfig();
dataShow.setColumnByBreakPointsArray(breakPointsValue.sm, 4);
customTable.updateDataShow(dataShow);</code></pre>
    </section>

    <!-- Skip Column Feature -->
    <section class="doc-section">
      <h3 id="skip-columns">⛔ Skip Columns from Rendering</h3>
      <p>
        You can skip specific columns entirely — regardless of responsive settings — by marking them with <code>updateSkipColumnIndexPropertyArray</code>:
      </p>
      <pre class="code-block"><code>// This will skip columns at index 2 and 5
customTable.updateSkipColumnIndexPropertyArray([2, 5]);</code></pre>
      <p>
        Useful when you want to hide sensitive or irrelevant data fields across all layouts.
      </p>
    </section>
  </div>
</template>

<script setup>
// Script intentionally left empty for documentation view
</script>

<style scoped>
.doc-wrapper {
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  padding: 2.5rem 2rem;
  max-width: 1000px;
  margin: 2rem auto;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}
.section-heading {
  text-align: center;
  margin-bottom: 2.5rem;
}
.doc-title {
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(to right, #0ea5e9, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.doc-description {
  font-size: 1rem;
  color: #4b5563;
  margin: 0 auto;
  max-width: 720px;
  line-height: 1.6;
}
.doc-section {
  margin-bottom: 2.5rem;
}
.doc-section h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1f2937;
}
.doc-section p {
  font-size: 0.95rem;
  color: #374151;
  margin-bottom: 1rem;
}
.code-block {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  color: #1f2937;
}
.dark-mode .doc-wrapper {
  background: linear-gradient(to bottom, #1f2937, #111827);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05);
}
.dark-mode .doc-description,
.dark-mode .doc-section p {
  color: #d1d5db;
}
.dark-mode .doc-section h3 {
  color: #f9fafb;
}
.dark-mode .code-block {
  background-color: #334155;
  color: #e2e8f0;
}
</style>
