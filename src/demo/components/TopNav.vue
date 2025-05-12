<template>
  <header class="top-nav">
    <div class="top-nav__left">
      <!-- 👇 Mobile hamburger -->
      <button
          v-if="$route.path.startsWith('/docs')"
          class="top-nav__hamburger"
          @click="$emit('toggle-sidebar')"
      >
        ☰
      </button>
      <span class="top-nav__brand">🌐 Vue Dynamic Table Builder</span>
    </div>
    <nav class="top-nav__right">
      <RouterLink
          to="/docs"
          class="top-nav__link"
          :class="{ active: $route.path.startsWith('/docs') }"
      >
        Docs
      </RouterLink>
      <RouterLink
          to="/demo"
          class="top-nav__link"
          :class="{ active: $route.path.startsWith('/demo') }"
      >
        Demo
      </RouterLink>
      <button class="top-nav__toggle" @click="toggleDarkMode">
        {{ isDarkMode ? '🌙' : '☀️' }}
      </button>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const $route = useRoute()
const isDarkMode = ref(document.documentElement.classList.contains('dark-mode'))

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark-mode')
  isDarkMode.value = document.documentElement.classList.contains('dark-mode')
}

onMounted(() => {
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark-mode')
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.top-nav__brand {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  user-select: none;
  transition: color 0.3s ease;
}

.top-nav__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.top-nav__right {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* Modern button-like nav links */
.top-nav__link {
  text-decoration: none;
  font-weight: 500;
  color: #374151;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.top-nav__link:hover {
  background-color: #e0e7ff;
  color: #1e40af;
}

.top-nav__link.active {
  background-color: #1d4ed8;
  color: white;
  font-weight: 600;
}

.top-nav__toggle {
  font-size: 1.1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  transition: color 0.3s ease;
}

.top-nav__toggle:hover {
  color: #1d4ed8;
}

.top-nav__hamburger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #1f2937;
  transition: color 0.2s ease;
}

@media (max-width: 768px) {
  .top-nav__hamburger {
    display: inline-block;
  }
}
@media (max-width: 640px) {
  .top-nav__brand {
   font-size: 1rem;
  }
}
/* Dark Mode Enhancements */
.dark-mode .top-nav {
  background-color: #1f2937;
  border-bottom-color: #374151;
}

.dark-mode .top-nav__brand,
.dark-mode .top-nav__hamburger {
  color: #f9fafb;
}

.dark-mode .top-nav__link {
  color: #d1d5db;
}

.dark-mode .top-nav__link:hover {
  background-color: #374151;
  color: #60a5fa;
}

.dark-mode .top-nav__link.active {
  background-color: #2563eb;
  color: #ffffff;
}

.dark-mode .top-nav__toggle {
  color: #d1d5db;
}

.dark-mode .top-nav__toggle:hover {
  color: #60a5fa;
}
</style>

