<template>
  <section class="doc-section">
    <!-- Overview -->
    <div id="overview" class="doc-block">
      <h2>Overview</h2>
      <p>
        <code>TableConfig</code> is the core configuration class that defines the entire structure of your dynamic
        table.
        You use it to control headers, row data, column logic, responsive behavior, and special column types.
      </p>
      <p>
        Instantiate once and bind reactively to <code>:myTable</code> in your table:
      </p>
      <pre><code class="language-js">
import { reactive } from 'vue'
import { TableConfig } from '@jubayer11/vue-dynamic-table-builder'

const config = reactive(new TableConfig())
      </code></pre>
    </div>

    <!-- Headers & Data -->
    <div id="headers" class="doc-block">
      <h2>Headers & Data</h2>
      <p>Define table columns and row values using:</p>
      <ul>
        <li><code>updateHeaders(array)</code> — Sets column headers</li>
        <li><code>updateData(array[][])</code> — Sets row data as a 2D array</li>
      </ul>
      <pre><code class="language-js">
config.updateHeaders(['Name', 'Email'])
config.updateData([
  ['Alice', 'alice@example.com'],
  ['Bob', 'bob@example.com']
])
      </code></pre>
    </div>

    <!-- Total Columns -->
    <div id="total-columns" class="doc-block">
      <h2>Total Columns</h2>
      <p>
        Use <code>updateTotalColumn(number)</code> to define how many base data columns your table contains.
        This is required to correctly align serial columns, checkboxes, actions, or expandable content.
      </p>
      <pre><code class="language-js">config.updateTotalColumn(2)</code></pre>
    </div>
    <!-- Column Types & Index Management -->
    <div id="column-types" class="doc-block">
      <h2>Column Types & Index Management</h2>

      <p>
        Vue Dynamic Table Builder uses explicit configuration to determine the role of each column — whether it should display grouped content, render with a slot, trigger an action, or be reserved for selection or serial numbering.
        These roles are declared via methods on your <code>TableConfig</code> instance.
      </p>

      <h3>🔁 Grouped Columns</h3>
      <p>
        Use <code>updateMultipleColumns()</code> to define which indexes contain multiple values (e.g., name + avatar).
        These values should be stored as arrays in your data.
      </p>

      <pre><code class="language-js">
// Example: Combine 'email' and 'phone' at index 1
customTable.updateMultipleColumns([1])

// In data:
[
  ['John Doe', ['john@example.com', '555-1234'], ...],
  ...
]
  </code></pre>

      <h3>🎛️ Slot-Based Columns</h3>
      <p>
        If a column will use a custom Vue slot (normal or expandable view), declare its index using <code>updateSpecificColumnIndexPropertyArray()</code>.
      </p>

      <pre><code class="language-js">
// Tells the table these columns will be rendered with slots
customTable.updateSpecificColumnIndexPropertyArray([0, 3, 4])
  </code></pre>

      <p>
        This is required so the system can bind props like <code>item</code>, <code>index</code>, and <code>row</code> properly to each slot.
      </p>





    </div>


    <!-- ResponsiveColumnConfig -->
    <div id="responsive-columns" class="doc-block">
      <h2>ResponsiveColumnConfig</h2>
      <p>
        This allows you to control how many columns are shown at different breakpoints using a helper config.
      </p>
      <pre><code class="language-js">
import { ResponsiveColumnConfig } from '@jubayer11/vue-dynamic-table-builder'

const dataShow = new ResponsiveColumnConfig(2)
config.updateDataShow(dataShow)
      </code></pre>
    </div>

    <!-- Serial & Checkbox Columns -->
    <div id="serial-checkbox" class="doc-block">
      <h2>Serial & Checkbox Columns</h2>
      <p>
        Enable automatic row numbering and checkbox selection:
      </p>
      <pre><code class="language-js">
config.updateIsSerialNoShow(true)
config.updateSelectShow(true)
      </code></pre>
      <p>You can use either, both, or neither depending on your needs.</p>
    </div>

    <!-- Action Config -->
    <div id="actions" class="doc-block">
      <h2>Action Config (Icons & Buttons)</h2>

      <p>
        Action columns are added via <code>updateActionColumnIndexProperty()</code>.
        You can use either <strong>button-based</strong> or <strong>icon-based</strong> actions using class definitions.
        The action behavior is controlled by an activity type, such as <code>ButtonActionActivityType</code> or <code>IconInlineActivityType</code>.
      </p>

      <h3>🔘 Buttons as Actions</h3>
      <p>
        To add a set of custom-styled action buttons:
      </p>
      <pre><code class="language-js">
import { SuccessNormalButton, CancelOutlineButton } from '@/utils/action/actionButtonClass.js'
import { ButtonActionActivityType } from '@/utils/ActionActivityType.js'

const sendBtn = new SuccessNormalButton(1, 'Confirm')
const archiveBtn = new CancelOutlineButton(2, 'Absent')

const activityType = new ButtonActionActivityType()

customTable.updateActionColumnIndexProperty(3, activityType, [sendBtn, archiveBtn])
  </code></pre>

      <p>
        Button objects extend <code>ActionTypeButton</code> and support fully customizable styles and behaviors:
      </p>
      <pre><code class="language-js">
export class ActionTypeButton {
  constructor({ value, content, styleClasses, popUpOrRoute = {} }) {
    this.value = value
    this.content = content
    this.styleClasses = styleClasses
    this.popUpOrRoute = popUpOrRoute
  }

  updateStyleClasses(value) { ... }
  updatePopUpOrRoute(isPopUpOrRoute, module = null) { ... }
}
  </code></pre>

      <h3>🧩 Icon-Based Actions</h3>
      <p>
        To use action icons like view, edit, delete:
      </p>
      <pre><code class="language-js">
import { ViewActionIcon, EditActionIcon, DestroyActionIcon } from '@/utils/action/actionIconClass.js'
import { IconInlineActivityType } from '@/utils/ActionActivityType.js'

const viewIcon = new ViewActionIcon()
const editIcon = new EditActionIcon()
const destroyIcon = new DestroyActionIcon()

const iconActivity = new IconInlineActivityType()

customTable.updateActionColumnIndexProperty(4, iconActivity, [viewIcon, editIcon, destroyIcon])
  </code></pre>

      <p>
        📌 The first argument in <code>customTable.updateActionColumnIndexProperty(index, ...)</code> defines the
        <strong>column index</strong> where the icon or button group will appear in the table.
        You can place action columns anywhere by controlling this index relative to your headers.
      </p>

      <p>
        Icons are modular and support inline display, route/popup logic, and tooltips.
      </p>

      <p>
        🔧 You don't need to create new classes to customize actions.
        All buttons or icons are fully configurable at runtime by calling methods like
        <code>updateStyleClasses()</code>, <code>updatePopUpOrRoute()</code>, or
        <code>updatePopUpOrRouteByProperty()</code> on any existing button/icon object.
      </p>
      <p>
        This makes action rendering dynamic, flexible, and UI-driven — suitable for both route-based and popup-driven flows.
      </p>

    </div>


    <!-- Expandable Rows -->
    <!-- Expandable Rows -->
    <div id="expansion" class="doc-block">
      <h2>Expandable Rows</h2>

      <p>
        Expandable rows are automatically enabled when your table uses
        <code>ResponsiveColumnConfig</code> and the visible column limit is exceeded at any screen size.
        Hidden columns are automatically collapsed into an expandable section — toggled using a built-in <code>+</code> / <code>-</code> icon.
      </p>

      <pre><code class="language-js">
import { ResponsiveColumnConfig } from '@jubayer11/vue-dynamic-table-builder'
import { breakPointsValue } from '@jubayer11/vue-dynamic-table-builder'

const dataShow = new ResponsiveColumnConfig(9) // total columns

// Breakpoint-based visible column limits
dataShow.setColumnByBreakPointsArray(breakPointsValue.sm, 4)
dataShow.setColumnByBreakPointsArray(breakPointsValue.md, 6)
dataShow.setColumnByBreakPointsArray(breakPointsValue.lg, 8)

customTable.updateDataShow(dataShow)
  </code></pre>

      <p>
        In this example, on small screens (sm), only 4 columns will be visible. The remaining columns will automatically
        move into an expandable section per row. You don’t need to enable or position the expander icon manually — the system handles it.
      </p>

      <h3>🧩 Customize Expanded Content</h3>

      <p>
        Use the <code>expanded-row</code> slot to fully control what’s displayed inside each row’s expanded section:
      </p>

      <pre v-pre><code class="language-html">
&lt;template #expanded-row="{ row }"&gt;
  &lt;div&gt;
    Phone: {{ row.phone }} &lt;br&gt;
    Notes: {{ row.notes }}
  &lt;/div&gt;
&lt;/template&gt;
  </code></pre>

      <h3>🎯 Per-Column Control with Matching Slot</h3>

      <p>
        For more precise styling or custom layouts, use the <code>expandable-specific-column</code> slot.
        This lets you match and override each hidden column individually.
      </p>

      <pre v-pre><code class="language-html">
&lt;template #expandable-specific-column="{ item, colIndex }"&gt;
  &lt;template v-if="colIndex === 0"&gt;
    &lt;div class="user-cell"&gt;
      &lt;img :src="item[1]" alt="avatar" class="user-avatar" /&gt;
      &lt;span class="user-name"&gt;{{ item[0] }}&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/template&gt;
  </code></pre>

      <p>
        - <code>item</code> is the current row’s full data array.
        - <code>colIndex</code> is the index of the hidden column now being rendered inside the expanded section.
      </p>

      <p>
        You can style, merge, or replace any hidden column’s cell with this slot — giving you full visual and structural control inside expandable rows.
      </p>
    </div>


  </section>
</template>

<script setup>
/**
 * @component TableConfig
 * Deep dive into how to configure the table using TableConfig class.
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
