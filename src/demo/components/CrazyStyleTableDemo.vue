<template>
  <div class="crazy-wrapper">
    <div class="crazy-header">
      <h2 class="crazy-title">🌈 Extreme Custom Styled Table</h2>
      <p class="crazy-description">
        This demo shows how you can <strong>control every part</strong> of the table: headers, rows, cells, per index, per ID, and even the expandable area. Powered by <code>TableStyleConfig</code>.
      </p>
      <button class="crazy-toggle" @click="toggleDark">🌗 Toggle Theme</button>
    </div>

    <div class="crazy-table-container ">
      <div class="table-scroll-wrapper">
      <DynamicTable
          :myTable="myTable"
          :customStyle="customTableStyle"
          :onSelectorChange="handleSelectorChange"
          :onSelectItemChange="handleSelectItemChange"
          :onPaginate="handlePagination"
          style="width: 100%;"
      >
        <!-- Custom Column Rendering -->
        <template #specific-column="{ item, colIndex, id }">
          <div v-if="colIndex === 0" class="cell-avatar-name">
            <img :src="item[1]" class="circle-avatar" />
            <strong class="highlight-name">{{ item[0] }}</strong>
          </div>
          <div v-else-if="colIndex === 1" class="cell-dual-contact">
            <div>Email: {{ item[0] }}</div>
            <div>📞 {{ item[1] }}</div>
          </div>
          <div v-else-if="colIndex === 3" :class="['status-badge', item]">
            <span class="status-label">{{ item }}</span>
          </div>
        </template>

        <!-- Expandable Section Styling -->
        <template #expandable-specific-column="{ item, colIndex }">
          <div v-if="colIndex === 5" class="expand-progress">
            <div class="bar-wrap">
              <div class="bar-fill" :style="{ width: item + '%' }">{{ item }}%</div>
            </div>
          </div>
          <div v-else-if="colIndex === 6" class="expand-note">📝 {{ item }}</div>
          <div v-else-if="colIndex === 7" class="expand-indicator">
            <span :class="item.includes('✅') ? 'dot-online' : 'dot-offline'">{{ item }}</span>
          </div>
          <div v-else-if="colIndex === 8" class="tag-list">
            <span class="tag" v-for="(tag, i) in item.split(', ')" :key="i">#{{ tag }}</span>
          </div>
        </template>
      </DynamicTable>
    </div>
    </div>
    <p class="crazy-footer">
      This table demonstrates <strong>slot rendering</strong>, <strong>cell-level overrides</strong>, <strong>expandable section styling</strong>, and a <strong>dynamic theme</strong>. Total visual freedom! 🎨
    </p>
  </div>
</template>

<script setup>
import {ref, reactive, computed, watch} from 'vue';
import DynamicTable from '@/components/index.vue';
import {
  TableConfig,
  TableStyleConfig,
  ResponsiveColumnConfig,
  ViewActionIcon,
  EditActionIcon,
  DestroyActionIcon
} from '@';
import { popUpOrRoute} from "@/utils/customizableTable.js";
import {IconInlineActivityType} from "@/utils/ActionActivityType.js";
/**
 * @component ExtremeCustomStyledTable
 * @description
 * A highly customizable Vue 3 component that demonstrates full visual and structural control
 * of a dynamic table using the `DynamicTable` engine and `TableStyleConfig` styling system.
 *
 * This component showcases:
 * - Deep custom styling for headers, cells, expandable sections, and pagination
 * - Slot-based custom column rendering using `#specific-column` and `#expandable-specific-column`
 * - Toggleable dark mode that dynamically adjusts classes and colors
 * - Per-index, per-ID, and per-property styling through `TableStyleConfig`
 * - Pagination control and reactive updates via `page` and `perPage`
 * - Serial number display, multi-column support, and checkbox selection
 *
 * The table is styled using class maps injected via the `TableStyleConfig` API,
 * supporting scalable design and easy theming.
 *
 * @features
 * - 🎨 Fully controlled header/body/expand/action column styling
 * - 🌙 Dark mode toggle support via `toggleDark()`
 * - 🔁 Responsive layout with adaptive typography
 * - 🔗 Action buttons using `ViewActionIcon`, `EditActionIcon`, and `DestroyActionIcon`
 * - 🔍 Dynamic pagination and item selector integration
 *
 * @slots
 * - `#specific-column` – renders custom content for visible columns
 * - `#expandable-specific-column` – renders expanded row data
 *
 * @dependencies
 * - DynamicTable (local component)
 * - TableConfig, TableStyleConfig, ResponsiveColumnConfig
 * - ViewActionIcon, EditActionIcon, DestroyActionIcon
 * - IconInlineActivityType, popUpOrRoute (utility definitions)
 *
 * @author
 * Jubayer Ahmed
 */

const isDark = ref(false);
const toggleDark = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark-mode', isDark.value);
};

const headers = ref([
  'Avatar + Name', 'Contact', 'Role', 'Status', 'action','Performance', 'Notes', 'Online', 'Tags'
]);




const allItems = [
  {
    id: 1,
    name: 'Alice',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'alice@example.com',
    phone: '+880123456',
    role: 'Frontend',
    status: 'active',
    performance: '92',
    notes: 'Top performer',
    online: '✅ Online',
    tags: 'Vue, Tailwind, Git'
  },
  {
    id: 2,
    name: 'Bob',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'bob@example.com',
    phone: '+880987654',
    role: 'Backend',
    status: 'pending',
    performance: '71',
    notes: 'Needs improvement',
    online: '❌ Offline',
    tags: 'Laravel, Redis'
  },
  {
    id: 3,
    name: 'Carol',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'carol@example.com',
    phone: '+880112233',
    role: 'QA',
    status: 'on-leave',
    performance: '84',
    notes: 'On vacation',
    online: '❌ Offline',
    tags: 'Jest, Cypress'
  },
  {
    id: 4,
    name: 'David',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    email: 'david@example.com',
    phone: '+880556677',
    role: 'DevOps',
    status: 'active',
    performance: '88',
    notes: 'Reliable automation',
    online: '✅ Online',
    tags: 'Docker, Kubernetes'
  },
  {
    id: 5,
    name: 'Eve',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    email: 'eve@example.com',
    phone: '+880998877',
    role: 'Product',
    status: 'active',
    performance: '95',
    notes: 'Creative lead',
    online: '✅ Online',
    tags: 'Figma, Miro'
  },
  {
    id: 6,
    name: 'Frank',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    email: 'frank@example.com',
    phone: '+880667788',
    role: 'Design',
    status: 'pending',
    performance: '68',
    notes: 'Pending review',
    online: '❌ Offline',
    tags: 'Sketch, Adobe XD'
  },
  {
    id: 7,
    name: 'Grace',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    email: 'grace@example.com',
    phone: '+880445566',
    role: 'Support',
    status: 'on-leave',
    performance: '76',
    notes: 'On maternity leave',
    online: '❌ Offline',
    tags: 'Zendesk, Freshdesk'
  },
  {
    id: 8,
    name: 'Hank',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    email: 'hank@example.com',
    phone: '+880334455',
    role: 'Manager',
    status: 'active',
    performance: '87',
    notes: 'Team lead',
    online: '✅ Online',
    tags: 'Leadership, Reports'
  },
  {
    id: 9,
    name: 'Ivy',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    email: 'ivy@example.com',
    phone: '+880223344',
    role: 'Data',
    status: 'active',
    performance: '91',
    notes: 'Data insights guru',
    online: '✅ Online',
    tags: 'SQL, Excel'
  },
  {
    id: 10,
    name: 'Jake',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    email: 'jake@example.com',
    phone: '+880112211',
    role: 'Security',
    status: 'active',
    performance: '89',
    notes: 'Zero incidents',
    online: '✅ Online',
    tags: 'Firewall, VPN'
  },
  {
    id: 11,
    name: 'Karen',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    email: 'karen@example.com',
    phone: '+880667799',
    role: 'Sales',
    status: 'active',
    performance: '85',
    notes: 'Closed big deals',
    online: '✅ Online',
    tags: 'CRM, Pipeline'
  },
  {
    id: 12,
    name: 'Leo',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    email: 'leo@example.com',
    phone: '+880889900',
    role: 'Marketing',
    status: 'pending',
    performance: '73',
    notes: 'Needs campaign approval',
    online: '❌ Offline',
    tags: 'SEO, Ads'
  },
  {
    id: 13,
    name: 'Mia',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    email: 'mia@example.com',
    phone: '+880998899',
    role: 'Frontend',
    status: 'active',
    performance: '94',
    notes: 'Pixel-perfect coder',
    online: '✅ Online',
    tags: 'React, Vue'
  },
  {
    id: 14,
    name: 'Noah',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    email: 'noah@example.com',
    phone: '+880556688',
    role: 'Backend',
    status: 'on-leave',
    performance: '79',
    notes: 'Temporary leave',
    online: '❌ Offline',
    tags: 'PHP, Node'
  },
  {
    id: 15,
    name: 'Olivia',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    email: 'olivia@example.com',
    phone: '+880445599',
    role: 'Manager',
    status: 'active',
    performance: '90',
    notes: 'People manager',
    online: '✅ Online',
    tags: 'Planning, Reviews'
  },
  {
    id: 16,
    name: 'Paul',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    email: 'paul@example.com',
    phone: '+880334466',
    role: 'Support',
    status: 'pending',
    performance: '69',
    notes: 'Probation period',
    online: '❌ Offline',
    tags: 'Chat, CRM'
  },
  {
    id: 17,
    name: 'Quinn',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    email: 'quinn@example.com',
    phone: '+880223355',
    role: 'PM',
    status: 'active',
    performance: '86',
    notes: 'Sprint manager',
    online: '✅ Online',
    tags: 'Scrum, Planning'
  },
  {
    id: 18,
    name: 'Rex',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    email: 'rex@example.com',
    phone: '+880112244',
    role: 'Security',
    status: 'active',
    performance: '81',
    notes: 'Shift supervisor',
    online: '✅ Online',
    tags: 'IDS, Logs'
  },
  {
    id: 19,
    name: 'Sara',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    email: 'sara@example.com',
    phone: '+880667700',
    role: 'Design',
    status: 'pending',
    performance: '70',
    notes: 'Review phase',
    online: '❌ Offline',
    tags: 'Illustrator, Branding'
  },
  {
    id: 20,
    name: 'Tom',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    email: 'tom@example.com',
    phone: '+880889911',
    role: 'Data',
    status: 'active',
    performance: '96',
    notes: 'Data wizard',
    online: '✅ Online',
    tags: 'Python, Pandas'
  }
];

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

const items = ref([]); // What’s actually rendered
const perPage = ref(5); // Default
const page=ref(1);



const updateItems = (count = 5) => {
  items.value = allItems.slice(0, count);
};

// Initially fill 5 items
updateItems(perPage.value);


const arrayOfTableData = computed(() => {
  return items.value.map(obj => [
    [obj.name, obj.avatar],
    [obj.email, obj.phone],
    obj.role,
    obj.status,
    1,
    obj.performance,
    obj.notes,
    obj.online,
    obj.tags,
    obj.id
  ]);
});





const table = reactive(new TableConfig());
const style = new TableStyleConfig();

const viewIcon = new ViewActionIcon();
const editIcon = new EditActionIcon();
const destroyIcon = new DestroyActionIcon();

viewIcon.updatePopUpOrRoute(popUpOrRoute.neither);
editIcon.updatePopUpOrRoute(popUpOrRoute.neither);
destroyIcon.updatePopUpOrRoute(popUpOrRoute.neither);

viewIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--view');
viewIcon.updateStyleClasses('icon', 'icon-svg');
viewIcon.updateStyleClasses('path', ['icon-fill--success','icon-fill--success']);

editIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--edit');
editIcon.updateStyleClasses('icon', 'icon-svg');
editIcon.updateStyleClasses('path', ['icon-fill--warning']);

destroyIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--delete');
destroyIcon.updateStyleClasses('icon', 'icon-svg');
destroyIcon.updateStyleClasses('path', ['icon-fill--error']);


style.updateMain('extreme-table');
style.updateBodyTr('extreme-row');
style.updateBodyTd('extreme-cell');
style.updateHeadTr('extreme-head-row');
style.updateExpandColumnTr('extreme-expand-tr');
style.updateExpandColumnTd('extreme-expand-td');
style.updateExpandColumnHeader('extreme-expand-head');
style.updateExpandColumnData('extreme-expand-data');
style.update("itemPerPage.wrapper", "extreme-itemPerPage__wrapper")
style.update("itemPerPage.label", "extreme-itemPerPage__label")
style.update("itemPerPage.field", "extreme-itemPerPage__field")

style.update("actionColumn.actionColumnWrapper", "extreme-action__wrapper")
style.update("actionColumn.actionColumnContainer", "extreme-action__container")

style.update("pagination.wrapper", "extreme-pagination__wrapper")
style.update("pagination.container", "extreme-pagination__container")
style.update("pagination.itemLink", "extreme-pagination__itemLink")
style.update("pagination.itemLinkClicked", "extreme-pagination__itemLinkClicked")
style.update("pagination.icon", "extreme-pagination__icon")
style.update("pagination.path", ["extreme-pagination__path1","extreme-pagination__path2"])


style.update("pagination.loadMore.wrapper", "extreme-loadMore__wrapper")
style.update("pagination.loadMore.button", "extreme-loadMore__button")
style.update("pagination.loadMore.buttonClick", "extreme-loadMore__buttonClick")
style.update("pagination.loadMore.container", "extreme-loadMore__container")
style.update("pagination.loadMore.animation", "extreme-loadMore__animation")
style.update("pagination.loadMore.content", "extreme-loadMore__content")
style.update("pagination.loadMore.contentClick", "extreme-loadMore__contentClick")
style.updateTdWrapperIndex(0, 'highlighted-si-column');


const dataShow = new ResponsiveColumnConfig(5);
const actionActivityType = new IconInlineActivityType();
table.updateHeaders(headers.value);
table.updateData(arrayOfTableData.value);
table.updatePaginationData(pagination.value);
table.updateIdIndex(9);
table.updateTotalColumn(9);
table.updateDataShow(dataShow);
table.updateMultipleColumns([1]);
table.updateSpecificColumnIndexPropertyArray([0,1,3,5,6,7,8]);
table.updateActionColumnIndexProperty(4, actionActivityType, [viewIcon, editIcon, destroyIcon]);
table.updateItemPerPage();
table.updateItemPerPageValue(perPage.value);
table.updateSelectShow();
table.updateIsSerialNoShow();

const myTable = computed(() => table);
const customTableStyle = computed(() => style);

watch(
    () => [items.value,pagination.value],
    ([newItemList,newPagination]) => {
      table.updateData(arrayOfTableData.value);
      table.updatePaginationData(pagination.value);
    },
    { immediate: true }
);
const handleSelectorChange = async (perPageValue) => {
  perPage.value=perPageValue;
  updateItems(perPage.value);
  table.updateItemPerPageValue(perPage.value);
};
const handlePagination = async (currentPage) => {
  if (currentPage === page.value) return;

  page.value = currentPage;

  const start = (currentPage - 1) * perPage.value;
  const end = start + perPage.value;
  items.value = allItems.slice(start, end);
};

const handleSelectItemChange=async (id,index,isChecked)=>{

  table.updateCheckBox(id,index,isChecked);
  console.log('checking',table.selectedItem.ids);

}
const removeAllSelected=()=>{
  table.updateAllDeselect();
  console.log('I am hit');
}
defineExpose({
  removeAllSelected,
});
</script>

<style>

/* Add this globally (not scoped) */
.highlighted-si-column {
  background-color: #fffacd !important; /* Light yellow */
  border-right: 1px solid #e2e8f0;
}

/* Optional for rounded left border if it's the first visible column */
.highlighted-si-column:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.extreme-itemPerPage__wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.extreme-itemPerPage__label {
  font-weight: bold;
  color: #7c3aed;
}
.extreme-itemPerPage__field {
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid #c084fc;
  background-color: #faf5ff;
}

.extreme-action__wrapper {
  display: flex;
  justify-content: center;
  gap: 0.5em;
}
.extreme-action__container {
  padding: 0.4em 0.8em;
  background-color: #e0e7ff;
  border-radius: 6px;
  color: #1e3a8a;
  font-weight: bold;
}

.extreme-pagination__wrapper {
  padding: 1rem;
  display: flex;
  justify-content: center;
}
.extreme-pagination__container {
  display: flex;
  gap: 0.5rem;
}
.extreme-pagination__itemLink {
  padding: 0.5em 0.75em;
  background: #e0f2fe;
  border-radius: 8px;
  cursor: pointer;
}
.extreme-pagination__itemLinkClicked {
  background: #3b82f6;
  color: white;
}
.extreme-pagination__icon {
  width: 1em;
  height: 1em;
}
.extreme-pagination__path1 {
  fill: #4b5563;
}
.extreme-pagination__path2 {
  stroke: #4b5563;
}

.extreme-loadMore__wrapper {
  margin-top: 1rem;
  text-align: center;
}
.extreme-loadMore__button {
  padding: 0.6rem 1.2rem;
  background: #f59e0b;
  color: white;
  border-radius: 8px;
  font-weight: bold;
}
.extreme-loadMore__buttonClick {
  background: #d97706;
}
.extreme-loadMore__container {
  padding: 1rem;
}
.extreme-loadMore__animation {
  animation: bounce 1s infinite;
}
.extreme-loadMore__content {
  color: #0f172a;
}
.extreme-loadMore__contentClick {
  color: #334155;
}


.extreme-table {
  border: 5px dashed #facc15;
  background: #fffbe6;
  border-radius: 16px;
  overflow: hidden;
}
.extreme-head-row {
  background: linear-gradient(to right, #f43f5e, #ec4899);
  color: white;
}
.extreme-row:nth-child(odd) {
  background: #fef9c3;
}
.extreme-row:nth-child(even) {
  background: #fefce8;
}
.extreme-cell {
  padding: 1rem;
  font-size: 0.95rem;
  font-family: 'Courier New', Courier, monospace;
}
.cell-avatar-name {
  display: flex;
  align-items: center;
  gap: 10px;
}
.circle-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #8b5cf6;
}
.highlight-name {
  font-weight: bold;
  color: #1f2937;
}
.cell-dual-contact {
  font-size: 0.9rem;
  line-height: 1.4;
}
.status-badge {
  font-weight: bold;
  text-align: center;
  padding: 4px 10px;
  border-radius: 8px;
  background: #ddd;
}
.status-badge.active {
  background: #34d399;
  color: white;
}
.status-badge.pending {
  background: #facc15;
  color: #1e293b;
}
.status-badge.on-leave {
  background: #f87171;
  color: white;
}

/* Expandable Styling */
.extreme-expand-tr {
  background: #fafaf9;
}
.extreme-expand-td {
  padding: 1.5em;
  border-left: 5px solid #818cf8;
  background: #f3f4f6;
}
.bar-wrap {
  background: #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  height: 1rem;
  margin-top: 0.25rem;
  width: 10em;
}
.bar-fill {
  background: #8b5cf6;
  color: white;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  height: 100%;
}
.expand-note {
  font-style: italic;
  color: #6b7280;
}
.expand-indicator {
  font-weight: 600;
}
.dot-online {
  color: #22c55e;
}
.dot-offline {
  color: #ef4444;
}
.tag-list {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}
.tag {
  background: #c7d2fe;
  color: #1e3a8a;
  padding: 0.2em 0.6em;
  border-radius: 6px;
  font-size: 0.8rem;
}

.dark-mode .extreme-table {
  background: #1f2937;
  border-color: #6366f1;
  color: white;
}
.dark-mode .extreme-row:nth-child(odd) {
  background: #374151;
}
.dark-mode .extreme-row:nth-child(even) {
  background: #1e293b;
}
.dark-mode .extreme-expand-td {
  background: #111827;
  border-color: #818cf8;
}
</style>

<style scoped>
/* --------------------------------------------------
   Extreme Table Demo – Responsive + Full Themed
-------------------------------------------------- */

.crazy-wrapper {
  padding: 2em;
  max-width: 1100px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.crazy-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease;
  padding: 0 1rem;
}

.crazy-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #3b82f6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.crazy-description {
  font-size: 1.05rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  word-break: break-word;
}

.crazy-toggle {
  background: #3b82f6;
  color: white;
  padding: 0.5em 1.2em;
  margin-top: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.crazy-toggle:hover {
  background: #2563eb;
}

.crazy-table-container {
  border: 3px dashed #ec4899;
  background-color: #fdf4ff;
  border-radius: 1rem;
  padding: 1em;
  overflow-x: auto;
}

.table-scroll-wrapper {
  min-width: 800px;
  font-size: 0.95em;
}

/* 🎨 Slot-Based Column Styling */
.cell-avatar-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.circle-avatar {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid #8b5cf6;
}
.highlight-name {
  font-weight: 700;
  color: #1e2937;
}
.cell-dual-contact {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #374151;
}
.status-badge {
  display: inline-block;
  font-weight: bold;
  padding: 0.3em 0.8em;
  border-radius: 8px;
  font-size: 0.75rem;
  text-transform: capitalize;
  background-color: #e5e7eb;
  color: #1f2937;
}
.status-badge.active {
  background-color: #34d399;
  color: white;
}
.status-badge.pending {
  background-color: #facc15;
  color: #1e2937;
}
.status-badge.on-leave {
  background-color: #f87171;
  color: white;
}

.expand-progress .bar-wrap {
  background: #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  height: 1rem;
  width: 10em;
  margin-top: 0.25rem;
}
.expand-progress .bar-fill {
  background: #8b5cf6;
  color: white;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  height: 100%;
}
.expand-note {
  font-style: italic;
  color: #6b7280;
  margin-top: 0.5rem;
}
.expand-indicator {
  font-weight: 600;
  margin-top: 0.5rem;
}
.dot-online {
  color: #22c55e;
}
.dot-offline {
  color: #ef4444;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 0.5rem;
}
.tag {
  background: #c7d2fe;
  color: #1e3a8a;
  padding: 0.2em 0.6em;
  border-radius: 6px;
  font-size: 0.8rem;
}

.crazy-footer {
  text-align: center;
  margin-top: 2rem;
  color: #6b7280;
  font-style: italic;
  font-size: 0.95rem;
}

/* 🌙 Dark Mode */
.dark-mode .crazy-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
}
.dark-mode .crazy-description,
.dark-mode .crazy-footer {
  color: #cbd5e1;
}
.dark-mode .crazy-table-container {
  background-color: #1e293b;
  border-color: #8b5cf6;
}
.dark-mode .crazy-toggle {
  background-color: #10b981;
}
.dark-mode .crazy-toggle:hover {
  background-color: #059669;
}
.dark-mode .highlight-name {
  color: #f9fafb;
}
.dark-mode .cell-dual-contact {
  color: #cbd5e1;
}
.dark-mode .status-badge {
  background-color: #374151;
  color: #f9fafb;
}
.dark-mode .status-badge.active {
  background-color: #059669;
}
.dark-mode .status-badge.pending {
  background-color: #ca8a04;
}
.dark-mode .status-badge.on-leave {
  background-color: #dc2626;
}
.dark-mode .expand-note {
  color: #94a3b8;
}
.dark-mode .expand-progress .bar-wrap {
  background: #334155;
}
.dark-mode .bar-fill {
  background: #6366f1;
}
.dark-mode .tag {
  background-color: #312e81;
  color: #e0f2fe;
}

/* 📱 Responsive Typography & Table Font Scaling */
@media (max-width: 400px) {
  .crazy-wrapper {
    padding: 1rem 0.5rem;
  }
  .crazy-title {
    font-size: 1.2rem;
  }
  .crazy-description,
  .crazy-footer {
    font-size: 0.75rem;
  }
  .circle-avatar {
    width: 28px;
    height: 28px;
  }
  .highlight-name {
    font-size: 0.85rem;
  }
  .cell-dual-contact,
  .expand-note {
    font-size: 0.8rem;
  }
  .tag {
    font-size: 0.7rem;
  }
  .table-scroll-wrapper {

    font-size: 0.8em;
  }
}

@media (min-width: 401px) and (max-width: 639px) {
  .crazy-wrapper {
    padding: 1.25rem 0.75rem;
  }
  .crazy-title {
    font-size: 1.4rem;
  }
  .crazy-description,
  .crazy-footer {
    font-size: 0.85rem;
  }
  .table-scroll-wrapper {
    font-size: 0.85em;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .crazy-wrapper {
    padding: 1.5rem 1rem;
  }
  .crazy-title {
    font-size: 1.6rem;
  }
  .crazy-description,
  .crazy-footer {
    font-size: 0.95rem;
  }
  .table-scroll-wrapper {
    font-size: 0.85em;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .crazy-wrapper {
    padding: 2rem 1.5rem;
  }
  .table-scroll-wrapper {
    font-size: 1em;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .crazy-wrapper {
    padding: 2.5rem 2rem;
  }
}

@media (min-width: 1280px) {
  .crazy-wrapper {
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