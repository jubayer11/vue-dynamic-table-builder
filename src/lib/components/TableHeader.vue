<template>
  <thead :class="[styles.head, customStyle?.head]">
  <tr :class="[styles.headTr, customStyle?.headTr]">
    <th
        v-if="myTable.isSerialNoShow || myTable.selectShow || myTable?.totalColumn > dataShowStyle.columnToShow"
        :class="[styles.headTh, customStyle?.headTh]"
    >
      <div class="table__head__th__flex-center">
        <div v-if="myTable.selectShow" class="table__checkbox-wrapper group">
          <input
              class="table__checkbox"
              type="checkbox"
              :checked="myTable.selectedItem.isAllSelected"
              @change="toggleSelectAll"
          />
          <div class="table__tooltip group-hover">
            <div class="table__tooltip-content">
              <div class="table__tooltip-caret"></div>
              <div class="table__tooltip-text">Select All</div>
            </div>
          </div>
        </div>
        <div v-if="myTable.isSerialNoShow">Sl</div>
        <div v-if="!myTable.isSerialNoShow && myTable?.totalColumn > dataShowStyle.columnToShow">Expand</div>
      </div>
    </th>

    <template v-for="(item, index) in myTable.headers" :key="index">
      <th
          v-if="index < dataShowStyle.columnToShow && myTable?.skipColumn?.columnIndex[index] === undefined"
          :class="[styles.headTh, customStyle?.headTh, customStyle?.headThIndex[index]]"
      >
        <div
            v-if="myTable?.sorting?.isSorting && myTable?.sorting?.columnIndex[index] !== undefined"
            class="table__sortable-header"
            @click="sortingChange(index)"
        >
          <div :class="[styles.headThSortItem, customStyle?.headThSortItem]">
            {{ item }}
          </div>
          <div v-if="sortingIconClick[index] === undefined">
            <icon-sorting
                :icon="styles.headThSortIcon.normal.icon"
                :path="styles.headThSortIcon.normal.path"
            />
          </div>
          <div v-else>
            <icon-sorting :icon="sortingIconClick[index]?.icon" :path="sortingIconClick[index]?.path" />
          </div>
        </div>
        <div v-else :class="[styles.headThItem, customStyle?.headThItem]">
          {{ item }}
        </div>
      </th>
    </template>
  </tr>
  </thead>
</template>


<script setup>
/**

 @file TableHeader.vue

 @description Renders the table header section for a customizable table. Supports serial numbers, select-all checkbox, sorting icons, and responsive display of columns.

 @component

 @prop {Object} myTable - The main configuration object for the table.

 @prop {boolean} myTable.selectShow - Whether the select-all checkbox should be shown.

 @prop {boolean} myTable.isSerialNoShow - Whether to show the serial number column.

 @prop {number} myTable.totalColumn - Total number of columns.

 @prop {Object} myTable.selectedItem - Contains selection state of items.

 @prop {boolean} myTable.selectedItem.isAllSelected - Whether all rows are selected.

 @prop {Object} myTable.sorting - Sorting config.

 @prop {boolean} myTable.sorting.isSorting - Whether sorting is enabled.

 @prop {Object} myTable.sorting.columnIndex - Which columns support sorting.

 @prop {Object} myTable.skipColumn - Config for skipped columns.

 @prop {Object} myTable.headers - Array of table headers (strings).

 @prop {Object} styles - Default styles object injected from parent.

 @prop {Object} customStyle - Optional custom style overrides.

 @prop {Object} dataShowStyle - Object that holds columnToShow for responsive handling.

 @prop {Object} sortingIconClick - Dynamic tracking of which columns have been sorted.

 @prop {Function} updateSelected - Callback to select or unselect all rows.

 @emits sortingChange(index) - Emits index of header when sorting is triggered.

 @example

 <TableHeader

 :myTable="myTable"

 :styles="styles.head"

 :customStyle="customStyle.head"

 :dataShowStyle="dataShowStyle"

 :sortingIconClick="sortingIconClick"

 @sortingChange="handleSortingChange"

 :updateSelected="onSelectItemChange"

 />
 */
import IconSorting from "@/components/Icon/iconSorting.vue";

// Props for the component
const props = defineProps({
  myTable: {
    type: Object,
    required: true,
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  dataShowStyle: {
    type: Object,
    required: true,
  },
  sortingIconClick: {
    type: Object,
    default: () => ({}),
  },
  updateSelected: {type: Function, required: true},
});

// Emit for sorting change
const emit = defineEmits(["sortingChange"]);

const sortingChange = (index) => {
  emit("sortingChange", index);
};

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    props.updateSelected(null,null,true);
  } else {
    props.updateSelected(null,null,false);
  }
};

</script>
<style scoped>
.table__head__th__flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table__checkbox-wrapper {
  margin-right: 0.5rem;
  position: relative;
}

.table__checkbox {
  width: 1em;
  height: 1em;
  cursor: pointer;
}

.table__tooltip {
  position: absolute;
  z-index: 20;
  display: none;
  background-color: #3490dc;
  min-width: 5em;
  font-size: 0.7em;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem;
  color: white;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
}

.group:hover .group-hover {
  display: block;
}

.table__tooltip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.table__tooltip-caret {
  position: absolute;
  top: -0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3490dc;
  border-top: 2px solid #3490dc;
  border-right: 2px solid #3490dc;
  transform: rotate(-45deg);
  z-index: 50;
}

.table__tooltip-text {
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  z-index: 100;
}

.table__sortable-header {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
