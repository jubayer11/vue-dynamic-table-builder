
<template>
  <div class="demo-wrapper">

    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">📊 Selectable Rows with Sorting, Pagination & Serial Numbers</h2>
      <p class="demo-description">
        This demo showcases <strong>selectable rows with checkboxes</strong>, <strong>serial numbers</strong>,
        <strong>customizable per-page options</strong>, and <strong>sortable headers</strong> — making it ideal
        for data grids that require bulk actions, quick scanning, and fine control over row display.
      </p>
    </div>


    <!-- Table Placeholder -->
    <div class="table-placeholder">
      <DynamicTable
          :myTable="myTable"
          :customStyle="tableCustomStyle"
          :onSelectorChange="handleSelectorChange"
          :onSelectItemChange="handleSelectItemChange"
          :onPaginate="handlePagination"
          :onSortingChange="handleSortingChange"
          style="width: 100%"
      />
    </div>

    <!-- Action Button -->
    <div class="action-buttons">
      <button class="btn-show-selected" @click="showSelected = true" :disabled="selectedItems.length === 0">
        📋 Show Selected Items
      </button>
    </div>

    <!-- Dialog to Show Selected Items -->
    <dialog v-if="showSelected" class="selected-dialog" open>
      <h3>✅ Selected Items</h3>
      <ul>
        <li v-for="(item, index) in selectedItems" :key="index">
          <strong>#{{ index + 1 }}</strong> - {{ item.name }} ({{ item.department }}, Score: {{ item.score }})
        </li>
      </ul>
      <div class="dialog-actions">
        <button class="btn-close" @click="showSelected = false">Close</button>
      </div>
    </dialog>

    <!-- Description -->
    <p class="demo-footer-description">
      This component illustrates modern UX patterns: dynamic sorting, paginated navigation, row selection,
      and a reactive dialog preview — all bundled in a clean and extensible table experience.
    </p>


  </div>
</template>

<script setup>

/**
 * @component SelectablePerPageTableDemo
 *
 * A feature-rich data table demo using the Vue Dynamic Table Builder.
 * Demonstrates selectable rows with checkboxes, serial numbers, pagination,
 * custom per-page item selection, sortable headers, and a reactive preview dialog.
 *
 * Features:
 * - Paginated data with mock entries.
 * - Dynamically sortable columns: name, department, score.
 * - Checkbox-based selection with computed `selectedItems`.
 * - Serial number support.
 * - Adjustable per-page values with live re-rendering.
 * - Preview dialog showing currently selected rows.
 * - Full dark mode compatibility.
 *
 * Behavior:
 * - Pagination and per-page changes slice the data array (`allItems`) in real-time.
 * - `handleSortingChange()` handles asc/desc logic based on column index.
 * - `handleSelectItemChange()` triggers internal checkbox state updates.
 * - Exposes `removeAllSelected()` via `defineExpose()` for parent control.
 *
 * Style Strategy:
 * - Responsive, styled layout using linear gradients and clean table visuals.
 * - `.table-placeholder` uses `em`-based scaling to control internal table sizing.
 * - Tailwind-style theming for buttons, dialog, and footer description.
 *
 * Dependencies:
 * - DynamicTable component (internal em-based responsiveness)
 * - TableConfig, TableStyleConfig, ResponsiveColumnConfig
 */


import {computed, reactive, ref, watch} from 'vue'
import {ResponsiveColumnConfig, TableConfig, TableStyleConfig} from "@";
import DynamicTable from '@/components/index.vue';

let showSelected = ref(false);

const selectedItems = computed(() => {
  return customTable.selectedItem.ids.map((id) => {
    return items.value.find((item) => item.id === id);
  }).filter(Boolean);
});



const allItems = [
  { id: 1, name: 'Alice', department: 'Engineering', score: 98 },
  { id: 2, name: 'Bob', department: 'Design', score: 84 },
  { id: 3, name: 'Carol', department: 'Marketing', score: 91 },
  { id: 4, name: 'David', department: 'Support', score: 75 },
  { id: 5, name: 'Eve', department: 'DevOps', score: 88 },
  { id: 6, name: 'Frank', department: 'QA', score: 90 },
  { id: 7, name: 'Grace', department: 'Sales', score: 79 },
  { id: 8, name: 'Hank', department: 'Finance', score: 95 },
  { id: 9, name: 'Ivy', department: 'Legal', score: 82 },
  { id: 10, name: 'Jake', department: 'IT', score: 87 },
  { id: 11, name: 'Kara', department: 'Engineering', score: 93 },
  { id: 12, name: 'Leo', department: 'Design', score: 76 },
  { id: 13, name: 'Mia', department: 'Marketing', score: 89 },
  { id: 14, name: 'Noah', department: 'Support', score: 80 },
  { id: 15, name: 'Olivia', department: 'DevOps', score: 92 },
  { id: 16, name: 'Paul', department: 'QA', score: 85 },
  { id: 17, name: 'Quinn', department: 'Sales', score: 77 },
  { id: 18, name: 'Rita', department: 'Finance', score: 94 },
  { id: 19, name: 'Sam', department: 'Legal', score: 83 },
  { id: 20, name: 'Tina', department: 'IT', score: 86 }
];

const items = ref([]); // What’s actually rendered
const perPage = ref(5); // Default
const page=ref(1);

const pagination = computed(() => {
  const lastPage = Math.ceil(allItems.length / perPage.value);
  const startIndex = (page.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, allItems.length);

  return {
    links: {
      first: `?page=1`,
      last: `?page=${lastPage}`,
      prev: page.value > 1 ? `?page=${page.value - 1}` : null,
      next: page.value < lastPage ? `?page=${page.value + 1}` : null
    },
    meta: {
      current_page: page.value,
      from: startIndex + 1,
      to: endIndex,
      last_page: lastPage,
      path: '',
      per_page: perPage.value,
      total: allItems.length,
      next_page: page.value < lastPage ? page.value + 1 : null
    }
  };
});



const updateItems = (count = 5) => {
  items.value = allItems.slice(0, count);
};

// Initially fill 5 items
updateItems(perPage.value);





const headers = ref(['Name', 'Department', 'Score']);
const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();

const arrayOfTableData = computed(() => {
  return items.value.map((obj) => {
    return [obj.name, obj.department, obj.score,  obj.id];
  });
});

const dataShow = new ResponsiveColumnConfig(3);
customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updatePaginationData(pagination.value);
customTable.updateSelectShow();
customTable.updateIsSerialNoShow();
customTable.updateIdIndex(3);
customTable.updateTotalColumn(3);
customTable.updateDataShow(dataShow);
customTable.updateItemPerPage();
customTable.updateItemPerPageValue(perPage.value);
customTable.updateSortingColumnIndexWithoutStyleByProperty([0,1,2]);

const myTable=computed(()=>{
  return customTable;
})
const tableCustomStyle=computed(()=>{
  return customStyle;
})

watch(
    () => [items.value,pagination.value],
    ([newItemList,newPagination]) => {
      customTable.updateData(arrayOfTableData.value);
      customTable.updatePaginationData(pagination.value);
    },
    { immediate: true }
);


const handleSortingChange = async (index, type) => {
  // Clone the array to avoid mutating the original
  const sorted = [...allItems].sort((a, b) => {
    let valA, valB;

    if (index === 0) { // name
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else if (index === 1) { // department
      valA = a.department.toLowerCase();
      valB = b.department.toLowerCase();
    } else if (index === 2) { // score
      valA = a.score;
      valB = b.score;
    }

    if (valA < valB) return type ? -1 : 1;
    if (valA > valB) return type ? 1 : -1;
    return 0;
  });

  // Update paginated items
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  items.value = sorted.slice(start, end);

  return true;
};

const handleSelectorChange = async (perPageValue) => {
  perPage.value=perPageValue;
  updateItems(perPage.value);
  customTable.updateItemPerPageValue(perPage.value);
};
const handlePagination = async (currentPage) => {
  if (currentPage === page.value) return;

  page.value = currentPage;

  const start = (currentPage - 1) * perPage.value;
  const end = start + perPage.value;
  items.value = allItems.slice(start, end);
};

const handleSelectItemChange=async (id,index,isChecked)=>{

  customTable.updateCheckBox(id,index,isChecked);


}
const removeAllSelected=()=>{
  customTable.updateAllDeselect();

}
defineExpose({
  removeAllSelected,
});

</script>

<style scoped>
/* 🌐 Layout Wrapper */
.demo-wrapper {
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.03);
  max-width: 1000px;
  margin: 3rem auto;
  transition: all 0.3s ease;
  position: relative;
}

/* ✨ Section Header */
.section-heading {
  text-align: center;
  margin-bottom: 2.5rem;
  animation: fadeInDown 0.5s ease;
}

.demo-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #10b981, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.8rem;
}

.demo-description {
  font-size: 1.05rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  word-break: break-word;
}

.demo-footer-description {
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 2rem;
  font-style: italic;
}

/* 📦 Table Container */
.table-placeholder {
  min-height: 150px;
  border: 2px dashed #60a5fa;
  border-radius: 1rem;
  background-color: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #2563eb;
  padding: 1em;
  overflow-x: auto;
  font-size: 1em;

}

/* 🧰 Action Button */
.action-buttons {
  text-align: center;
  margin: 2rem 0 1rem;
}

.btn-show-selected {
  background-color: #3b82f6;
  color: white;
  padding: 0.5em 1em;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-show-selected:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

/* 📋 Dialog for Selection */
.selected-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 1.5em 2em;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  color: #111827;
  z-index: 1000;
}


.selected-dialog h3 {
  margin-bottom: 1em;
  font-size: 1.25em;
  text-align: center;
}

.selected-dialog ul {
  list-style-type: none;
  padding: 0;
}

.selected-dialog li {
  margin: 0.5em 0;
}

.dialog-actions {
  text-align: center;
  margin-top: 1.5rem;
}

.btn-close {
  background-color: #ef4444;
  color: white;
  padding: 0.4em 1em;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

/* 🌙 Dark Mode */
.dark-mode .demo-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.05);
}

.dark-mode .demo-description,
.dark-mode .demo-footer-description {
  color: #a5f3fc;
}

.dark-mode .table-placeholder {
  background-color: #0f172a;
  border-color: #0ea5e9;
  color: #67e8f9;
}
.dark-mode .selected-dialog {
  background-color: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
  box-shadow: 0 20px 50px rgba(255, 255, 255, 0.05);
}
/* 📱 Responsive Breakpoints (Tailwind style) */

/* xs: ≤400px */
@media (max-width: 400px) {
  .demo-wrapper {
    padding: 1rem 0.5rem;
  }

  .demo-title {
    font-size: 1.2rem;
  }

  .demo-description {
    font-size: 0.8rem;
  }

  .table-placeholder {
    font-size: 0.68em;
  }
}

/* sm: 401px–639px */
@media (min-width: 401px) and (max-width: 639px) {
  .demo-wrapper {
    padding: 1.25rem 0.75rem;
  }

  .demo-title {
    font-size: 1.4rem;
  }

  .demo-description {
    font-size: 0.9rem;
  }

  .table-placeholder {
    font-size: 0.78em;
  }
}

/* md: 640px–767px */
@media (min-width: 640px) and (max-width: 767px) {
  .demo-wrapper {
    padding: 1.5rem 1rem;
  }

  .demo-title {
    font-size: 1.5rem;
  }

  .demo-description {
    font-size: 0.95rem;
  }

  .table-placeholder {
    font-size: 0.85em;
  }
}

/* lg: 768px–1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .demo-wrapper {
    padding: 2rem 1.5rem;
  }
}

/* xl: 1024px–1279px */
@media (min-width: 1024px) and (max-width: 1279px) {
  .demo-wrapper {
    padding: 2.5rem 2rem;
  }
}

/* 2xl: ≥1280px */
@media (min-width: 1280px) {
  .demo-wrapper {
    padding: 3rem 2rem;
  }
}

/* 🎬 Animation */
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
