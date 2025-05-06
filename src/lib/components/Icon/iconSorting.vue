<template>
  <svg :class="[props.icon]" xmlns="http://www.w3.org/2000/svg" width="50" height="100" viewBox="0 0 50 100" version="1.1">
    <polygon :class="[path[0]]" points="25,10 10,40 40,40" style="stroke:black;stroke-width:1" />
    <polygon :class="[path[1]]" points="25,90 10,60 40,60" style="stroke:black;stroke-width:1"/>
  </svg>

</template>
<script setup>
const props=defineProps({
  sortingUp:{},
  sortingDown:{},
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
