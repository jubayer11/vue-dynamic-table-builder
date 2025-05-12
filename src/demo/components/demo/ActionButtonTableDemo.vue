<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">🚀 Table with Action Buttons</h2>
      <p class="demo-description">
        This demo showcases how to use <strong>text buttons</strong> instead of icons as actions per row in the Vue Dynamic Table Builder. Each button is configurable and can trigger popups, routes, or external handlers.
      </p>
      <p class="demo-description">
        It's ideal when clearer action labels like <code>Confirm</code> or <code>Absent</code> improve user clarity over abstract icons.
      </p>
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
 * 📦 Action Table Demo - Vue Dynamic Table Builder
 *
 * This demo renders a table with row-level **text-based action buttons** (Confirm / Absent),
 * driven by the Vue Dynamic Table Builder. It showcases a button-based action column with
 * real-time updates to row status and styling.
 *
 * @component ActionTableDemo
 * @prop {Function} handleActionClick - Handles row action logic and updates status dynamically.
 * @prop {Ref<Array>} items - The source data representing rows (name, task, status, id).
 * @prop {ComputedRef<TableConfig>} myTable - Computed reactive table configuration object.
 * @prop {ComputedRef<TableStyleConfig>} tableCustomStyle - Styling configuration for table cells (e.g., color badges).
 * @prop {Array<SuccessNormalButton | CancelOutlineButton>} buttons - Configured action buttons (Confirm, Absent).
 * @prop {ResponsiveColumnConfig} dataShow - Controls column visibility for responsive views.
 */



import {computed, reactive, ref, watch} from 'vue';
import DynamicTable from '@/components/index.vue';
import {
  TableConfig,
  TableStyleConfig,
  ResponsiveColumnConfig,
} from '@';
import { ButtonActionActivityType } from '@/utils/ActionActivityType.js';
import { popUpOrRoute } from '@/utils/customizableTable.js';
import { CancelOutlineButton, SuccessNormalButton } from "@/utils/action/actionButtonClass.js";

const items = ref([
  { id: 401, name: 'Sarah Lane', task: 'Yoga Session', status: 'Pending' },
  { id: 402, name: 'Mark Reed', task: 'Dance Session', status: 'Confirmed' },
  { id: 403, name: 'Julie Scott', task: 'Swim Class', status: 'Absent' },
  { id: 404, name: 'Tom Harris', task: 'Meditation', status: 'Pending' }
]);


const headers = ref(['Name', 'Task', 'Status', 'Action']);
const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();

const sendBtn = new SuccessNormalButton(1, 'Confirm');
const archiveBtn = new CancelOutlineButton(2, 'Absent');

sendBtn.updatePopUpOrRoute(popUpOrRoute.neither);
archiveBtn.updatePopUpOrRoute(popUpOrRoute.neither);

sendBtn.updateStyleClasses('btn-approve');
archiveBtn.updateStyleClasses('btn-reject');

const arrayOfTableData = computed(() => {
  return items.value.map((obj) => {
    if(obj.status==='Pending'){
      customStyle.updateTdItemIdIndex(obj.id,2,'table-status--pending');
    }else if(obj.status==='Confirmed') {
      customStyle.updateTdItemIdIndex(obj.id, 2, 'table-status--yes');
    }
    else if(obj.status==='Absent') {
      customStyle.updateTdItemIdIndex(obj.id, 2, 'table-status--suspended');
    }
        return [obj.name, obj.task, obj.status, obj.id]
      });
});

const dataShow = new ResponsiveColumnConfig(4);
const actionActivityType = new ButtonActionActivityType();

customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updateIdIndex(3);
customTable.updateTotalColumn(4);
customTable.updateDataShow(dataShow);
customTable.updateActionColumnIndexProperty(3, actionActivityType, [sendBtn, archiveBtn]);

const myTable = computed(() => customTable);
const tableCustomStyle = computed(() => customStyle);


// watch(
//     () => [items.value],
//     ([newUserList]) => {
//
//       customTable.updateData(arrayOfTableData.value);
//     },
//     { immediate: true }
// );
const handleActionClick = (item, id, index, type) => {
  const labelMap = {
    1: '✅ Confirm',
    2: '🚫 Absent'
  };

  alert(`${labelMap[item.value]} clicked on row ${index}, ID: ${id}`);

  if (item.value === 1) {
    items.value[index].status = 'Confirmed';
  } else if (item.value === 2) {
    items.value[index].status = 'Absent';
  }
  customTable.updateData(arrayOfTableData.value);

  return false;
};

</script>

<style scoped>
.demo-wrapper {
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
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
  background: linear-gradient(to right, #059669, #10b981);
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

/* Responsive Breakpoints */
@media (max-width: 400px) {
  .demo-wrapper {
    padding: 1rem 0.5rem;
  }
  .demo-title {
    font-size: 1rem;
  }
  .demo-description {
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
    font-size: 1.25rem;
  }
  .demo-description {
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
    font-size: 1.5rem;
  }
  .demo-description {
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

