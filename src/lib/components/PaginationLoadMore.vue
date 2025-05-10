<template>
  <div v-if="paginationData?.meta?.current_page < paginationData?.meta?.last_page"
       :class="[paginationStyles?.loadMore?.wrapper, customStyles?.loadMore?.wrapper]">
    <button
        :class="[paginationStyles?.loadMore?.button, customStyles?.loadMore?.button]"
        @click="onLoadMore"
    >
      <div :class="[paginationStyles?.loadMore?.container, customStyles?.loadMore?.container]">
        <button-animation
            v-if="isButtonAnimation"
            :class="[paginationStyles?.loadMore?.animation, customStyles?.loadMore?.animation]"
        />
        <div :class="[paginationStyles?.loadMore?.content, customStyles?.loadMore?.content]">
          Load More
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
/**
 * @typedef {Object} LoadMorePaginationProps
 * @property {Object} paginationStyles - Default style object for pagination.
 * @property {Object} customStyles - User-defined style overrides.
 * @property {Function} onLoadMore - Function to call when the "Load More" button is clicked.
 * @property {boolean} isButtonAnimation - Indicates whether the loading animation should be shown.
 * @property {Object} paginationData - Pagination metadata, typically includes meta object.
 * @property {Object} paginationData.meta - Meta object for pagination.
 * @property {number} paginationData.meta.current_page - Current page number.
 * @property {number} paginationData.meta.last_page - Last page number.
 */

import ButtonAnimation from '@/components/ButtonAnimation.vue';


const props = defineProps({
  paginationStyles: Object,
  customStyles: Object,
  onLoadMore: Function,
  isButtonAnimation:Boolean,
  paginationData:{
    type:Object,
    default:()=>({}),
  }
});
</script>
