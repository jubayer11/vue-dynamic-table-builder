<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">📂 Expandable Rows with Rich Content</h2>
      <p class="demo-description">
        This demo highlights how each row can expand to reveal rich structured data — great for use cases like <strong>user profiles</strong>, <strong>sub-items</strong>, or <strong>internal logs</strong>. The layout is responsive, and you can dynamically test different column visibility using the controls below.
      </p>
    </div>

    <!-- Button Controls -->
    <div class="breakpoint-controls">
      <span class="control-label">🖥️ Show columns for:</span>
      <button
          v-for="(bp, key) in columnDisplayOptions"
          :key="key"
          @click="updateColumnsByBreakpoint(bp.columns)"
          class="bp-button"
      >
        {{ bp.label }} ({{ bp.columns }} cols)
      </button>
    </div>

    <!-- Table Placeholder -->
    <div class="table-placeholder scroll-wrapper">
      <div class="scroll-inner">
        <DynamicTable
            :myTable="myTable"
            :customStyle="tableCustomStyle"
            class="expandable-table"
            style="font-size: 0.95em"
        />
      </div>
    </div>

    <!-- Bottom Note -->
    <div class="demo-note">
      You can dynamically control how many columns appear at each breakpoint. This lets you test responsive behavior in real-time using the buttons above.
    </div>
  </div>
</template>

<script setup>
/**
 * @component ExpandableRowDemo
 * @description
 * A responsive demo showcasing the Vue Dynamic Table Builder with expandable rows.
 * - Each row contains structured data, and expands to reveal extended content like notes or activities.
 * - Uses `updateExpandColumnNormalDataIdIndex` to style fields inside expanded content.
 * - Includes dynamic column visibility controls using `ResponsiveColumnConfig` and real-time buttons.
 *
 * 🔧 Ideal for: dashboards, nested data views, user detail previews, or system logs.
 * 📱 Fully responsive and dark-mode supported.
 */


import { computed, reactive, ref } from 'vue';
import DynamicTable from '@/components/index.vue';
import { TableConfig, TableStyleConfig, ResponsiveColumnConfig } from '@';

const items = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '+1 (415) 555-0198',
    department: 'Engineering',
    role: 'Frontend Developer',
    plan: 'Premium',
    status: 'Active',
    lastLogin: '2025-05-05 16:30',
    recentActivity: 'Deployed production hotfix',
    notes: 'Excellent response time in incidents.'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    phone: '+44 20 7946 0958',
    department: 'Design',
    role: 'UI/UX Lead',
    plan: 'Standard',
    status: 'Inactive',
    lastLogin: '2025-05-02 09:15',
    recentActivity: 'Updated brand color scheme',
    notes: 'Prefers Figma over Sketch.'
  },
  {
    id: 3,
    name: 'Carol Lee',
    email: 'carol.lee@example.com',
    phone: '+880 1711-234567',
    department: 'Product',
    role: 'Product Manager',
    plan: 'Enterprise',
    status: 'Active',
    lastLogin: '2025-05-04 13:45',
    recentActivity: 'Closed sprint retrospective',
    notes: 'Very collaborative in meetings.'
  }
]);

const columnDisplayOptions = {
  xxsm: { label: 'XXSM', columns: 0 },
  xsm: { label: 'XSM', columns: 2 },
  xm:  { label: 'XM', columns: 4 },
  sm:  { label: 'SM', columns: 4 },
  md:  { label: 'MD', columns: 6 },
  lg:  { label: 'LG', columns: 8 },
  xl:  { label: 'XL', columns: 9 },
  xxl: { label: 'XXL', columns: 9 }
};

const headers = ref([
  'Name',
  'Contact',
  'Department',
  'Role',
  'Plan',
  'Status',
  'Last Login',
  'Recent Activity',
  'Manager Notes'
]);

const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();

const arrayOfTableData = computed(() => {
  return items.value.map((obj) => {
    const statusClass = `table-status table-status--${obj.status.toLowerCase()}`;
    customStyle.updateTdItemIdIndex(obj.id, 5, statusClass);
    customStyle.updateExpandColumnNormalDataIdIndex('dataIdIndex', obj.id, 5, statusClass);

    return [
      obj.name,
      [obj.email, obj.phone],
      obj.department,
      obj.role,
      obj.plan,
      obj.status,
      obj.lastLogin,
      obj.recentActivity,
      obj.notes,
      obj.id
    ];
  });
});

const updateColumnsByBreakpoint = (value) => {
  const dataShow = new ResponsiveColumnConfig(value);
  customTable.updateDataShow(dataShow);
};

const dataShow = new ResponsiveColumnConfig(6);
customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updateIdIndex(9);
customTable.updateTotalColumn(9);
customTable.updateDataShow(dataShow);
customTable.updateMultipleColumns([1]);
customTable.updateIsSerialNoShow();

const myTable = computed(() => customTable);
const tableCustomStyle = computed(() => customStyle);
</script>

<style scoped>
/* --------------------------------------------------
   Expandable Row Demo – Responsive + Themed Styling
-------------------------------------------------- */

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

.section-heading {
  text-align: center;
  margin-bottom: 2.5rem;
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
}

.breakpoint-controls {
  text-align: center;
  margin-bottom: 1.5rem;
}
.control-label {
  font-weight: 600;
  margin-right: 0.5rem;
}
.bp-button {
  margin: 0.25rem;
  background-color: #e0e7ff;
  color: #1e3a8a;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.bp-button:hover {
  background-color: #c7d2fe;
}

.table-placeholder {
  padding: 1em;
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f1f5f9;
  overflow-x: auto;
}

.table-scroll-wrapper {
  overflow-x: auto;
  padding-bottom: 1rem;
}

.table-scroll-inner {
  min-width: 600px;
}
@media (min-width: 401px) {
  .table-scroll-inner {
    min-width: 700px;
  }
}
@media (min-width: 640px) {
  .table-scroll-inner {
    min-width: 800px;
  }
}
@media (min-width: 768px) {
  .table-scroll-inner {
    min-width: 960px;
  }
}
@media (min-width: 1024px) {
  .table-scroll-inner {
    min-width: 1024px;
  }
}

.expandable-table {
  font-size: 0.95em;
}

.expand-content {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  line-height: 1.5;
  color: #374151;
}

.demo-note {
  text-align: center;
  margin-top: 2rem;
  color: #4b5563;
  font-size: 0.95rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* 🌙 Dark Mode */
.dark-mode .demo-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  box-shadow: 0 20px 40px rgba(255, 255, 255, 0.05);
}
.dark-mode .demo-description,
.dark-mode .demo-note {
  color: #94a3b8;
}
.dark-mode .table-placeholder {
  background-color: #1f2937;
  border-color: #334155;
  color: #94a3b8;
}
.dark-mode .expand-content {
  background-color: #111827;
  color: #e5e7eb;
}

/* 📱 Responsive Font Scaling */
@media (max-width: 400px) {
  .demo-wrapper {
    padding: 1rem 0.5rem;
  }
  .demo-title {
    font-size: 1rem;
  }
  .demo-description,
  .demo-note {
    font-size: 0.75rem;
  }
  .expandable-table {
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
  .demo-note {
    font-size: 0.85rem;
  }
  .expandable-table {
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
  .demo-note {
    font-size: 0.95rem;
  }
  .expandable-table {
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

/* 🌀 Animation */
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
