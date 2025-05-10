
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
  console.log('checking',customTable.selectedItem.ids);

}
const removeAllSelected=()=>{
  customTable.updateAllDeselect();
  console.log('I am hit');
}
defineExpose({
  removeAllSelected,
});

</script>

<style scoped>
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
}

.demo-footer-description {
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 2rem;
  font-style: italic;
}

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
}

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

.selected-dialog {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  padding: 1.5em 2em;
  width: 400px;
  max-width: 90%;
  margin: 2rem auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  color: #111827;
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

/* Dark Mode Styles */
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
