<template>
  <div>
    <per-page-selector
        v-if="myTable?.itemPerPage?.isShow === true"
        :options="myTable?.itemPerPage?.options"
        :label="myTable?.itemPerPage?.label"
        :styles="styles?.itemPerPage"
        :customStyles="customStyle?.itemPerPage"
        v-model="itemPerPage"
    />

    <table :class="[
        styles.main,
        customStyle?.main
        ]">

      <TableHeader
          :myTable="myTable"
          :styles="styles.head"
          :customStyle="customStyle.head"
          :dataShowStyle="dataShowStyle"
          :sortingIconClick="sortingIconClick"
          @sortingChange="handleSortingChange"
          :updateSelected="onSelectItemChange"
      />



      <TableBody
          :myTable="myTable"
          :styles="styles"
          :customStyle="customStyle"
          :dataShowStyle="dataShowStyle"
          :dynamicActionIconComponent="dynamicActionIconComponent"
          :actionClick="actionClick"
          :expandIndex="expandIndex"
          :isExpandPlusOrMinus="isExpandPlusOrMinus"
          :customRange="customRange"
          :isSpecificColumn="checkSpecificColumn"
          :isMultipleColumn="checkMultipleColumn"
          :isActionColumn="checkActionColumn"
          :isNormalColumn="checkNormalColumn"
          :toggleRow="toggleRow"
          :imgLocation="imgLocation"
          :updateSelected="onSelectItemChange"
          :is-selected="isItemSelected"
      >
        <template #specific-column="slotProps">
          <slot name="specific-column" v-bind="slotProps" />
        </template>
        <template #expandable-specific-column="slotProps">
          <slot name="expandable-specific-column" v-bind="slotProps" />
        </template>
      </TableBody>

    </table>

<!--    pagination-->
    <paginationWithNumber
        v-if="myTable?.pagination?.isShow && myTable?.pagination?.paginationType===1"
        :paginationStyles="styles?.pagination"
        :customStyles="customStyle?.pagination"
        :paginationData="myTable?.pagination?.data"
        :fetch-data="onPaginate"
    >

    </paginationWithNumber>

    <PaginationWithLoadMore
        v-else-if="myTable?.pagination?.isShow && myTable?.pagination?.paginationType===2"
        :paginationStyles="styles?.pagination"
        :customStyles="customStyle?.pagination"
        :paginationData="myTable?.pagination?.data"
        :isButtonAnimation="isButtonAnimation"
        :onLoadMore="LoadMore"

    >
    </PaginationWithLoadMore>

  </div>
</template>
<script setup>

/**
 * CustomizableTable.vue
 *
 * This is the main wrapper component for the customizable table system. It integrates all child components:
 * - PerPageSelector
 * - TableHeader
 * - TableBody
 * - PaginationWithNumber
 * - PaginationWithLoadMore
 *
 * It supports responsive column rendering, dynamic icon importing, expandable rows, sorting, pagination (click or load more),
 * and full style customizations via a structured `styles` and `customStyle` object system.
 *
 * @component
 *
 * @prop {Object} myTable - The core data configuration object for the table, including headers, rows, sorting, actions, pagination, etc.
 * @prop {Object} customStyle - Optional deeply nested custom style overrides for every part of the table.
 * @prop {Function} onPaginate - Callback for handling pagination fetches (used by both number-based and load-more).
 * @prop {Function} onSelectorChange - Callback triggered when item-per-page value changes.
 * @prop {Function} onActionClick - Callback triggered when an action (icon or button) is clicked.
 * @prop {Function} onSelectItemChange - Callback triggered when a user selects/deselects a row checkbox.
 *
 * @data {Ref<number>} screen - Tracks screen width for responsive rendering.
 * @data {Ref<string>} imgLocation - Path to image assets (can be used in cell rendering).
 * @data {Ref<number>} itemPerPage - Tracks how many items to show per page.
 * @data {ShallowRef<Object>} dynamicActionIconComponent - Stores async-loaded icon components for action columns.
 * @data {Ref<Object>} isExpandPlusOrMinus - Maps expanded row indexes to `true` or `false`.
 * @data {Ref<Object>} sortingIconClick - Stores sorting icon state for each sortable column.
 * @data {Ref<number|null>} expandIndex - Tracks which row is currently expanded.
 * @data {Ref<boolean>} isButtonAnimation - Controls animation state of the Load More button.
 *
 * @computed {Array<number>} customRange - Array of column indexes hidden in responsive view (expandable content).
 * @computed {Object} dataShowStyle - Contains how many columns should be shown based on screen size.
 *
 * @method initializeTableState - Loads icon configurations and updates base styles from `customStyle` if required.
 * @method setupDynamicIcons - Dynamically imports icons for each action column using provided config.
 * @method checkSpecificColumn(index): boolean - Determines if a column is marked as "specific".
 * @method checkMultipleColumn(index): boolean - Determines if a column is marked as "multiple".
 * @method checkActionColumn(index): boolean - Determines if a column is marked as "action".
 * @method checkNormalColumn(index): boolean - Determines if a column is a standard column.
 * @method isItemSelected(id): boolean - Checks whether a given row ID is selected.
 * @method handleSortingChange(index) - Toggles sorting icon and prepares `sortingIconClick` state.
 * @method toggleRow(index) - Handles expand/collapse of a given row.
 * @method LoadMore() - Triggers pagination load more behavior with button animation handling.
 * @method actionClick(item, id, index, type) - Main handler for triggering user-defined action logic.
 * @method updateStyles() - Recalculates screen size and forces recomputation of responsive columns.
 */


import {computed, onBeforeMount, onMounted, ref, shallowRef, watch} from 'vue';
import { useRouter } from 'vue-router';

// Utility imports
import { responsiveDataShow } from "@/utils/TableResponsiveStyle.js";
import { importDynamicIconComponent } from '@/composable/dynamicIconImport';
import {  handleActionClick } from "@/composable/action";
import {getOriginalStyles, startAnimation, stopAnimation} from "@/utils/pagination.js";

// Helper imports
import {
  isSpecificColumn,
  isMultipleColumn,
  isActionColumn,
  isNormalColumn,
} from '@/utils/isColumnHelper.js';

// Component imports
import PaginationWithNumber from "@/components/PaginationNumber.vue";
import PaginationWithLoadMore from "@/components/PaginationLoadMore.vue";
import PerPageSelector from "@/components/PerPageSelector.vue";
import TableHeader from "@/components/TableHeader.vue";
import TableBody from "@/components/TableBody.vue";

// State imports
import styles from "@/utils/styleState.js";

// Props
const props = defineProps({
  myTable: { type: Object, required: true },
  customStyle: { default: {} },
  onPaginate: {
    type: Function,
    default: () => true,
  },
  onSelectorChange: {
    type: Function,
    default: () => true,
  },
  onActionClick: {
    type: Function,
    default: () => true,
  },
  onSelectItemChange:{
    type: Function,
    default: () => true,
  },
  onSortingChange:{
    type: Function,
    default: () => true,
  },
});

// Local state
const screen = ref(0);
const imgLocation = ref('/images/');
const itemPerPage = ref(props.myTable?.itemPerPage?.value || 10);
const dynamicActionIconComponent = shallowRef({});
const isExpandPlusOrMinus = ref({});
const sortingIconClick = ref({});
const expandIndex = ref(null);
const isButtonAnimation = ref(false);
const router=useRouter();
let isAsc;


// Lifecycle Hooks
onBeforeMount(() => {
  initializeTableState();
  setupDynamicIcons();
  window.removeEventListener('resize', updateStyles); // Cleanup
});

onMounted(() => {
  updateStyles(); // Initial styles
  window.addEventListener('resize', updateStyles); // Add resize listener
});

//watch item per page
watch(itemPerPage, async (newValue, oldValue) => {
  if (newValue !== oldValue && props.onSelectorChange) {
    await props.onSelectorChange(newValue);
  }
});

// Reactive Computed Properties
const customRange = computed(() => {
  const start = dataShowStyle.value.columnToShow;
  const end = props?.myTable?.totalColumn - 1;
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const dataShowStyle = computed(() => {
  screen.value = window.innerWidth;
  return responsiveDataShow(screen.value, props.myTable.dataShow);
});



// Methods

// Table initialization and dynamic icon setup
function initializeTableState() {
  itemPerPage.value = props?.myTable?.itemPerPage?.value;

  if (props?.customStyle?.head?.headThSortIcon?.isUpdated === 1) {
    styles.head.headThSortIcon.normal = props?.customStyle?.head?.headThSortIcon?.normal;
    styles.head.headThSortIcon.onClick = props?.customStyle?.head?.headThSortIcon?.onClick;
  }

  if (props?.customStyle?.expandColumn?.icon?.isUpdated === 1) {
    styles.expandColumn.icon.plus = props?.customStyle?.expandColumn?.icon?.plus;
    styles.expandColumn.icon.minus = props?.customStyle?.expandColumn?.icon?.minus;
  }
}

function setupDynamicIcons() {
  if (props?.myTable?.actions?.isActions) {
    Object.entries(props?.myTable?.actions?.columnIndex).forEach(([key, value]) => {
      if (value && value?.actionActivityType?.value!==1) {
        importDynamicIconComponent(value, key, dynamicActionIconComponent);
      }
    });
  }
}

// Column type checkers
const checkSpecificColumn = (index) => isSpecificColumn(index, props.myTable);
const checkMultipleColumn = (index) => isMultipleColumn(index, props.myTable);
const checkActionColumn = (index) => isActionColumn(index, props.myTable);
const checkNormalColumn = (index) => isNormalColumn(index, props.myTable);
const isItemSelected=(id)=>{
  const index=props?.myTable?.selectedItem.ids.indexOf(id);
  if (index !== -1) {
    return true;
  }
  else {
    return false;
  }
}
// Sorting handler
async function handleSortingChange(index) {


  if (sortingIconClick.value[index]===undefined){
    isAsc=false;

  }else {
    isAsc = !isAsc;
  }

  const response = await props.onSortingChange(index, isAsc);


  if (response){
    if (sortingIconClick.value[index]) {
      sortingIconClick.value[index].path = [
        sortingIconClick.value[index].path[1],
        sortingIconClick.value[index].path[0],
      ];
    } else {
      sortingIconClick.value = {};
      sortingIconClick.value[index] = {
        icon: styles.head.headThSortIcon.onClick.icon,
        path: [styles.head.headThSortIcon.normal.path[0], styles.head.headThSortIcon.onClick.path],
      };
    }
  }

}

// Toggle row expansion
function toggleRow(index) {
  if (expandIndex.value === null) {
    expandIndex.value = index;
    isExpandPlusOrMinus.value[index] = true;
  } else if (isExpandPlusOrMinus.value[index]) {
    expandIndex.value = null;
    isExpandPlusOrMinus.value = {};
  } else if (isExpandPlusOrMinus.value[expandIndex.value]) {
    isExpandPlusOrMinus.value = {};
    isExpandPlusOrMinus.value[index] = true;
    expandIndex.value = index;
  } else {
    expandIndex.value = null;
    isExpandPlusOrMinus.value = {};
  }
}

// Pagination load more functionality
async function LoadMore() {
  const originalStyles = getOriginalStyles(styles,props.customStyle);

  // Start the loading animation
  startAnimation(isButtonAnimation, styles.pagination, props.customStyle.pagination);

  try {
    // Await the response to ensure `LoadMore` is fully synchronized with the data fetch
    const response = await props.onPaginate();

    if (response) {
      console.log("Load more: Data fetched successfully.");
    } else {
      console.warn("Load more: Data fetch failed.");
    }
  } catch (error) {
    console.error("Load more: Error during pagination fetch:", error);
  } finally {

    stopAnimation(isButtonAnimation, styles.pagination, props.customStyle.pagination, originalStyles);
  }
}


// Action click handler
const actionClick = async (item, id, index, type) =>{
  const response=await props.onActionClick(item, id, index, type);

  if (response){
    handleActionClick(item, id, index, type, props.myTable,router);
  }
}



// Styles update handler
function updateStyles() {
  screen.value = window.innerWidth; // Trigger computed update
}
</script>

<style lang="scss">

@use "@/assets/table/defaultTableCustomization.scss" as *;
@use "@/assets/table/table-utilities.scss" as *;

</style>
<style scoped>

.slide-enter-active {
  animation: slide-in 0.1s ease-out forwards;

}

.slide-leave-active {
  animation: slide-out 0.1s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(20px);
  }
  to {
    transform: translateX(0);
  }

}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(20px);
  }

}

</style>
