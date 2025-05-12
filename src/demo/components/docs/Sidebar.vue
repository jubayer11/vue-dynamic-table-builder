<template>
  <aside class="sidebar">
    <div
        v-for="section in sections"
        :key="section.title"
        class="sidebar__section"
    >
      <div
          class="sidebar__title"
          :class="{ active: section.component === activeComponent }"
          @click="setActiveComponent(section.component)"
      >
        {{ section.title }}
      </div>
      <ul v-if="section.subSections">
        <li
            v-for="sub in section.subSections"
            :key="sub.id"
            class="sidebar__item"
            :class="{ active: sub.id === activeSubId && section.component === activeComponent }"
            @click="handleSubClick(section.component, sub.id)"
        >
          {{ sub.label }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const emit = defineEmits(['set-active'])

const activeComponent = ref('Introduction')
const activeSubId = ref(null)

function setActiveComponent(componentName) {
  activeComponent.value = componentName
  activeSubId.value = null
  emit('set-active', componentName)
}

function handleSubClick(componentName, subId) {
  const alreadyActive = activeComponent.value === componentName

  activeComponent.value = componentName
  activeSubId.value = subId
  emit('set-active', componentName)

  // wait for DOM render
  nextTick(() => {
    scrollTo(subId)
  })
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Sidebar structure
const sections = [
  {
    title: 'Introduction',
    component: 'Introduction',
    subSections: [
      { id: 'what', label: 'What is this package?' },
      { id: 'features', label: 'Features & use cases' },
      { id: 'demo', label: 'Live demo & GitHub' }
    ]
  },
  {
    title: 'Getting Started',
    component: 'GettingStarted',
    subSections: [
      { id: 'install', label: 'Installation' },
      { id: 'minimal', label: 'Minimal Setup' },
      { id: 'css', label: 'CSS Import' },
      { id: 'dev-setup', label: 'Local Dev Setup' }
    ]
  },
  {
    title: 'TableConfig',
    component: 'TableConfig',
    subSections: [
      { id: 'overview', label: 'Overview' },
      { id: 'headers', label: 'Headers & Data' },
      { id: 'total-columns', label: 'Total Columns' },
      { id: 'column-types', label: 'Column Types' },
      { id: 'responsive-columns', label: 'ResponsiveColumnConfig' },
      { id: 'serial-checkbox', label: 'Serial & Checkbox Columns' },
      { id: 'actions', label: 'Action Config (Icons & Buttons)' },
      { id: 'expansion', label: 'Expandable Rows' }
    ]
  },
  {
    title: 'TableStyleConfig',
    component: 'TableStyleConfig',
    subSections: [
      { id: 'overview', label: 'Overview' },
      { id: 'default-style', label: 'Default Style Structure' },
      { id: 'per-index', label: 'Index-Based Styling' },
      { id: 'per-id', label: 'ID-Based Styling' },
      { id: 'update-methods', label: 'Using update() Methods' }
    ]
  },
  {
    title: 'Pagination',
    component: 'Pagination',
    subSections: [
      { id: 'modes', label: 'Modes: Numbered vs Load More' },
      { id: 'events', label: 'Pagination Events' },
      { id: 'styling', label: 'Styling Pagination' }
    ]
  },
  {
    title: 'Action System',
    component: 'Actions',
    subSections: [
      { id: 'overview', label: 'Overview' },
      { id: 'icon-vs-button', label: 'Icon vs Button' },
      { id: 'popup-vs-route', label: 'Popup vs Route' },
      { id: 'activity-types', label: 'ActionActivityType' },
      { id: 'custom-icons', label: 'Using Custom Icons' },
      { id: 'smart-logic', label: 'Advanced Use (Smart Logic)' },
      { id: 'dialogs', label: 'Dialogs & External Handling' }
    ]
  },
  {
    title: 'Expandable Rows',
    component: 'ExpandableRows',
    subSections: [
      { id: 'enable', label: 'How to Enable' },
      { id: 'expandable-columns', label: 'Expandable Column Types' },
      { id: 'slots', label: 'Slots Inside Expanded Rows' },
      { id: 'styling', label: 'Styling Expanded Rows' }
    ]
  },

  {
    title: 'Slots',
    component: 'Slots',
    subSections: [
      { id: 'available', label: 'Available Slots' },
      { id: 'column-slots', label: 'Normal Column Slots' },
      { id: 'expand-slots', label: 'Expand Row Slots' },
      { id: 'conditional-render', label: 'Conditional Rendering in Slots' }
    ]
  },
  {
    title: 'Responsive Layout',
    component: 'ResponsiveLayout',
    subSections: [
      { id: 'breakpoints', label: 'Breakpoint Classes' },
      { id: 'hiding-columns', label: 'Hiding Columns per Width' },
      { id: 'responsive-config', label: 'Using ResponsiveColumnConfig' },
      { id: 'skip-columns', label: 'Skipping Columns Manually' } // ✅ Added
    ]
  },
  {
    title: 'Styling & SCSS',
    component: 'Styling',
    subSections: [
      { id: 'default', label: 'Default SCSS Tokens' },
      { id: 'utility-classes', label: 'Utility Classes' },
      { id: 'custom-overrides', label: 'Overriding with TableStyleConfig' },
      { id: 'dark-mode', label: 'Dark Mode Support' }
    ]
  },
  {
    title: 'Demo Showcase',
    component: 'DemoIndex', // Or whatever maps to this demo/index.vue
    subSections: [] // no scroll subsections needed since it's handled inside
  },

  {
    title: 'API Reference',
    component: 'ApiReference',
    subSections: [
      { id: 'table-config', label: 'TableConfig API' },
      { id: 'style-config', label: 'TableStyleConfig API' },
      { id: 'action-types', label: 'Action Type Classes' },
      { id: 'icon-system', label: 'Icon Registry & SVGs' }
    ]
  },
  {
    title: 'Contribution',
    component: 'Contribution',
    subSections: [
      { id: 'folder-structure', label: 'Folder Structure' },
      { id: 'dev-guide', label: 'Development Guide' },
      { id: 'issue-prs', label: 'Issues & PR Conventions' }
    ]
  }
]


</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #f9fafb;
  padding: 5rem 1rem;
  border-right: 1px solid #ddd;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  z-index: 999;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.sidebar--visible {
    transform: translateX(0);
  }
}

.sidebar__section {
  margin-bottom: 1.5rem;
}

.sidebar__title {
  font-weight: bold;
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
  cursor: pointer;
  color: #333;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;

}
.sidebar__title:hover {
  background-color: #e5e7eb;
}
.sidebar__title.active {
  background-color: #2563eb;
  color: white;
}

.sidebar__item {
  padding: 0.3rem 0.6rem 0.3rem 1rem;
  margin: 0.2rem 0;
  font-size: 0.92rem;
  color: #444;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;

}
.sidebar__item:hover {
  background-color: #f3f4f6;
  color: #007acc;
}
.sidebar__item.active {
  background-color: #e0f2fe;
  color: #0c4a6e;
  font-weight: 600;
}

/* 🌙 Dark mode support */
.dark-mode .sidebar {
  background: #1f2937;
  border-right-color: #374151;
}

.dark-mode .sidebar__title {
  color: #f3f4f6;
}
.dark-mode .sidebar__title:hover {
  background-color: #374151;
}
.dark-mode .sidebar__title.active {
  background-color: #2563eb;
  color: white;
}

.dark-mode .sidebar__item {
  color: #d1d5db;
}
.dark-mode .sidebar__item:hover {
  background-color: #374151;
  color: #60a5fa;
}
.dark-mode .sidebar__item.active {
  background-color: #1e40af;
  color: #ffffff;
}
</style>
