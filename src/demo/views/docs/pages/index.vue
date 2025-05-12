<template>
  <div class="doc-layout">
    <Sidebar @set-active="setActive" />

    <div class="doc-content">
      <Transition name="fade-slide" mode="out-in">
        <component :is="activeComponent" :key="activeComponent" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@demo/components/docs/Sidebar.vue'

import Introduction from '@demo/components/docs/Introduction.vue'
import GettingStarted from '@demo/components/docs/GettingStarted.vue'
// 🔁 Add more as you build



const components = {
  Introduction,
  GettingStarted,
  // Add more as you go
}
const activeComponent = ref(components.Introduction)
function setActive(name) {
  if (components[name]) {
    activeComponent.value = components[name]
  }
}
</script>

<style scoped>
.doc-layout {
  display: flex;
}

.doc-content {
  padding: 2rem;
  width: 100%;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* ✅ Simple transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.dark-mode .doc-content {
  background-color: #1e1e1e;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.03);
}
</style>
