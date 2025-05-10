<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'


/**
 * Simple global dark mode state (based on body class).
 * This assumes dark mode is toggled globally via `.dark-mode` class on <html> or <body>.
 */
const isDarkMode = ref(document.documentElement.classList.contains('dark-mode'))

// Optional: Watch for manual toggling outside (if needed)
const observer = new MutationObserver(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark-mode')
})

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class'],
})
</script>

<style>
/* Box Sizing + Reset */
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
