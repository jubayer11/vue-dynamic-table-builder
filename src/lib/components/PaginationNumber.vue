<template>
  <nav
       :class="[paginationStyles?.wrapper, customStyles?.wrapper]"
       aria-label="Page navigation">
    <ul :class="[paginationStyles?.container, customStyles?.container]">
      <!-- Previous button -->
      <li v-if="paginationData?.meta?.current_page > 1" class="cursor-pointer">
        <a @click.prevent="fetchData(paginationData?.meta?.current_page - 1)"
           :class="[paginationStyles?.itemLink, customStyles?.itemLink]" href="#">
          <svg :class="[paginationStyles?.icon, customStyles?.icon]" aria-hidden="true"
               fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path :class="[paginationStyles?.path[0], customStyles?.path[0]]" clip-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  fill-rule="evenodd"></path>
          </svg>
        </a>
      </li>

      <!-- Page numbers -->
      <li v-for="page in paginationData?.meta?.last_page" :key="page" class="">
        <a @click.prevent="fetchData(page)"
           :class="[
               paginationStyles?.itemLink,
               customStyles?.itemLink,
               paginationData?.meta?.current_page === page ? paginationStyles?.itemLinkClicked : '',
               paginationData?.meta?.current_page === page ? customStyles?.itemLinkClicked : ''
               ]"
        >
          {{ page }}
        </a>
      </li>

      <!-- Next button -->
      <li v-if="paginationData?.meta?.current_page < paginationData?.meta?.last_page" class="">
        <a @click.prevent="fetchData(paginationData?.meta?.current_page + 1)"
           :class="[paginationStyles?.itemLink, customStyles?.itemLink]" href="#">
          <svg :class="[paginationStyles?.icon, customStyles?.icon]" aria-hidden="true"
               fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path :class="[paginationStyles?.path[0], customStyles?.path[0]]"
                  clip-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  fill-rule="evenodd"
            >

            </path>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
/**
 * @typedef {Object} PaginationProps
 * @property {Function} fetchData - Function to fetch data for the given page number.
 * @property {Object} paginationStyles - Default style object for pagination.
 * @property {Object} customStyles - Custom user-provided styles to override defaults.
 * @property {Object} paginationData - Pagination metadata, including current page and last page.
 * @property {Object} paginationData.meta - Meta object containing pagination details.
 * @property {number} paginationData.meta.current_page - Current page number.
 * @property {number} paginationData.meta.last_page - Last page number.
 */




import { defineProps } from 'vue';

const props = defineProps({
  fetchData: {
    type: Function,
    required: true,
  },
  paginationStyles: {
    type: Object,
    default: () => ({}),
  },
  customStyles: {
    type: Object,
    default: () => ({}),
  },
  paginationData:{
    type:Object,
    default:()=>({}),
  }
});

</script>
