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
}

.section-heading {
  text-align: center;
  margin-bottom: 2.5rem;
}

.demo-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #059669, #10b981);
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
  min-height: 150px;
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
}

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

</style>
