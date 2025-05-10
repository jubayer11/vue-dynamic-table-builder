<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">🎛️ Smart Actions with Dynamic Status Icons</h2>
      <p class="demo-description">
        A powerful example demonstrating <strong>conditional status icons</strong> and <strong>mixed action types</strong> like popups and route navigations — fully driven by row data.
        Great for <strong>dashboards</strong>, <strong>activity logs</strong>, or <strong>role-based interfaces</strong>.
      </p>
    </div>

    <!-- Table Placeholder -->
    <div class="table-container">
      <DynamicTable
          :myTable="myTable"
          :customStyle="tableCustomStyle"
          :onActionClick="handleActionClick"
          style="width: 100%"
      />
    </div>
    <div class="demo-controls">
      <button class="btn-reset" @click="loadInitialData">🔄 Reset Users</button>
    </div>


    <ActionDialog
        v-if="showDialog"
        :user="activeUser"
        @close="closeActionDialog"
        @save="handleSave"
        @confirm="handleConfirm"
    />
    <div class="demo-footer">
      <p>
        🧠 <strong>Note:</strong> This table demonstrates dynamic per-row behavior with status icons, popup vs route actions, and context-aware buttons — ideal for building intelligent dashboards or admin panels.
      </p>
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
  ViewActionIcon,
  EditActionIcon,
  DestroyActionIcon,
  PresentActionIcon,
  PlusActionIcon,
  MinusActionIcon,
  EmailActionIcon,
  MessageActionIcon,
  SmsActionIcon,
  LockedActionIcon, dialogValue, dialog
} from '@';
import { SpecificAction } from '@/utils/SpecificActionClass.js';
import { popUpOrRoute } from '@/utils/customizableTable.js';
import {
  DisableOutlineButton,
  SecondaryOutlineButton
} from '@/utils/action/actionButtonClass.js';
import {
  ButtonActionActivityType,
  IconInlineActivityType
} from '@/utils/ActionActivityType.js';
import ActionDialog from "@demo/components/dialog/ActionDialog.vue";


// Dialog State
const showDialog = ref(false);
const activeUser = ref(null);

const headers = ref([
  'Name & Role',
  'Status',
  'Last Active',
  'Contact',
  'Description',
  'Actions'
]);

const items = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Admin',
    status: 'locked',
    lastActive: '2025-05-06 14:22',
    contact: 'email',
    description: 'Handles user permissions and system configurations.'
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'User',
    status: 'active',
    lastActive: '2025-05-06 13:10',
    contact: 'email',
    description: ''
  },
  {
    id: 3,
    name: 'Carol Lee',
    role: 'Guest',
    status: 'invited',
    lastActive: '—',
    contact: 'phone',
    description: 'Invited temporarily for external project collaboration.'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'User',
    status: 'deactivated',
    lastActive: '2025-04-20 11:45',
    contact: '',
    description: null
  },
  {
    id: 5,
    name: 'Eve Turner',
    role: 'Support',
    status: 'active',
    lastActive: '2025-05-05 17:40',
    contact: 'message',
    description: 'Handles tier-1 support and customer escalations.'
  }
]);


const arrayOfTableData = computed(() => {
  return items.value.map((obj) => {
    let statusAction = new SpecificAction(0);
    let contactAction = new SpecificAction(0);
    let descriptionAction = new SpecificAction(0);

    if (obj.status === 'locked') statusAction = new SpecificAction(0);
    else if (obj.status === 'active') statusAction = new SpecificAction(1);
    else if (obj.status === 'invited') statusAction = new SpecificAction(2);
    else if (obj.status === 'deactivated') statusAction = new SpecificAction(3);

    // Set contact icon logic
    if (obj.contact==='') {
      contactAction = new SpecificAction(10); // empty
    }else if(obj.contact==='email'){
      contactAction = new SpecificAction(0);
    }else if(obj.contact==='message'){
      contactAction = new SpecificAction(1);
    }else if(obj.contact==='phone'){
      contactAction = new SpecificAction(2);
    }


    if (obj.description && obj.description.trim() !== '') {
      descriptionAction = new SpecificAction(1);
    }

    return [
      [obj.name, obj.role],
      statusAction,
      obj.lastActive,
      contactAction,
      descriptionAction,
      obj.id
    ];
});
});


const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();

const viewIcon = new ViewActionIcon();
const editIcon = new EditActionIcon();
const destroyIcon = new DestroyActionIcon();
const lockedIcon = new LockedActionIcon(false);
const presentIcon = new PresentActionIcon(false);
const plusIcon = new PlusActionIcon(false);
const minusIcon = new MinusActionIcon(false);
const emailIcon = new EmailActionIcon(false);
const messageIcon = new MessageActionIcon(false);
const smsIcon = new SmsActionIcon(false);

const descriptionBtn = new SecondaryOutlineButton(100, 'View');
const noDescriptionBtn = new DisableOutlineButton(200, 'Not Available');

descriptionBtn.updatePopUpOrRoute(popUpOrRoute.popUp, 'descriptionDialog');
viewIcon.updatePopUpOrRoute(popUpOrRoute.route, '/view/action');
editIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'editDialog');
destroyIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'confirmDialog');




//style
viewIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--view');
viewIcon.updateStyleClasses('icon', 'icon-svg');
viewIcon.updateStyleClasses('path', ['icon-fill--success']);

editIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--edit');
editIcon.updateStyleClasses('icon', 'icon-svg');
editIcon.updateStyleClasses('path', ['icon-fill--warning']);

destroyIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--delete');
destroyIcon.updateStyleClasses('icon', 'icon-svg');
destroyIcon.updateStyleClasses('path', ['icon-fill--error']);

lockedIcon.updateStyleClasses('icon', 'icon-svg-md');
presentIcon.updateStyleClasses('icon', 'icon-svg-md');
plusIcon.updateStyleClasses('icon', 'icon-svg-md');
minusIcon.updateStyleClasses('icon', 'icon-svg-md');
emailIcon.updateStyleClasses('icon', 'icon-svg-md');
messageIcon.updateStyleClasses('icon', 'icon-svg-md');
smsIcon.updateStyleClasses('icon','icon-svg-md');

const dataShow = new ResponsiveColumnConfig(6);
const iconType = new IconInlineActivityType();
const buttonType = new ButtonActionActivityType();

customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updateIdIndex(5);
customTable.updateTotalColumn(6);
customTable.updateMultipleColumns([0]);
customTable.updateDataShow(dataShow);
customTable.updateActionColumnIndexProperty(1, iconType, [lockedIcon, presentIcon, plusIcon, minusIcon]);
customTable.updateActionColumnIndexProperty(3, iconType, [emailIcon,messageIcon, smsIcon]);
customTable.updateActionColumnIndexProperty(4, buttonType, [noDescriptionBtn, descriptionBtn]);
customTable.updateActionColumnIndexProperty(5, iconType, [viewIcon, editIcon, destroyIcon]);

const myTable=computed(()=>{
  return customTable;
})
const tableCustomStyle=computed(()=>{
  return customStyle;
})

watch(
    arrayOfTableData,
    (newData) => {
      customTable.updateData(newData);
    },
    { immediate: true }
);


const handleActionClick = async (item, id, index, type) => {
  const user = items.value.find((u) => u.id === id);
  if (!user) return;

  activeUser.value = user;

  // Delay dialog open to ensure return completes first
  setTimeout(() => {
    if (item.popUpOrRoute.isPopUpOrRoute !== popUpOrRoute.route) {
      showDialog.value = true;
    }
  }, 0);

  return true;
};


// 👇 Dialog Actions
const handleSave = (updatedData) => {
  const index = items.value.findIndex((u) => u.id === updatedData.id);
  if (index !== -1) {
    items.value[index] = { ...updatedData };
  }
  console.log('check items',arrayOfTableData.value);
  closeActionDialog();
};

const handleConfirm = (id) => {
  items.value = items.value.filter((u) => u.id !== id);
  closeActionDialog();
};
const closeActionDialog=()=>{
  showDialog.value = false
  dialog.value={};
  dialogValue.value='';
  console.log('see close',dialog.value);
}
const loadInitialData = () => {
  items.value = JSON.parse(JSON.stringify(initialUserData));
};

const initialUserData = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Admin',
    status: 'locked',
    lastActive: '2025-05-06 14:22',
    contact: 'email',
    description: 'Handles user permissions and system configurations.'
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'User',
    status: 'active',
    lastActive: '2025-05-06 13:10',
    contact: 'email',
    description: ''
  },
  {
    id: 3,
    name: 'Carol Lee',
    role: 'Guest',
    status: 'invited',
    lastActive: '—',
    contact: 'phone',
    description: 'Invited temporarily for external project collaboration.'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'User',
    status: 'deactivated',
    lastActive: '2025-04-20 11:45',
    contact: '',
    description: null
  },
  {
    id: 5,
    name: 'Eve Turner',
    role: 'Support',
    status: 'active',
    lastActive: '2025-05-05 17:40',
    contact: 'message',
    description: 'Handles tier-1 support and customer escalations.'
  }
];

</script>

<style scoped>

.demo-footer {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-left: 4px solid #3b82f6;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  color: #374151;
}

.demo-controls {
  text-align: center;
  margin-top: 2rem;
}
.btn-reset {
  background: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.btn-reset:hover {
  background: #2563eb;
}

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
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease;
}

.demo-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #ec4899, #8b5cf6);
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

.table-container {
  padding: 1em;
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f1f5f9;

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
