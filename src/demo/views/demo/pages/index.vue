<template>
  <div class="table-demo__wrapper">
    <!-- 🌟 Header Section -->
    <div class="table-demo__headerCard">
      <h1 class="table-demo__titleMain">
        <span class="gradient-text">Vue Dynamic Table Builder</span>
      </h1>
      <p class="table-demo__description">
        A powerful and flexible table system designed for Vue 3 developers. <br />
        Create dynamic columns, expandable rows, selectable items, action buttons, styled layouts, and more with ease.
      </p>
      <p class="table-demo__author">
        Designed & Developed by <br />
        <a href="https://www.jubayerahmed.com/" target="_blank" rel="noopener">
          Jubayer Ahmed
        </a>
      </p>
    </div>

    <!-- 🔗 GitHub Badge + Theme Toggle -->
    <div class="table-demo__badgeThemeContainer">
      <a class="github-badge" href="https://github.com/jubayer11/vue-dynamic-table-builder" target="_blank" rel="noopener">
        ★ GitHub Repo
      </a>
      <label class="theme-toggle">
        <input type="checkbox" v-model="isDark" />
        <span>{{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}</span>
      </label>
    </div>

    <!-- 🧭 Navigation (Grid) -->
    <nav class="table-demo__gridNavContainer">
      <div class="table-demo__gridNav">
        <div
            v-for="(section, index) in demoSections"
            :key="index"
            class="table-demo__gridNav__item"
            :class="{ active: section.isActive }"
            @click="scrollToSection(section.refId)"
        >
          {{ section.title }}
        </div>
      </div>
    </nav>

    <!-- 📦 Demo Showcase Sections -->
    <div class="table-demo__sections">
      <div
          v-for="(section, index) in demoSections"
          :key="index"
          :id="section.refId"
          class="table-demo__sectionBlock"
      >
        <h2 class="table-demo__sectionTitle">{{ section.title }}</h2>
        <p class="table-demo__sectionDescription">{{ section.description }}</p>
        <component :is="section.component" />
      </div>
    </div>

  </div>
</template>

<script setup>
/**
 * @component Dynamic Table Demo Entry
 * Displays a list of fully interactive table demos using Vue 3 + composition API.
 * Includes dark mode toggle, scrollspy, and navigation via dynamic section registration.
 */

import { markRaw, ref, onMounted, onBeforeUnmount, watch } from 'vue'

/**
 * Dark mode toggle state.
 * When toggled, updates the root class.
 * @type {import('vue').Ref<boolean>}
 */
const isDark = ref(false)

// 🌓 Watch dark mode and update HTML class accordingly
watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark-mode', val)
})

// 🌐 Demo Components
import BasicTableDemo from '@demo/components/demo/BasicTableDemo.vue'
import MultipleActionTableDemo from '@demo/components/demo/MultipleActionTableDemo.vue'
import CrazyStyleTableDemo from '@demo/components/demo/CrazyStyleTableDemo.vue'
import ExpandableRowDemo from '@demo/components/demo/ExpandableRowDemo.vue'
import PaginationModesDemo from '@demo/components/demo/PaginationModesDemo.vue'
import AllFeaturesCombinedDemo from '@demo/components/demo/AllFeaturesCombinedDemo.vue'
import ActionButtonTableDemo from '@demo/components/demo/ActionButtonTableDemo.vue'
import SelectablePerPageTableDemo from '@demo/components/demo/SelectablePerPageTableDemo.vue'
import RichStatusActionButtonsDemo from '@demo/components/demo/RichStatusActionButtonsDemo.vue'
import SlotColumnDemo from '@demo/components/demo/SlotColumnDemo.vue'

/**
 * @typedef DemoSection
 * @property {string} title - Display title of the section.
 * @property {string} description - Summary of what the demo showcases.
 * @property {string} refId - DOM ID used for scroll targeting.
 * @property {object} component - Vue component to render.
 * @property {boolean} isActive - Whether this section is currently active.
 */

/**
 * List of demo sections shown on the page.
 * Ordered by increasing complexity and interactivity.
 * @type {import('vue').Ref<DemoSection[]>}
 */
const demoSections = ref([
  {
    title: 'Basic Table',
    description: 'A minimal table with fixed headers and clear layout. Ideal for getting started.',
    refId: 'basic-table-demo',
    component: markRaw(BasicTableDemo),
    isActive: false,
  },
  {
    title: 'Selectable Table with Sorting & Pagination',
    description: 'Features checkbox selection, sortable headers, and a dynamic per-page selector.',
    refId: 'selectable-rows-sorting-pagination-demo',
    component: markRaw(SelectablePerPageTableDemo),
    isActive: false,
  },
  {
    title: 'Action Buttons per Row',
    description: 'Shows contextual buttons like Approve/Reject with slot-based styling and behavior.',
    refId: 'action-button-table-demo',
    component: markRaw(ActionButtonTableDemo),
    isActive: false,
  },
  {
    title: 'Multiple Icon-Based Actions',
    description: 'Adds compact icon buttons (View, Edit, Delete) in one or multiple action columns.',
    refId: 'multiple-action-table-demo',
    component: markRaw(MultipleActionTableDemo),
    isActive: false,
  },
  {
    title: 'Status Icons with Mixed Action Types',
    description: 'Combines popup and route-based actions with rich icon feedback and status mapping.',
    refId: 'smart-status-icon-demo',
    component: markRaw(RichStatusActionButtonsDemo),
    isActive: false,
  },
  {
    title: 'Expandable Rows with Custom Content',
    description: 'Rows expand to reveal additional layouts like nested info or grouped details.',
    refId: 'expandable-rows-demo',
    component: markRaw(ExpandableRowDemo),
    isActive: false,
  },
  {
    title: 'Custom Slot-Based Cells',
    description: 'Use named slots to render badges, tags, or conditional views inside each cell.',
    refId: 'slot-column-demo',
    component: markRaw(SlotColumnDemo),
    isActive: false,
  },
  {
    title: 'Per-Row Custom Styling',
    description: 'Demonstrates per-row, per-cell, and ID-based style overrides for advanced UI control.',
    refId: 'crazy-styling-demo',
    component: markRaw(CrazyStyleTableDemo),
    isActive: false,
  },
  {
    title: 'Pagination Modes: Load More vs. Numbered',
    description: 'Switch between infinite scroll ("Load More") and classic pagination styles.',
    refId: 'pagination-modes-demo',
    component: markRaw(PaginationModesDemo),
    isActive: false,
  },
  {
    title: 'All Features Combined (Full Demo)',
    description: 'A complete showcase of selection, expansion, slots, icons, styling, and pagination in action.',
    refId: 'full-showcase-demo',
    component: markRaw(AllFeaturesCombinedDemo),
    isActive: false,
  },
])

/**
 * Update which section is active based on current scroll position.
 * Applies the `.active` class to highlight the corresponding nav item.
 */
function updateActiveSection() {
  const scrollY = window.scrollY
  const offset = 120
  for (const section of demoSections.value) {
    const el = document.getElementById(section.refId)
    if (el) {
      const top = el.offsetTop - offset
      const bottom = top + el.offsetHeight
      section.isActive = scrollY >= top && scrollY < bottom
    }
  }
}

/**
 * Smoothly scrolls to a section and highlights it in the nav.
 * @param {string} refId - The section's DOM id.
 */
function scrollToSection(refId) {
  const offset = 100
  const target = document.getElementById(refId)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'smooth' })

  demoSections.value.forEach(section => {
    section.isActive = section.refId === refId
  })
}

// Lifecycle bindings
onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
/* --------------------------------------------------
   Vue Dynamic Table Builder – Responsive Styling
   Based on Tailwind CSS Breakpoints (incl. 0–400px)
-------------------------------------------------- */

.table-demo__wrapper {
  font-size: 14px;
  padding: 2rem 1rem;
  background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  max-width: 1280px;
  margin: auto;
}

.table-demo__headerCard {
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.table-demo__titleMain {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.gradient-text {
  background: linear-gradient(90deg, #2e90fa, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
}

.table-demo__description {
  font-size: 1.05rem;
  color: #4b5563;
}
.table-demo__author {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 1rem;
}
.table-demo__author a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
.table-demo__author a:hover {
  text-decoration: underline;
}

.table-demo__badgeThemeContainer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  align-items: center;
}

.github-badge {
  background-color: #2e90fa;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.github-badge:hover {
  background-color: #2563eb;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
}
.theme-toggle input {
  transform: scale(1.2);
  cursor: pointer;
}

.table-demo__gridNavContainer {
  padding: 1rem;
  margin-bottom: 2.5rem;
}
.table-demo__gridNav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.table-demo__gridNav__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  min-height: 64px;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background-color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  text-align: center;
  word-break: break-word;
}
.table-demo__gridNav__item:hover {
  background-color: #f0f9ff;
}
.table-demo__gridNav__item.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.table-demo__sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.table-demo__sectionBlock {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  scroll-margin-top: 120px;
  overflow-x: auto;
}
.table-demo__sectionTitle {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}
.table-demo__sectionDescription {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Dark Mode */
.dark-mode .table-demo__wrapper {
  background: linear-gradient(to bottom right, #121212, #1a1a1a);
}
.dark-mode .table-demo__headerCard {
  background-color: #1e1e1e;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
}
.dark-mode .table-demo__titleMain {
  color: #f3f4f6;
}
.dark-mode .table-demo__description {
  color: #cbd5e1;
}
.dark-mode .table-demo__author {
  color: #9ca3af;
}
.dark-mode .table-demo__author a {
  color: #90cdf4;
}
.dark-mode .theme-toggle {
  background-color: #1e1e1e;
  color: white;
}
.dark-mode .table-demo__gridNav__item {
  background-color: #2d2d2d;
  color: #cbd5e1;
  border-color: #3f3f46;
}
.dark-mode .table-demo__gridNav__item:hover {
  background-color: rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.2);
  color: white;
}
.dark-mode .table-demo__gridNav__item.active {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}
.dark-mode .table-demo__sectionBlock {
  background-color: #1e1e1e;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.03);
}
.dark-mode .table-demo__sectionTitle {
  color: #f3f4f6;
}
.dark-mode .table-demo__sectionDescription {
  color: #9ca3af;
}

/* Responsive Breakpoints with 0–400px Segment */
@media (max-width: 400px) {
  .table-demo__wrapper {
    padding: 1rem 0.5rem;
  }
  .table-demo__titleMain {
    font-size: 1.5rem;
  }
  .table-demo__description {
    font-size: 0.9rem;
  }
  .table-demo__gridNav__item {
    font-size: 0.75rem;
  }
  .table-demo__sectionBlock {
    padding: 1rem;
    font-size: 0.8em;
  }
}

@media (min-width: 401px) and (max-width: 639px) {
  .table-demo__wrapper {
    padding: 1.25rem 0.5rem;
  }
  .table-demo__headerCard {
    padding: 1.5rem 1rem;
  }
  .table-demo__gridNavContainer {
    padding: 0.5rem;
    margin-bottom: 1.25rem;
  }
  .table-demo__gridNav {
    gap: 0.75rem;
  }
  .table-demo__gridNav__item {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    min-height: auto;
    line-height: 1.3;
  }
  .table-demo__sectionBlock {
    padding: 1.25rem;
    font-size: 0.9em;
  }
  .table-demo__sectionTitle {
    font-size: 1.25rem;
  }
  .table-demo__sectionDescription {
    font-size: 0.95rem;
  }
  .github-badge,
  .theme-toggle {
    font-size: 0.85rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .table-demo__wrapper {
    padding: 1.5rem 1rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .table-demo__wrapper {
    padding: 2rem 1.5rem;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .table-demo__wrapper {
    padding: 2rem;
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .table-demo__wrapper {
    padding: 2.5rem 2rem;
  }
}

@media (min-width: 1536px) {
  .table-demo__wrapper {
    padding: 3rem 2.5rem;
  }
}
</style>

<style>
html {
  scroll-behavior: smooth;
}
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}
.dark-mode a {
  color: #90cdf4;
}

.dark-mode tbody {
  background-color: #1e1e1e !important;
  color: white !important;
}
.dark-mode thead {
  background-color: #1e1e1e !important;
  color: white;
}
.dark-mode .table__pagination__itemLink {
  background-color: #1e1e1e !important;
  color: white !important;
}
.dark-mode .table__pagination__itemLinkClicked {
  background-color: #2563eb !important;
  color: white !important;
}
.dark-mode .table__itemPerPage__field {
  background-color: #1e1e1e !important;
  color: white !important;
}
.dark-mode .table__expandColumn__td{
  background-color: #1e1e1e !important;
  color: white !important;
}
</style>
