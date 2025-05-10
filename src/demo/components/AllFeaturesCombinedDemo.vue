<template>
  <div class="demo-wrapper">
    <!-- Section Header -->
    <div class="section-heading">
      <h2 class="demo-title">🚀 All Features Combined (Showcase)</h2>
      <p class="demo-description">
        This advanced showcase demonstrates <strong>every major feature</strong> of the Vue Dynamic Table Builder — including numbered pagination and load more modes, per-page selector, column responsiveness, expandable rows, slot rendering, progress indicators, smart status, online badges, dialog popups, and tag previews.
        Resize your window or use the column control below to see how column visibility adapts.
      </p>
    </div>

    <!-- Responsive Column Controls -->
    <div class="breakpoint-controls">
      <span class="control-label">🖥️ Simulate column view:</span>
      <button
          v-for="(bp, key) in columnDisplayOptions"
          :key="key"
          @click="updateColumnsByBreakpoint(bp.columns)"
          class="bp-button"
      >
        {{ bp.label }} ({{ bp.columns }} cols)
      </button>
    </div>

    <!-- Mode Toggle -->
    <div class="mode-toggle">
      <button :class="{ active: mode === 'pagination' }" @click="mode = 'pagination'">
        Numbered Pagination
      </button>
      <button :class="{ active: mode === 'loadMore' }" @click="mode = 'loadMore'">
        Load More
      </button>
    </div>

    <!-- Full Table Display -->
    <div class="table-placeholder">
      <DynamicTable
          :myTable="myTable"
          :customStyle="customTableStyle"
          :onActionClick="handleActionClick"
          :onSelectItemChange="handleSelectItemChange"
          :onSelectorChange="handleSelectorChange"
          :onPaginate="handlePagination"
          :onSortingChange="handleSortingChange"
          style="width: 100%"
      >
        <!-- Slot: Main Table Cell Rendering -->
        <template #specific-column="{ item, colIndex, id }">
          <template v-if="colIndex === 0">
            <div class="user-cell">
              <img :src="item[1]" alt="avatar" class="user-avatar" />
              <span class="user-name">{{ item[0] }}</span>
            </div>
          </template>
          <template v-else-if="colIndex === 3">
            <span :class="['status-badge', item.toLowerCase()]">{{ item }}</span>
          </template>
          <template v-else-if="colIndex === 4">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: item }">
                {{ item }}
              </div>
            </div>
          </template>
          <template v-else-if="colIndex === 5">
            <button class="expand-button" @click="showNoteDialog(item)">📝 View Note</button>
          </template>
          <template v-else-if="colIndex === 6">
            <span :class="item ? 'online-dot' : 'offline-dot'">
              {{ item ? 'Online' : 'Offline' }}
            </span>
          </template>
          <template v-else-if="colIndex === 7">
            <div class="tag-icon-wrapper" @click="toggleTagDialog(id)">
              <IconList />
              <div v-if="tagDialogId === id" class="tag-dialog">
                <div class="caret-up"></div>
                <ul class="tag-dialog-list">
                  <li v-for="(tag, i) in item" :key="i" class="tag">{{ tag }}</li>
                </ul>
              </div>
            </div>
          </template>
        </template>

        <!-- Slot: Expandable Row Rendering -->
        <template #expandable-specific-column="{ item, colIndex }">
          <div class="expand-item">
            <template v-if="colIndex === 3">
              <span :class="['status-badge', item.toLowerCase()]">{{ item }}</span>
            </template>
            <template v-else-if="colIndex === 4">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: item }">{{ item }}</div>
              </div>
            </template>
            <template v-else-if="colIndex === 5">
              <p class="expand-notes">{{ item }}</p>
            </template>
            <template v-else-if="colIndex === 6">
              <span :class="item ? 'online-dot' : 'offline-dot'">
                {{ item ? 'Online' : 'Offline' }}
              </span>
            </template>
            <template v-else-if="colIndex === 7">
              <div class="tag-list">
                <span v-for="(tag, i) in item" :key="i" class="tag">{{ tag }}</span>
              </div>
            </template>
          </div>
        </template>
      </DynamicTable>

      <!-- All Dialogs -->
      <dialog v-if="dialogVisible" class="expand-dialog" open>
        <h3 class="dialog-title">🗒️ Note Detail</h3>
        <p class="dialog-content">{{ selectedNote }}</p>
        <div class="dialog-actions">
          <button class="dialog-close" @click="dialogVisible = false">Close</button>
        </div>
      </dialog>

      <AllFeatureActionDialog
          class="expand-dialog"
          v-if="showDialog"
          :user="activeUser"
          @close="closeActionDialog"
          @save="handleSave"
          @confirm="handleConfirm"
      />

      <dialog v-if="showSelected" class="selected-dialog" open>
        <h3>✅ Selected Team Members</h3>
        <div v-if="selectedItems.length === 0" class="empty-message">
          No users selected.
        </div>
        <ul v-else class="user-list">
          <li v-for="(item, index) in selectedItems" :key="item.id" class="user-card">
            <img :src="item.avatar" class="avatar" alt="avatar" />
            <div class="info">
              <h4>{{ item.name }} <span class="role">({{ item.role }})</span></h4>
              <p><strong>Email:</strong> {{ item.email }}</p>
              <p><strong>Phone:</strong> {{ item.phone }}</p>
              <p><strong>Status:</strong> {{ item.status }}</p>
              <p><strong>Performance:</strong> {{ item.performance }}%</p>
              <p><strong>Online:</strong> {{ item.online ? '✅ Online' : '❌ Offline' }}</p>
              <p><strong>Notes:</strong> {{ item.notes }}</p>
              <p><strong>Tags:</strong>
                <span v-for="(tag, i) in item.tags" :key="i" class="tag">{{ tag }}</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="dialog-actions">
          <button class="btn-close" @click="showSelected = false">Close</button>
        </div>
      </dialog>
    </div>

    <!-- Reset + Selection Buttons -->
    <div class="below-action">
      <div class="demo-controls">
        <button class="btn-reset" @click="loadInitialData">🔄 Reset Users</button>
      </div>
      <div class="action-buttons">
        <button class="btn-show-selected" @click="showSelected = true" :disabled="selectedItems.length === 0">
          📋 Show Selected Items
        </button>
      </div>
    </div>

    <!-- Footer Note -->
    <p class="demo-footer-description">
      Every piece of this demo — including slot composition, column toggles, icon injection, smart dialog handling, and responsive behaviors — is built using <code>TableConfig</code>, <code>TableStyleConfig</code>, and <code>ResponsiveColumnConfig</code>. <br />Try adjusting the screen size or using the simulated breakpoints above.
    </p>
  </div>
</template>

<!-- The rest of your <script setup> and <style scoped> remains unchanged -->



<script setup>
import { computed, reactive, ref, watch } from 'vue';
import DynamicTable from '@/components/index.vue';
import IconList from '@/components/Icon/iconList.vue';
import AllFeatureActionDialog from '@demo/components/dialog/AllFeatureActionDialog.vue';

import {
  TableConfig,
  TableStyleConfig,
  ResponsiveColumnConfig,
  ViewActionIcon,
  EditActionIcon,
  DestroyActionIcon,
  dialog,
  dialogValue
} from '@';

import {
  breakPointsValue,
  popUpOrRoute
} from '@/utils/customizableTable.js';

import { IconInlineActivityType } from '@/utils/ActionActivityType.js';





// ─────────────────────────────────────────────
// Refs and Reactives
// ─────────────────────────────────────────────
const allItems = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'alice.j@example.com',
    phone: '+8801711111111',
    role: 'Frontend Developer',
    status: 'active',
    performance: 93,
    notes: 'Works on design system and component library.',
    online: true,
    tags: ['Vue', 'Tailwind', 'Figma']
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'bob.s@example.com',
    phone: '+8801711223344',
    role: 'Backend Developer',
    status: 'on-leave',
    performance: 65,
    notes: 'Currently on paternity leave.',
    online: false,
    tags: ['Laravel', 'Redis', 'MySQL']
  },
  {
    id: 3,
    name: 'Carol Lee',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'carol.l@example.com',
    phone: '+8801711555666',
    role: 'Project Manager',
    status: 'pending',
    performance: 50,
    notes: 'Joining full-time next month.',
    online: false,
    tags: ['Agile', 'Jira', 'Scrum']
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    email: 'david.k@example.com',
    phone: '+8801788888888',
    role: 'QA Engineer',
    status: 'active',
    performance: 87,
    notes: 'Recently automated 300+ test cases.',
    online: true,
    tags: ['Cypress', 'Vitest', 'Postman']
  },
  {
    id: 5,
    name: 'Eve Torres',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    email: 'eve.t@example.com',
    phone: '+8801799999999',
    role: 'UI Designer',
    status: 'active',
    performance: 90,
    notes: 'Leads Figma UI/UX delivery.',
    online: true,
    tags: ['Figma', 'Illustrator', 'UX']
  },
  {
    id: 6,
    name: 'Frank Delaney',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    email: 'frank.d@example.com',
    phone: '+8801700000000',
    role: 'DevOps Engineer',
    status: 'active',
    performance: 77,
    notes: 'Manages AWS and CI/CD pipelines.',
    online: false,
    tags: ['AWS', 'Docker', 'GitHub Actions']
  },
  {
    id: 7,
    name: 'Grace Park',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    email: 'grace.p@example.com',
    phone: '+8801777777777',
    role: 'Content Strategist',
    status: 'active',
    performance: 82,
    notes: 'Owns blog, email copy, and UX docs.',
    online: true,
    tags: ['Contentful', 'Notion', 'SEO']
  },
  {
    id: 8,
    name: 'Hank Green',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    email: 'hank.g@example.com',
    phone: '+8801765432109',
    role: 'Fullstack Developer',
    status: 'active',
    performance: 88,
    notes: 'Strong in both Vue and Laravel.',
    online: true,
    tags: ['Vue', 'Laravel', 'TypeScript']
  },
  {
    id: 9,
    name: 'Ivy Chen',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    email: 'ivy.c@example.com',
    phone: '+8801767890123',
    role: 'HR Manager',
    status: 'active',
    performance: 70,
    notes: 'Handles onboarding and compliance.',
    online: false,
    tags: ['People Ops', 'Culture']
  },
  {
    id: 10,
    name: 'Jack Roy',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    email: 'jack.r@example.com',
    phone: '+8801787654321',
    role: 'Security Analyst',
    status: 'active',
    performance: 83,
    notes: 'Pen-tests and implements security policies.',
    online: true,
    tags: ['OWASP', 'Cloudflare', 'IAM']
  },

  // 10 more for pagination testing
  {
    id: 11,
    name: 'Karen Zhang',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    email: 'karen.z@example.com',
    phone: '+8801733333333',
    role: 'SRE',
    status: 'active',
    performance: 75,
    notes: 'Uptime, monitoring, alerts.',
    online: true,
    tags: ['Prometheus', 'Grafana']
  },
  {
    id: 12,
    name: 'Leo Nakamura',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    email: 'leo.n@example.com',
    phone: '+8801712345678',
    role: 'Tech Lead',
    status: 'active',
    performance: 95,
    notes: 'Architecture, mentoring, code reviews.',
    online: true,
    tags: ['Leadership', 'Vue 3', 'SOLID']
  },
  {
    id: 13,
    name: 'Mona Patel',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    email: 'mona.p@example.com',
    phone: '+8801722222222',
    role: 'Data Scientist',
    status: 'active',
    performance: 89,
    notes: 'ML model building + dashboarding.',
    online: true,
    tags: ['Python', 'Jupyter', 'Pandas']
  },
  {
    id: 14,
    name: 'Nathan Brooks',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    email: 'nathan.b@example.com',
    phone: '+8801755555555',
    role: 'iOS Developer',
    status: 'pending',
    performance: 68,
    notes: 'Working on onboarding flow.',
    online: false,
    tags: ['Swift', 'Xcode', 'UIKit']
  },
  {
    id: 15,
    name: 'Olivia Miles',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    email: 'olivia.m@example.com',
    phone: '+8801712121212',
    role: 'Recruiter',
    status: 'active',
    performance: 80,
    notes: 'Fills technical roles fast.',
    online: true,
    tags: ['LinkedIn', 'ATS']
  },
  {
    id: 16,
    name: 'Paul Singh',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    email: 'paul.s@example.com',
    phone: '+8801793939393',
    role: 'Legal Counsel',
    status: 'active',
    performance: 72,
    notes: 'Handles contracts and compliance.',
    online: false,
    tags: ['GDPR', 'Privacy', 'Terms']
  },
  {
    id: 17,
    name: 'Queenie Gomez',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    email: 'queenie.g@example.com',
    phone: '+8801766666666',
    role: 'Community Manager',
    status: 'active',
    performance: 78,
    notes: 'Runs Discord + Twitter outreach.',
    online: true,
    tags: ['Social', 'Moderation']
  },
  {
    id: 18,
    name: 'Ryan Blake',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    email: 'ryan.b@example.com',
    phone: '+8801744444444',
    role: 'Fullstack Dev',
    status: 'active',
    performance: 81,
    notes: 'Recently built the payment module.',
    online: true,
    tags: ['Vue', 'Node.js', 'Stripe']
  },
  {
    id: 19,
    name: 'Sophia Li',
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    email: 'sophia.l@example.com',
    phone: '+8801751515151',
    role: 'Support Engineer',
    status: 'on-leave',
    performance: 66,
    notes: 'Returning in June.',
    online: false,
    tags: ['Zendesk', 'Docs']
  },
  {
    id: 20,
    name: 'Tom Chen',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    email: 'tom.c@example.com',
    phone: '+8801781818181',
    role: 'Intern',
    status: 'pending',
    performance: 61,
    notes: 'Training ongoing.',
    online: false,
    tags: ['HTML', 'CSS']
  }
]);

const initialUserData = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'alice.j@example.com',
    phone: '+8801711111111',
    role: 'Frontend Developer',
    status: 'active',
    performance: 93,
    notes: 'Works on design system and component library.',
    online: true,
    tags: ['Vue', 'Tailwind', 'Figma']
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'bob.s@example.com',
    phone: '+8801711223344',
    role: 'Backend Developer',
    status: 'on-leave',
    performance: 65,
    notes: 'Currently on paternity leave.',
    online: false,
    tags: ['Laravel', 'Redis', 'MySQL']
  },
  {
    id: 3,
    name: 'Carol Lee',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'carol.l@example.com',
    phone: '+8801711555666',
    role: 'Project Manager',
    status: 'pending',
    performance: 50,
    notes: 'Joining full-time next month.',
    online: false,
    tags: ['Agile', 'Jira', 'Scrum']
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    email: 'david.k@example.com',
    phone: '+8801788888888',
    role: 'QA Engineer',
    status: 'active',
    performance: 87,
    notes: 'Recently automated 300+ test cases.',
    online: true,
    tags: ['Cypress', 'Vitest', 'Postman']
  },
  {
    id: 5,
    name: 'Eve Torres',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    email: 'eve.t@example.com',
    phone: '+8801799999999',
    role: 'UI Designer',
    status: 'active',
    performance: 90,
    notes: 'Leads Figma UI/UX delivery.',
    online: true,
    tags: ['Figma', 'Illustrator', 'UX']
  },
  {
    id: 6,
    name: 'Frank Delaney',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    email: 'frank.d@example.com',
    phone: '+8801700000000',
    role: 'DevOps Engineer',
    status: 'active',
    performance: 77,
    notes: 'Manages AWS and CI/CD pipelines.',
    online: false,
    tags: ['AWS', 'Docker', 'GitHub Actions']
  },
  {
    id: 7,
    name: 'Grace Park',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    email: 'grace.p@example.com',
    phone: '+8801777777777',
    role: 'Content Strategist',
    status: 'active',
    performance: 82,
    notes: 'Owns blog, email copy, and UX docs.',
    online: true,
    tags: ['Contentful', 'Notion', 'SEO']
  },
  {
    id: 8,
    name: 'Hank Green',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    email: 'hank.g@example.com',
    phone: '+8801765432109',
    role: 'Fullstack Developer',
    status: 'active',
    performance: 88,
    notes: 'Strong in both Vue and Laravel.',
    online: true,
    tags: ['Vue', 'Laravel', 'TypeScript']
  },
  {
    id: 9,
    name: 'Ivy Chen',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    email: 'ivy.c@example.com',
    phone: '+8801767890123',
    role: 'HR Manager',
    status: 'active',
    performance: 70,
    notes: 'Handles onboarding and compliance.',
    online: false,
    tags: ['People Ops', 'Culture']
  },
  {
    id: 10,
    name: 'Jack Roy',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    email: 'jack.r@example.com',
    phone: '+8801787654321',
    role: 'Security Analyst',
    status: 'active',
    performance: 83,
    notes: 'Pen-tests and implements security policies.',
    online: true,
    tags: ['OWASP', 'Cloudflare', 'IAM']
  },

  // 10 more for pagination testing
  {
    id: 11,
    name: 'Karen Zhang',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    email: 'karen.z@example.com',
    phone: '+8801733333333',
    role: 'SRE',
    status: 'active',
    performance: 75,
    notes: 'Uptime, monitoring, alerts.',
    online: true,
    tags: ['Prometheus', 'Grafana']
  },
  {
    id: 12,
    name: 'Leo Nakamura',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    email: 'leo.n@example.com',
    phone: '+8801712345678',
    role: 'Tech Lead',
    status: 'active',
    performance: 95,
    notes: 'Architecture, mentoring, code reviews.',
    online: true,
    tags: ['Leadership', 'Vue 3', 'SOLID']
  },
  {
    id: 13,
    name: 'Mona Patel',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    email: 'mona.p@example.com',
    phone: '+8801722222222',
    role: 'Data Scientist',
    status: 'active',
    performance: 89,
    notes: 'ML model building + dashboarding.',
    online: true,
    tags: ['Python', 'Jupyter', 'Pandas']
  },
  {
    id: 14,
    name: 'Nathan Brooks',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    email: 'nathan.b@example.com',
    phone: '+8801755555555',
    role: 'iOS Developer',
    status: 'pending',
    performance: 68,
    notes: 'Working on onboarding flow.',
    online: false,
    tags: ['Swift', 'Xcode', 'UIKit']
  },
  {
    id: 15,
    name: 'Olivia Miles',
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    email: 'olivia.m@example.com',
    phone: '+8801712121212',
    role: 'Recruiter',
    status: 'active',
    performance: 80,
    notes: 'Fills technical roles fast.',
    online: true,
    tags: ['LinkedIn', 'ATS']
  },
  {
    id: 16,
    name: 'Paul Singh',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    email: 'paul.s@example.com',
    phone: '+8801793939393',
    role: 'Legal Counsel',
    status: 'active',
    performance: 72,
    notes: 'Handles contracts and compliance.',
    online: false,
    tags: ['GDPR', 'Privacy', 'Terms']
  },
  {
    id: 17,
    name: 'Queenie Gomez',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    email: 'queenie.g@example.com',
    phone: '+8801766666666',
    role: 'Community Manager',
    status: 'active',
    performance: 78,
    notes: 'Runs Discord + Twitter outreach.',
    online: true,
    tags: ['Social', 'Moderation']
  },
  {
    id: 18,
    name: 'Ryan Blake',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    email: 'ryan.b@example.com',
    phone: '+8801744444444',
    role: 'Fullstack Dev',
    status: 'active',
    performance: 81,
    notes: 'Recently built the payment module.',
    online: true,
    tags: ['Vue', 'Node.js', 'Stripe']
  },
  {
    id: 19,
    name: 'Sophia Li',
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    email: 'sophia.l@example.com',
    phone: '+8801751515151',
    role: 'Support Engineer',
    status: 'on-leave',
    performance: 66,
    notes: 'Returning in June.',
    online: false,
    tags: ['Zendesk', 'Docs']
  },
  {
    id: 20,
    name: 'Tom Chen',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    email: 'tom.c@example.com',
    phone: '+8801781818181',
    role: 'Intern',
    status: 'pending',
    performance: 61,
    notes: 'Training ongoing.',
    online: false,
    tags: ['HTML', 'CSS']
  }
];
const items = ref([]);
const perPage = ref(5);
const page = ref(1);
const showDialog = ref(false);
const activeUser = ref(null);
const dialogVisible = ref(false);
const selectedNote = ref('');
const tagDialogId = ref(null);
const showSelected = ref(false);
const mode = ref('pagination');

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

// ─────────────────────────────────────────────
// Table Configurations
// ─────────────────────────────────────────────
const headers = ref([
  'Name & Avatar',
  'Contact',
  'Role',
  'Status',
  'Performance',
  'Notes',
  'Online',
  'Tags',
  'Actions'
]);

const customTable = reactive(new TableConfig());
const customStyle = new TableStyleConfig();
const dataShow = new ResponsiveColumnConfig(9);
const iconType = new IconInlineActivityType();

// Action Icons
const viewIcon = new ViewActionIcon();
const editIcon = new EditActionIcon();
const destroyIcon = new DestroyActionIcon();

viewIcon.updatePopUpOrRoute(popUpOrRoute.route, '/view/all-feature/action');
editIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'editDialog');
destroyIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'confirmDialog');

viewIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--view');
viewIcon.updateStyleClasses('icon', 'icon-svg');
viewIcon.updateStyleClasses('path', ['icon-fill--success']);

editIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--edit');
editIcon.updateStyleClasses('icon', 'icon-svg');
editIcon.updateStyleClasses('path', ['icon-fill--warning']);

destroyIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--delete');
destroyIcon.updateStyleClasses('icon', 'icon-svg');
destroyIcon.updateStyleClasses('path', ['icon-fill--error']);

// Column Breakpoints
dataShow.setColumnByBreakPointsArray(breakPointsValue.xxsm,0);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xsm,2);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xm,4);
dataShow.setColumnByBreakPointsArray(breakPointsValue.sm,4);
dataShow.setColumnByBreakPointsArray(breakPointsValue.md,6);
dataShow.setColumnByBreakPointsArray(breakPointsValue.lg,8);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xl,9);



// Table Setup
customTable.updateHeaders(headers.value);
customTable.updateIdIndex(8);
customTable.updateTotalColumn(8);
customTable.updateDataShow(dataShow);
customTable.updateItemPerPage();
customTable.updateItemPerPageValue(perPage.value);
customTable.updateSelectShow();
customTable.updateIsSerialNoShow();
customTable.updateMultipleColumns([1]);
customTable.updateSpecificColumnIndexPropertyArray([0, 3, 4, 5, 6, 7]);
customTable.updateSortingColumnIndexWithoutStyleByProperty([0, 1, 2, 3, 4, 5, 6, 7]);
customTable.updateActionColumnIndexProperty(8, iconType, [viewIcon, editIcon, destroyIcon]);

// Style Config Setup
customStyle.updateMain('all-table');
customStyle.updateBodyTr('all-row');
customStyle.updateBodyTd('all-td');
customStyle.updateHeadTr('all-header');
customStyle.updateExpandColumnTr('all-expand-row');
customStyle.updateExpandColumnTd('all-expand-td');
customStyle.updateExpandColumnHeader('all-expand-header');
customStyle.updateExpandColumnData('all-expand-data');
customStyle.updatePagination('wrapper', 'all-pagination-wrapper');
customStyle.updatePagination('container', 'all-pagination-container');
customStyle.updateItemPerPage('wrapper', 'all-item-selector');

// ─────────────────────────────────────────────
// Computed
// ─────────────────────────────────────────────
const arrayOfTableData = computed(() => items.value.map(user => [
  [user.name, user.avatar],
  [user.email, user.phone],
  user.role,
  user.status,
  user.performance + '%',
  user.notes,
  user.online,
  user.tags,
  user.id
]));

const pagination = computed(() => {
  const total = allItems.value.length;
  const startIndex = (page.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, total);
  return {
    links: {
      first: `?page=1`,
      last: `?page=${Math.ceil(total / perPage.value)}`,
      prev: page.value > 1 ? `?page=${page.value - 1}` : null,
      next: page.value < Math.ceil(total / perPage.value) ? `?page=${page.value + 1}` : null
    },
    meta: {
      current_page: page.value,
      from: startIndex + 1,
      to: endIndex,
      last_page: Math.ceil(total / perPage.value),
      per_page: perPage.value,
      total: total
    }
  };
});

const selectedItems = computed(() => customTable.selectedItem.ids.map(id => items.value.find(item => item.id === id)).filter(Boolean));

const myTable = computed(() => customTable);
const customTableStyle = computed(() => customStyle);

// ─────────────────────────────────────────────
// Methods
// ─────────────────────────────────────────────
const toggleTagDialog = (id) => tagDialogId.value = tagDialogId.value === id ? null : id;

const closeActionDialog = () => {
  showDialog.value = false;
  dialog.value = {};
  dialogValue.value = '';
};

const showNoteDialog = (note) => {
  selectedNote.value = note;
  dialogVisible.value = true;
};

const handleSave = (updatedData) => {
  const index = items.value.findIndex(u => u.id === updatedData.id);
  if (index !== -1) items.value[index] = { ...updatedData };
  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
  closeActionDialog();
};

const handleConfirm = (id) => {
  items.value = items.value.filter(u => u.id !== id);
  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
  closeActionDialog();
};

const loadInitialData = () => {
  allItems.value = JSON.parse(JSON.stringify(initialUserData));
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  items.value = allItems.value.slice(start, end);
  customTable.updateData(arrayOfTableData.value);
};

const updateColumnsByBreakpoint = (value) => {
  const config = new ResponsiveColumnConfig(value);
  customTable.updateDataShow(config);
};

const handleSelectorChange = async (newPerPage) => {
  perPage.value = newPerPage;
  page.value = 1;
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  items.value = allItems.value.slice(start, end);
  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
};

const handlePagination = async (currentPage) => {
  if (mode.value === 'pagination') {
    if (currentPage === page.value) return;
    page.value = currentPage;
    const start = (page.value - 1) * perPage.value;
    const end = start + perPage.value;
    items.value = allItems.value.slice(start, end);
  } else {
    const totalPages = Math.ceil(allItems.value.length / perPage.value);
    if (page.value < totalPages) {
      page.value++;
      const end = page.value * perPage.value;
      items.value = allItems.value.slice(0, end);
    }
  }
  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
};

const handleSortingChange = async (index, isAsc) => {
  const keyMap = ['name', 'email', 'role', 'status', 'performance', 'notes', 'online', 'tags'];
  const key = keyMap[index];
  allItems.value.sort((a, b) => {
    const valA = Array.isArray(a[key]) ? a[key].join(', ') : a[key]?.toString().toLowerCase();
    const valB = Array.isArray(b[key]) ? b[key].join(', ') : b[key]?.toString().toLowerCase();
    return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });
  page.value = 1;
  const start = 0;
  const end = perPage.value;
  items.value = allItems.value.slice(start, end);
  customTable.updateData(arrayOfTableData.value);
  customTable.updatePaginationData(pagination.value);
};

const handleSelectItemChange = async (id, index, isChecked) => {
  customTable.updateCheckBox(id, index, isChecked);
};

const handleActionClick = async (item, id) => {
  const user = items.value.find(u => u.id === id);
  if (!user) return;
  activeUser.value = user;
  setTimeout(() => {
    if (item.popUpOrRoute.isPopUpOrRoute !== popUpOrRoute.route) {
      showDialog.value = true;
    }
  }, 0);
  return true;
};

// Close tag dropdown on outside click
window.addEventListener('click', (e) => {
  if (!e.target.closest('.tag-icon-wrapper')) {
    tagDialogId.value = null;
  }
});

// ─────────────────────────────────────────────
// Watchers
// ─────────────────────────────────────────────

watch(
    () => [items.value,pagination.value],
    ([newItemList,newPagination]) => {
      customTable.updateData(arrayOfTableData.value);
      customTable.updatePaginationData(pagination.value);
    },
    { immediate: true }
);

watch([perPage, page], () => {
  if (mode.value === 'pagination') {
    const start = (page.value - 1) * perPage.value;
    const end = start + perPage.value;
    items.value = allItems.value.slice(start, end);
    customTable.updateData(arrayOfTableData.value);
    customTable.updatePaginationData(pagination.value);
  }
}, { immediate: true });

watch(mode, () => {
  page.value = 1;
  mode.value === 'pagination'
      ? customTable.updatePaginationNumber()
      : customTable.updatePaginationLoadMore();
});
</script>
<style scoped>



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


.selected-dialog {
  width: 90%;
  max-width: 800px;
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  color: #1f2937;
  max-height: 25em;
  overflow-y: scroll;
}

h3 {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
}

.empty-message {
  text-align: center;
  color: #64748b;
  font-style: italic;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-card {
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  background-color: #f9fafb;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid #6366f1;
}

.info h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #374151;
}
.role {
  font-size: 0.9rem;
  color: #6b7280;
}
.info p {
  margin: 0.2em 0;
  font-size: 0.95rem;
}
.tag {
  display: inline-block;
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.2em 0.6em;
  border-radius: 6px;
  font-size: 0.75rem;
  margin-right: 0.3em;
  margin-top: 0.2em;
}

.dialog-actions {
  text-align: center;
  margin-top: 1.5rem;
}
.btn-close {
  padding: 0.6em 1.5em;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
.btn-close:hover {
  background-color: #dc2626;
}

/* 🌙 Dark Mode */
.dark-mode .selected-dialog {
  background-color: #1e293b;
  color: #f9fafb;
}
.dark-mode .user-card {
  background-color: #334155;
  border-color: #475569;
}
.dark-mode .btn-close {
  background-color: #b91c1c;
}
.dark-mode .btn-close:hover {
  background-color: #991b1b;
}
.dark-mode .tag {
  background: #4f46e5;
  color: #f9fafb;
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
  position: fixed;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%); /* center horizontally and vertically */
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
.below-action {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mode-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

.demo-footer-description {
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 2rem;
  font-style: italic;
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



.tag-icon-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #4f46e5;
  padding: 0.5em 0.6em;
  background-color: #e0e0e5;
  border-radius: 500em;
}

.tag-icon {
  transition: color 0.3s ease;
}
.tag-icon-wrapper:hover .tag-icon {
  color: #6366f1;
}

.tag-dialog {
  position: absolute;
  top: 90%;
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 1rem;
  z-index: 100;
  width: 200px;
}

.tag-dialog-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-dialog-list .tag {
  display: block;
  padding: 0.3rem 0;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.tag-dialog-list .tag:last-child {
  border-bottom: none;
}

.caret-up {
  position: absolute;
  top: -8px;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #ffffff;
}


.expand-button {
  background-color: #4f46e5;
  color: white;
  padding: 0.4em 1em;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.expand-dialog {
  position: fixed;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%); /* center horizontally and vertically */
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  padding: 1.5rem;
  width: 400px;
  max-width: 90%;
  margin: 2rem auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.dialog-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.dialog-content {
  font-size: 1rem;
  color: #334155;
  margin-bottom: 1.5rem;
}

.dialog-actions {
  text-align: right;
}

.dialog-close {
  background-color: #ef4444;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}


.demo-wrapper {
  background: linear-gradient(135deg, #f0fdf4, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.04);
  max-width: 1100px;
  margin: 3rem auto;
  transition: all 0.3s ease;
}
.online-dot,
.offline-dot {
  display: inline-block;
  font-size: 0.85rem;
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
.progress-bar {
  background: #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  height: 1rem;
  margin-top: 0.25rem;
  width: 10em;
}
.progress-fill {
  background: #3b82f6;
  color: white;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  height: 100%;
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.section-heading {
  text-align: center;
  margin-bottom: 2.5rem;
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  object-fit: cover;
}


.demo-title {
  font-size: 1.9rem;
  font-weight: 800;
  background: linear-gradient(to right, #14b8a6, #6366f1, #f43f5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.demo-description,
.demo-footer-description {
  font-size: 1.05rem;
  color: #475569;
  max-width: 740px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  margin-top: 1rem;
}
.expand-notes {
  font-style: italic;
  color: #475569;
  background-color: #8ccae7;
  padding: 0.3em;
  border-radius: 10px;
}


.table-placeholder {
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  background-color: #f8fafc;
  padding: 1em;
  position: relative;
}
</style>
