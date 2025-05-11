<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">🔁 Pagination – Load More vs Numbered</h2>
      <p class="demo-description">
        Demonstrates two common UX patterns: <strong>classic numbered pagination</strong> and the smoother <strong>"Load More"</strong> button.
        Ideal for modern interfaces that handle large datasets without reloading or navigating.
      </p>
    </div>
    <!-- Mode Toggle -->
    <div class="mode-toggle">
      <button
          :class="{ active: mode === 'pagination' }"
          @click="mode = 'pagination'"
      >
        Numbered Pagination
      </button>
      <button
          :class="{ active: mode === 'loadMore' }"
          @click="mode = 'loadMore'"
      >
        Load More
      </button>
    </div>


    <!-- Table Placeholder -->
    <div class="table-placeholder">
      <DynamicTable
          :myTable="myTable"
          :customStyle="tableCustomStyle"
          :onPaginate="handlePagination"
          style="width: 100%"
      />
    </div>

    <!-- Description -->
    <p class="demo-footer-description">
      You can switch between pagination styles using the toggle above. Perfect for infinite scroll behavior or structured navigation.
    </p>

  </div>
</template>

<script setup>
/**
 * @component PaginationModesDemo
 * @description
 * A Vue 3 component that showcases two pagination UX patterns for data tables:
 * 1. Classic Numbered Pagination
 * 2. "Load More" Button (incremental loading)
 *
 * The table is powered by `DynamicTable` and `TableConfig`, with responsive breakpoints,
 * themed design, and dark mode support. Users can switch between pagination styles using a toggle UI.
 *
 * Features:
 * - Responsive layout and adaptive font sizing
 * - Full dark mode compatibility
 * - Pagination data updates via reactive watch
 * - Dynamic control over number of items displayed
 * - Custom table style via `TableStyleConfig`
 * - Simulated backend pagination with `page`, `perPage`, and `meta` data
 *
 * Props (to DynamicTable):
 * - myTable: reactive table configuration
 * - customStyle: scoped table styling configuration
 * - onPaginate: handles pagination or load-more interaction
 *
 * @dependencies
 * - DynamicTable (local component)
 * - TableConfig, TableStyleConfig, ResponsiveColumnConfig (from '@')
 *
 * @author
 * Jubayer Ahmed
 */


import {computed, reactive, ref, watch} from 'vue'
import DynamicTable from '@/components/index.vue';
import {
  TableConfig,
  TableStyleConfig,
  ResponsiveColumnConfig
} from '@';
const mode = ref('pagination'); // 'pagination' or 'loadMore'
const perPage = ref(5);
const page = ref(1);

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

const items = ref([]);
const headers = ref(['Name', 'Department', 'Score']);

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
const arrayOfTableData = computed(() =>
    items.value.map((obj) => [obj.name, obj.department, obj.score, obj.id])
);
const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();
const dataShow = new ResponsiveColumnConfig(3);

customTable.updateHeaders(headers.value);
customTable.updateIdIndex(3);
customTable.updateTotalColumn(3);
customTable.updateDataShow(dataShow);
customTable.updateItemPerPageValue(perPage.value);
customTable.updatePaginationData(pagination.value);
// customTable.updatePaginationLoadMore();

const updateItems = () => {
  const start = 0;
  const end = page.value * perPage.value;
  items.value = allItems.slice(0, end);
  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
};
updateItems();

watch(
    () => [items.value,pagination.value],
    ([newItemList,newPagination]) => {
      customTable.updateData(arrayOfTableData.value);
      customTable.updatePaginationData(pagination.value);
    },
    { immediate: true }
);

watch(mode, () => {
  page.value = 1;
  if (mode.value==='pagination'){
    customTable.updatePaginationNumber();
  }else {
    customTable.updatePaginationLoadMore();
  }
});

const handlePagination = async (currentPage) => {
  if (currentPage === page.value && mode.value === 'pagination') return;

  if (mode.value === 'pagination') {
    page.value = currentPage;
    const start = (currentPage - 1) * perPage.value;
    const end = start + perPage.value;
    items.value = allItems.slice(start, end);
  } else {
    const totalPages = Math.ceil(allItems.length / perPage.value);
    if (page.value < totalPages) {
      page.value += 1;
      // Append more items (incremental loading)
      const end = page.value * perPage.value;
      items.value = allItems.slice(0, end);
    }
  }

  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
};



const myTable = computed(() => customTable);
const tableCustomStyle = computed(() => customStyle);

</script>

<style scoped>
/* --------------------------------------------------
   Pagination Modes Demo – Responsive + Themed
-------------------------------------------------- */

.demo-wrapper {
  background: linear-gradient(135deg, #f0fdf4, #ecfeff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  max-width: 1000px;
  margin: 3rem auto;
  transition: all 0.3s ease;
}

.section-heading {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease;
  padding: 0 1rem;
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
  text-align: center;
}

.mode-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mode-toggle button {
  background-color: #e0f2fe;
  border: 1px solid #60a5fa;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-toggle button.active {
  background-color: #3b82f6;
  color: white;
  border-color: #2563eb;
}

.table-placeholder {
  min-height: 150px;
  border: 2px dashed #93c5fd;
  border-radius: 1rem;
  background-color: #eff6ff;
  padding: 1em;
  margin-top: 1.5rem;
  overflow-x: auto;
}

.demo-footer-description {
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 2rem;
  font-style: italic;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* 🌙 Dark Mode Support */
.dark-mode .demo-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.05);
}

.dark-mode .demo-description,
.dark-mode .demo-footer-description {
  color: #cbd5e1;
}

.dark-mode .table-placeholder {
  background-color: #1e2937;
  border-color: #334155;
}

.dark-mode .mode-toggle button {
  background-color: #334155;
  color: #e0f2fe;
  border-color: #475569;
}

.dark-mode .mode-toggle button.active {
  background-color: #6366f1;
  color: white;
  border-color: #818cf8;
}

/* 🔁 Responsive Breakpoints */
@media (max-width: 400px) {
  .demo-wrapper {
    padding: 1rem 0.5rem;
  }
  .demo-title {
    font-size: 1.2rem;
  }
  .demo-description,
  .demo-footer-description {
    font-size: 0.75rem;
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
    font-size: 1.4rem;
  }
  .demo-description,
  .demo-footer-description {
    font-size: 0.85rem;
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
    font-size: 1.6rem;
  }
  .demo-description,
  .demo-footer-description {
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