<template>
  <svg :class="[icon]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Path 0: Lock body (rectangle + keyhole as part of fill) -->
    <rect :class="[path[0]]" x="4" y="8" width="12" height="8" rx="2" />
    <!-- Path 1: Shackle + keyhole (stroke for shackle, fill for keyhole) -->
    <path
        :class="[path[1]]"
        d="M7 8V6a3 3 0 1 1 6 0v2M10 13.4a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="currentColor"
    />
  </svg>
</template>

<script setup>
const props=defineProps({
  icon:{
    type:String,
    default:'icon__default__icon',
  },
  path:{
    type:Array,
    default:['icon__default__icon__path1', 'icon__default__icon__path2'],
  },
  stroke:{
    type:Array,
    default:['icon__default__icon__stroke1', 'icon__default__icon__stroke2'],
  },
});
</script>
