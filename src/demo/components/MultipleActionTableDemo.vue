<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">🛠️ Table with Multiple Action Columns</h2>
      <p class="demo-description">
        This example demonstrates how to configure multiple action buttons per row — such as <strong>View</strong>, <strong>Edit</strong>, and <strong>Delete</strong> — using the Vue Dynamic Table Builder.
        The system is fully customizable, allowing you to define <strong>any number of icons or actions</strong> per row, making it ideal for dashboards, admin panels, or other interactive data views.
      </p>
      <p class="demo-description">
        The <strong>Status</strong> column is also styled conditionally based on the value in each row, using dynamic class assignment via <code>TableStyleConfig</code>.
      </p>
      <p class="demo-description">
        Actions can be handled in two ways:
      </p>
      <ul class="demo-list">
        <li>
          <strong>Internally</strong> – by passing <code>popUp</code> or <code>route</code> configs to the table’s action icon system
        </li>
        <li>
          <strong>Externally</strong> – by using the <code>onActionClick</code> event like in this demo, where logic is handled outside the table component
        </li>
      </ul>
    </div>

    <!-- Table Placeholder -->
    <div class="table-placeholder">
      <DynamicTable
          :myTable="myTable"
          :customStyle="tableCustomStyle"
          :onActionClick="handleActionClick"
          style="width: 100%"
      />
    </div>
  </div>
</template>

<script setup>
/**
 * 🛠️ Multi Action Table Demo
 *
 * This demo showcases a dynamic table with multiple icon-based action columns (View, Edit, Delete),
 * using the Vue Dynamic Table Builder system. The table also demonstrates dynamic styling of a status
 * column based on row values.
 *
 * @component MultiActionTableDemo
 *
 * @description
 * Key Features:
 * - Multiple action icons (handled externally via `onActionClick`)
 * - Conditional class assignment for status styling
 * - Custom icon styles and hover behavior
 * - Responsive layout with horizontal scroll for smaller screens
 *
 * @dependencies
 * - TableConfig
 * - TableStyleConfig
 * - ResponsiveColumnConfig
 * - ViewActionIcon, EditActionIcon, DestroyActionIcon
 * - popUpOrRoute
 * - IconInlineActivityType
 *
 * @computed {TableConfig} myTable - Reactive instance of table configuration.
 * @computed {TableStyleConfig} tableCustomStyle - Reactive instance of style configuration.
 *
 * @function handleActionClick
 * @param {object} item - The action button instance clicked (includes `value`, `label`, etc.)
 * @param {number|string} id - Row ID for which the action was triggered.
 * @param {number} index - Index of the row in the displayed table.
 * @param {string} type - Type of action (unused here, but passed for interface consistency).
 * @returns {Promise<boolean>} Always resolves `true` to signal completion of the external handler.
 *
 * @style .table-status--[status] - Adds dynamic class for coloring `Status` field (e.g., `--active`, `--pending`).
 * @style .icon-wrapper--[type] - Styles for each action icon (view, edit, delete) with light backgrounds and hover states.
 *
 * @example
 * // Inside your template
 * <DynamicTable
 *   :myTable="myTable"
 *   :customStyle="tableCustomStyle"
 *   :onActionClick="handleActionClick"
 *   class="scrollable-table"
 * />
 */

import { computed, reactive, ref } from 'vue';
import DynamicTable from '@/components/index.vue';
import {
  DestroyActionIcon,
  EditActionIcon,
  ResponsiveColumnConfig,
  TableConfig,
  TableStyleConfig,
  ViewActionIcon
} from '@';
import { popUpOrRoute } from '@/utils/customizableTable.js';
import { IconInlineActivityType } from '@/utils/ActionActivityType.js';

const items = ref([
  { id: 101, name: 'Alice Johnson', role: 'Frontend Developer', email: 'alice@company.com', status: 'Active' },
  { id: 102, name: 'Bob Smith', role: 'UI/UX Designer', email: 'bob@company.com', status: 'Pending' },
  { id: 103, name: 'Carol Lee', role: 'Product Manager', email: 'carol@company.com', status: 'Inactive' },
  { id: 104, name: 'David Kim', role: 'QA Engineer', email: 'david@company.com', status: 'Active' },
  { id: 105, name: 'Eve Garcia', role: 'DevOps Engineer', email: 'eve@company.com', status: 'Suspended' },
  { id: 106, name: 'Frank White', role: 'Backend Developer', email: 'frank@company.com', status: 'Active' }
]);

const headers = ref(['Name', 'Role', 'Email', 'Status', 'Action']);

const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();
const viewIcon = new ViewActionIcon();
const editIcon = new EditActionIcon();
const destroyIcon = new DestroyActionIcon();

const arrayOfTableData = computed(() => {
  return items.value.map((obj) => {
    const statusClass = `table-status table-status--${obj.status.toLowerCase()}`;
    customStyle.updateTdItemIdIndex(obj.id, 3, statusClass);
    customStyle.updateExpandColumnNormalDataIdIndex('dataIdIndex', obj.id, 3, statusClass);

    return [obj.name, obj.role, obj.email, obj.status, obj.id];
  });
});

viewIcon.updatePopUpOrRoute(popUpOrRoute.neither);
editIcon.updatePopUpOrRoute(popUpOrRoute.neither);
destroyIcon.updatePopUpOrRoute(popUpOrRoute.neither);

viewIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--view');
viewIcon.updateStyleClasses('icon', 'icon-svg');
viewIcon.updateStyleClasses('path', ['icon-fill--success','icon-fill--success']);

editIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--edit');
editIcon.updateStyleClasses('icon', 'icon-svg');
editIcon.updateStyleClasses('path', ['icon-fill--warning','icon-fill--warning']);

destroyIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--delete');
destroyIcon.updateStyleClasses('icon', 'icon-svg');
destroyIcon.updateStyleClasses('path', ['icon-fill--error','icon-fill--error']);

const dataShow = new ResponsiveColumnConfig(5);
const actionActivityType = new IconInlineActivityType();

customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updateIdIndex(4);
customTable.updateTotalColumn(5);
customTable.updateDataShow(dataShow);
customTable.updateActionColumnIndexProperty(4, actionActivityType, [viewIcon, editIcon, destroyIcon]);

const myTable = computed(() => customTable);
const tableCustomStyle = computed(() => customStyle);

const handleActionClick = async (item, id, index, type) => {
  const actionMap = {
    1: '🔍 View',
    2: '✏️ Edit',
    3: '🗑️ Delete'
  };
  const actionName = actionMap[item.value] || '❓ Unknown Action';
  alert(`✅ ${actionName} Clicked!\n\n📌 Row Index: ${index}\n🆔 ID: ${id}`);
  return true;
};
</script>

<style scoped>
/* --------------------------------------------------
   Multi-Action Table Demo – Responsive + Dark Mode
-------------------------------------------------- */

.demo-wrapper {
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.03);
  max-width: 1000px;
  margin: 3rem auto;
  transition: all 0.3s ease;
}

.section-heading {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
  animation: fadeInDown 0.5s ease;
}

.demo-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.8rem;
  word-break: break-word;
}

.demo-description {
  font-size: 1.05rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  word-break: break-word;
}

.demo-list {
  list-style-position: inside;
  text-align: left;
  padding-left: 0;
  max-width: 40em;
  margin: 1rem auto 2rem auto;
  font-size: 0.95rem;
  color: #374151;
}

.demo-list li {
  margin-bottom: 0.6rem;
  line-height: 1.6;
}

.demo-list code {
  background-color: #f3f4f6;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: #1f2937;
}

.demo-list strong {
  font-weight: 600;
  color: #111827;
}

.table-placeholder {
  min-height: 150px;
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #64748b;
  padding: 1em;
  overflow-x: auto;
  width: 100%;
  font-size: 1em;
}

/* Dark Mode */
.dark-mode .demo-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.05);
}

.dark-mode .demo-description {
  color: #94a3b8;
}

.dark-mode .table-placeholder {
  background-color: #1f2937;
  border-color: #334155;
  color: #94a3b8;
}

.dark-mode .demo-list {
  color: #d1d5db;
}

.dark-mode .demo-list code {
  background-color: #374151;
  color: #e5e7eb;
}

.dark-mode .demo-list strong {
  color: #f3f4f6;
}

/* ✅ Responsive Breakpoints */
@media (max-width: 400px) {
  .demo-wrapper {
    padding: 1rem 0.5rem;
  }
  .demo-title {
    font-size: 1.1rem;
  }
  .demo-description,
  .demo-list {
    font-size: 0.8rem;
  }
  .table-placeholder {
    font-size: 0.65em;
  }
}

@media (min-width: 401px) and (max-width: 639px) {
  .demo-wrapper {
    padding: 1.25rem 0.75rem;
  }
  .demo-title {
    font-size: 1.25rem;
  }
  .demo-description,
  .demo-list {
    font-size: 0.9rem;
  }
  .table-placeholder {
    font-size: 0.75em;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .demo-wrapper {
    padding: 1.5rem 1rem;
  }
  .demo-title {
    font-size: 1.5rem;
  }
  .demo-description,
  .demo-list {
    font-size: 0.95rem;
  }
  .table-placeholder {
    font-size: 0.85em;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .demo-wrapper {
    padding: 2rem 1.5rem;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .demo-wrapper {
    padding: 2.5rem 2rem;
  }
}

@media (min-width: 1280px) {
  .demo-wrapper {
    padding: 3rem 2rem;
  }
}

/* ✨ Animation */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
