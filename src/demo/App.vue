<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <TopNav @toggle-sidebar="sidebarVisible = !sidebarVisible" />

    <div
        v-if="$route.path.startsWith('/docs')"
        class="layout layout--docs"
    >
      <Sidebar
          :class="{ 'sidebar--visible': sidebarVisible }"
      />
      <div class="main-content-wrapper">
        <div class="main-content docs-content">
          <router-view :key="$route.fullPath" />
        </div>
      </div>

    </div>

    <div v-if="$route.path.startsWith('/docs')" class="footer-wrapper">
      <GlobalFooter />
    </div>

    <div
        v-else
        class="main-content demo-content"
    >
      <router-view :key="$route.fullPath" />
      <GlobalFooter />
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import TopNav from './components/TopNav.vue'
import Sidebar from '@demo/components/docs/Sidebar.vue'
import GlobalFooter from "@demo/components/GlobalFooter.vue";

const $route = useRoute()

const isDarkMode = ref(document.documentElement.classList.contains('dark-mode'))

const observer = new MutationObserver(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark-mode')
})

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
})

const sidebarVisible = ref(false)
</script>

<style scoped>
.footer-wrapper {
  margin-left: 260px;
  padding: 2rem;
  background-color: transparent;
}

@media (max-width: 767px) {
  .footer-wrapper {
    margin-left: 0;
    padding: 1rem;
  }
}

/* Layout for docs only */
.layout--docs {
  display: flex;
}

/* Sidebar is fixed at 260px; main-content should leave space */
.main-content-wrapper {
  width: 100%;
  margin-left: 260px;
  display: flex;
  justify-content: center;
}

/* Docs content should be centered and responsive */
.docs-content {
  padding: 2rem;
  width: 100%;
  transition: all 0.3s ease;
}

/* Breakpoint-specific widths */
@media (min-width: 1536px) {
  .docs-content {
    max-width: 1100px;
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .docs-content {
    max-width: 1000px;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .docs-content {
    max-width: 900px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .docs-content {
    max-width: 700px;
    padding: 1.5rem;
  }
}

/* 💡 MOBILE VIEW: No left margin, full-width content */
@media (max-width: 767px) {
  .main-content-wrapper {
    margin-left: 0;
    padding: 0 1rem;
  }

  .docs-content {
    margin-left: 0;
    max-width: 100%;
    padding: 1.25rem 0;
  }

  .footer-wrapper {
    padding: 1.5rem 1rem;
  }
}

</style>

<style>
/* Base styling for all pages */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  background-color: #f9fafb;
  color: #1f2937;
  scroll-behavior: smooth;
  width: 100%;
  overflow-x: hidden;
}

img,
svg {
  max-width: 100%;
  display: block;
}

/* 🌙 Dark Mode Base */
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

.dark-mode a {
  color: #90cdf4;
}
</style>
