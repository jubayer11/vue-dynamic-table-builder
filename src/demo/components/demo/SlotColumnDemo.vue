<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">🎨 Fully Customizable Columns via Named Slots</h2>
      <p class="demo-description">
        This demo showcases how developers can <strong>fully control column rendering</strong> using Vue's named slots — ideal for custom cell layouts, conditional styling, and complex compositions.
      </p>
    </div>

    <!-- Table Placeholder -->
    <div class="table-placeholder">
      <div class="dynamic-table-wrapper">
        <DynamicTable
            :myTable="myTable"
            :customStyle="tableCustomStyle"
            style="width: 100%"
        >
          <!-- Inline Column Rendering -->
          <template #specific-column="{ item, colIndex, id }">
            <template v-if="colIndex === 0">
              <div class="user-cell">
                <img :src="item[1]" alt="avatar" class="user-avatar" />
                <span class="user-name">{{ item[0] }}</span>
              </div>
            </template>

            <template v-else-if="colIndex === 1">
              <span class="user-role">{{ item }}</span>
            </template>

            <template v-else-if="colIndex === 2">
            <span :class="['status-badge', item]">
              {{ item }}
            </span>
            </template>
          </template>

          <!-- Expandable Column Rendering -->
          <template #expandable-specific-column="{ item, colIndex, id }">
            <div class="expand-item">
              <template v-if="colIndex === 3">

                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: item + '%' }">{{ item }}</div>
                </div>
              </template>

              <template v-else-if="colIndex === 4">

                <p class="expand-notes">{{ item }}</p>
              </template>

              <template v-else-if="colIndex === 5">
              <span :class="item ? 'online-dot' : 'offline-dot'">
                {{ item ? 'Online' : 'Offline' }}
              </span>
              </template>

              <template v-else-if="colIndex === 6">

                <div class="tag-list">
                  <span class="tag" v-for="(tag, i) in item" :key="i">{{ tag }}</span>
                </div>
              </template>
            </div>
          </template>
        </DynamicTable>
      </div>

    </div>

    <!-- Description -->
    <p class="demo-footer-description">
      Use <code>#specific-column</code> and <code>#expandable-specific-column</code> to inject any structure or logic directly into cells. These slots expose <code>item</code>, <code>colIndex</code>, and <code>id</code> — giving you total creative control.
    </p>
  </div>
</template>

<script setup>
/**
 * @component CustomSlotColumnDemo
 * @description
 * This demo showcases a fully customizable dynamic table using Vue 3's `<script setup>` and named slots.
 * Each column (including expandable rows) is defined via configuration and rendered using slot templates.
 *
 * Key Features:
 * - Named slots for custom rendering: #specific-column and #expandable-specific-column.
 * - Full control over structure, logic, and styling per column.
 * - Responsive design and dark mode support.
 *
 * TableConfig:
 * - Defines headers, row data, total columns, and id index.
 * - `updateSpecificColumnIndexPropertyArray` enables specific slot rendering by column index.
 *
 * TableStyleConfig:
 * - Reserved for applying per-cell or row styles (currently unused, but reactive and available).
 *
 * ResponsiveColumnConfig:
 * - Initial visible column count is set to 3 but can be extended via config.
 *
 * Data Format:
 * - Each row includes nested and flat values: [ [name, avatar], role, status, performance, notes, isOnline, tags, id ]
 *
 * Intended Use:
 * - Ideal for demos, admin dashboards, and systems that require visual flexibility in table cells.
 */

import { computed, reactive, ref } from 'vue';
import DynamicTable from '@/components/index.vue';
import { TableConfig, TableStyleConfig, ResponsiveColumnConfig } from '@';

const headers = ref([
  'Name',
  'Role',
  'Status',
  'Performance',
  'Notes',
  'Activity',
  'Tags',
]);

const items = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'Frontend Engineer',
    status: 'active',
    performance: 92,
    notes: 'Recently promoted. Works on UI library.',
    isOnline: true,
    tags: ['Vue', 'Tailwind', 'Accessibility']
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'Backend Developer',
    status: 'on-leave',
    performance: 68,
    notes: 'Currently on medical leave.',
    isOnline: false,
    tags: ['Laravel', 'Redis']
  },
  {
    id: 3,
    name: 'Carol Lee',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    role: 'Product Manager',
    status: 'pending-verification',
    performance: 45,
    notes: 'Pending internal account verification. Joined recently.',
    isOnline: false,
    tags: ['Agile', 'Jira', 'Stakeholder']
  }
]);

const arrayOfTableData = computed(() => {
  return items.value.map((obj) => {
    return [
      [obj.name, obj.avatar],
      obj.role,
      obj.status,
      obj.performance,
      obj.notes,
      obj.isOnline,
      obj.tags,
      obj.id
    ];
  });
});

const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();
const dataShow = new ResponsiveColumnConfig(3);

customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updateIdIndex(7);
customTable.updateTotalColumn(7);
customTable.updateDataShow(dataShow);
customTable.updateSpecificColumnIndexPropertyArray([0,1,2,3,4,5,6]);

const myTable = computed(() => customTable);
const tableCustomStyle = computed(() => customStyle);
</script>

<style scoped>
/* --------------------------------------------------
   Custom Slot Column Demo – Responsive + Themed
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
  margin-bottom: 2rem;
  animation: fadeInDown 0.5s ease;
  padding: 0 1rem;
}

.demo-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.8rem;
  word-break: break-word;
}

.demo-description,
.demo-footer-description {
  font-size: 1.05rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  word-break: break-word;
  text-align: center;
}

.table-placeholder {
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f8fafc;
  padding: 1em;
  margin-bottom: 2rem;
  overflow-x: auto;
}

/* Specific Column Styling */
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  object-fit: cover;
}
.user-name {
  font-weight: 600;
  color: #1e293b;
}
.user-role {
  font-size: 0.95em;
  font-weight: 500;
  color: #475569;
}
.status-badge {
  padding: 0.2em 0.6em;
  font-size: 0.8em;
  border-radius: 0.5em;
  font-weight: 600;
  text-transform: capitalize;
}
.status-badge.active {
  background: #d1fae5;
  color: #047857;
}
.status-badge.on-leave {
  background: #fef3c7;
  color: #b45309;
}
.status-badge.pending-verification {
  background: #fee2e2;
  color: #b91c1c;
}

/* Expandable Columns */
.expand-item {
  padding: 0.75em 0;
  border-top: 1px solid #e2e8f0;
}
.expand-notes {
  font-style: italic;
  color: #475569;
}
.progress-bar {
  background: #e2e8f0;
  border-radius: 1em;
  overflow: hidden;
  height: 1em;
  width: 10em;
  margin-top: 0.25em;
}
.progress-fill {
  background: #3b82f6;
  color: white;
  text-align: center;
  font-size: 0.75em;
  line-height: 1em;
  height: 100%;
}

.online-dot,
.offline-dot {
  display: inline-block;
  font-size: 0.85em;
  font-weight: 600;
}
.online-dot::before {
  content: '●';
  color: #10b981;
  margin-right: 0.4em;
}
.offline-dot::before {
  content: '●';
  color: #ef4444;
  margin-right: 0.4em;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}
.tag {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.25em 0.6em;
  font-size: 0.75em;
  border-radius: 0.5em;
}

/* 🌙 Dark Mode */
.dark-mode .demo-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.05);
}
.dark-mode .demo-description,
.dark-mode .demo-footer-description {
  color: #94a3b8;
}
.dark-mode .table-placeholder {
  background-color: #1f2937;
  border-color: #334155;
}
.dark-mode .user-name {
  color: #f9fafb;
}
.dark-mode .user-role {
  color: #cbd5e1;
}
.dark-mode .expand-notes {
  color: #94a3b8;
}
.dark-mode .expand-item {
  border-color: #334155;
}
.dark-mode .progress-bar {
  background: #334155;
}
.dark-mode .tag {
  background-color: #1e40af;
  color: #e0f2fe;
}

/* 🔁 Responsive Breakpoints */
@media (max-width: 400px) {
  .demo-wrapper {
    padding: 1rem 0.5rem;
  }
  .demo-title {
    font-size: 1rem;
  }
  .demo-description,
  .demo-footer-description {
    font-size: 0.75rem;
  }
  .user-avatar {
    width: 28px;
    height: 28px;
  }
  .user-name,
  .user-role {
    font-size: 0.75rem;
  }
  .status-badge {
    font-size: 0.7rem;
  }

  .dynamic-table-wrapper {
    font-size: 0.9rem;
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
  .demo-footer-description {
    font-size: 0.85rem;
  }
  .user-name,
  .user-role {
    font-size: 0.8em;
  }
  .status-badge {
    font-size: 0.75em;
  }
  .dynamic-table-wrapper {
    font-size: 0.8em;

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
  .demo-footer-description {
    font-size: 0.95rem;
  }
  .user-name,
  .user-role {
    font-size: 1em;
  }
  .status-badge {
    font-size: 0.8em;
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
