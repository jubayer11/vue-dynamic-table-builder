<template>
  <svg :class="[icon]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
    <path :class="[path[0]]" d="M19 13H5v-2h14v2z"></path>
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
  }
});
</script>
