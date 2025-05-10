<template>
  <div class="basic-table-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">📊 Basic Table with Pagination</h2>
      <p class="demo-description">
        This example demonstrates a minimal, elegant table layout powered by the Vue Dynamic Table Builder.
        It's ideal for listing teams, users, or employees with ease.
      </p>
    </div>

    <!-- Table Placeholder -->
    <p class="results-count">Showing {{ items.length }} records</p>

    <div class="table-placeholder">

      <DynamicTable
          :my-table="myTable"
          :customStyle="tableCustomStyle"
          style="width: 100%"
      />

    </div>
    <p class="powered-by">Powered by Vue Dynamic Table Builder</p>

  </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'

import DynamicTable  from "@/components/index.vue";
import {ResponsiveColumnConfig, TableConfig, TableStyleConfig} from "@";

const items = ref([
  { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', email: 'alice@company.com' },
  { id: 2, name: 'Bob Smith', role: 'UI/UX Designer', email: 'bob@company.com' },
  { id: 3, name: 'Carol Lee', role: 'Product Manager', email: 'carol@company.com' },
  { id: 4, name: 'David Kim', role: 'QA Engineer', email: 'david@company.com' },
  { id: 5, name: 'Eve Garcia', role: 'DevOps Engineer', email: 'eve@company.com' },
  { id: 6, name: 'Frank White', role: 'Backend Developer', email: 'frank@company.com' }
])


const headers=ref(['Name','Role','Email']);
const arrayOfTableData = computed(() => {
  return (items.value || []).map((obj) => {
    return [
        obj.name,
        obj.role,
        obj.email,
        obj.id,
    ];
  });
});
const customTable=reactive(new TableConfig());
const dataShow= new ResponsiveColumnConfig(3);
const customStyle=new TableStyleConfig();

customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updateIdIndex(3);
customTable.updateIsSerialNoShow();
customTable.updateTotalColumn(3);
customTable.updateDataShow(dataShow);
const myTable=computed(()=>{
  return customTable;
})
const tableCustomStyle=computed(()=>{
  return customStyle;
})

</script>

<style scoped>
.basic-table-wrapper {
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
  color: #1d4ed8;
  background: linear-gradient(to right, #3b82f6, #6366f1);
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

.table-placeholder {
  padding: 1em;
  min-height: 150px;
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #64748b;
}
.results-count {
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.powered-by {
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
}

.dark-mode .powered-by {
  color: #9ca3af;
}

.dark-mode .results-count {
  color: #9ca3af;
}


/* Dark Mode Styles */
.dark-mode .basic-table-wrapper {
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

/* Subtle animation */
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
