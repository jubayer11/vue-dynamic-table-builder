<template>
  <svg :class="[icon]" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="[stroke[0]]" d="M13 1L4.75 10L1 5.90909" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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




//onBeforeMount(loadStyles);

</script>
