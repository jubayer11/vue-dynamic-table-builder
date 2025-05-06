<template>
  <svg :class="[icon]"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" >
    <path  :class="[path[0]]"  d="M19 11H13V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/>
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
