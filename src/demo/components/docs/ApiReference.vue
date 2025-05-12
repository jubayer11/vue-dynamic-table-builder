<template>
  <section class="doc-wrapper">
    <div class="section-header">
      <h1 class="section-title">📘 API Reference</h1>
      <p class="section-description">
        This section outlines the full API surface for Vue Dynamic Table Builder. It includes configuration, styling, actions, and icon behavior.
      </p>
    </div>

    <!-- 🧩 TableConfig Methods -->
    <div class="doc-subsection" id="table-config">
      <h2 class="subsection-title">TableConfig API</h2>
      <p class="subsection-description">
        Control structural features like total columns, breakpoints, skipped columns, action columns, and slots.
      </p>
      <pre><code class="language-js">
// Set the total number of columns
config.updateTotalColumn(9);

// Declare which columns are visible per screen size
const dataShow = new ResponsiveColumnConfig(9);
dataShow.setColumnByBreakPointsArray(breakPointsValue.md, 5);
config.updateDataShow(dataShow);

// Allow slots on these indexes (normal + expanded)
config.updateSpecificColumnIndexPropertyArray([0, 3, 4, 5]);

// Skip certain columns from layout
config.updateSkipColumnIndexPropertyArray([2, 7]);

// Assign action icons or buttons to a column
config.updateActionColumnIndexProperty(6, iconType, [viewIcon, editIcon]);
      </code></pre>
    </div>

    <!-- 🎨 TableStyleConfig Overview -->
    <div class="doc-subsection" id="style-config">
      <h2 class="subsection-title">TableStyleConfig API</h2>
      <p class="subsection-description">
        Customize every section of the table layout, including per-index and per-id overrides. You can use the update() method or targeted setters.
      </p>
      <pre><code class="language-js">
// Global class override via dot path
styleConfig.update('pagination.wrapper', 'my-custom-wrapper');

// Per-index styling
styleConfig.updateExpandColumnTdIndexData(2, 'highlighted-data');

// Per-id and index targeting
styleConfig.updateExpandColumnNormalDataIdIndex('row-13', 4, 'emphasized');

// Specific style block update
styleConfig.updateHeadThSortIconNormalPath(0, 'icon-sort-desc');
      </code></pre>
    </div>

    <!-- 🧠 ActionType & Smart Logic -->
    <div class="doc-subsection" id="action-types">
      <h2 class="subsection-title">Action Type Classes</h2>
      <p class="subsection-description">
        Action icons and buttons inherit from a shared base class. You can use routes, popups, and smart logic.
      </p>
      <pre><code class="language-js">
// Define icon buttons
const viewIcon = new ActionTypeIcon('view', 'View');
viewIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'viewDialog');

// Define smart action logic
const action = obj.status === 'pending' ? new SpecificAction(0) : new SpecificAction(1);

// Bind action set to a column
config.updateActionColumnIndexProperty(3, iconType, [viewIcon, editIcon]);

// Grouping behavior
const activityType = new IconInlineActivityType();
      </code></pre>
    </div>

    <!-- 🧩 Icon Styling -->
    <div class="doc-subsection" id="icon-system">
      <h2 class="subsection-title">Icon Registry & Styling</h2>
      <p class="subsection-description">
        Each icon uses wrapper, icon, and path classes for full control over shape and color.
      </p>
      <pre><code class="language-js">
editIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--edit');
editIcon.updateStyleClasses('icon', 'icon-svg');
editIcon.updateStyleClasses('path', ['icon-fill--warning']);

// Dark mode support is handled via SCSS utility classes like:
// .dark-mode .icon-fill--warning { fill: #facc15; }
      </code></pre>
    </div>
  </section>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
.doc-wrapper {
  background: linear-gradient(to right, #f9fafb, #ffffff);
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

/* Dark Mode */
.dark-mode .doc-wrapper {
  background: linear-gradient(to right, #1f2937, #111827);
}
.dark-mode .section-description,
.dark-mode .subsection-description {
  color: #9ca3af;
}
.dark-mode .subsection-title {
  color: #f3f4f6;
}
.dark-mode pre {
  background-color: #1e1e1e;
}
.dark-mode code {
  color: #e5e7eb;
}
</style>
