<template>
  <div
      :class="[
      styles?.wrapper,
      customStyle?.wrapper,
      customStyle?.wrapperIndex[rowIndex],
      customStyle?.wrapperIdIndex[data[idIndex]]?.[rowIndex]
    ]">
    <div
        :class="[
        styles?.item,
        customStyle?.item,
        customStyle?.itemIndex[rowIndex],
        customStyle?.itemIdIndex[data[idIndex]]?.[rowIndex]
      ]">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
/**
 * @file NormalColumn.vue
 * @description
 * Renders a single standard (non-specific, non-multiple, non-action) table cell.
 * This component provides support for scoped styling, with class overrides allowed per row index or ID.
 *
 * @prop {Object} styles - Default style classes used for the wrapper and item.
 * @prop {Object} customStyle - Custom override classes including:
 *  - `wrapper`: general override,
 *  - `wrapperIndex`: override by rowIndex,
 *  - `wrapperIdIndex`: override by ID and rowIndex,
 *  - `item`, `itemIndex`, `itemIdIndex`: same breakdown for the inner item.
 * @prop {Number} rowIndex - The index of the current row.
 * @prop {String|Number|Object} item - The actual data item (text/number/object) to render inside the column.
 * @prop {Object} data - Full data object for the current row, used to extract ID for per-ID styling.
 * @prop {String|Number} idIndex - The key used to extract the unique ID from the `data` object.
 *
 * @example
 * <NormalColumn
 *   :styles="styles.td"
 *   :customStyle="customStyle.td"
 *   :rowIndex="rowIndex"
 *   :item="item"
 *   :data="rowData"
 *   :idIndex="myTable.idIndex"
 * />
 */

import { defineProps } from 'vue';

const props = defineProps({
  styles: {
    type: Object,
    default: () => ({}),
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  rowIndex: {
    type: Number,
    required: true,
  },
  item: {
    type: [String, Number, Object],
    required: true,
    default: null,
  },
  data: {
    type: Object,
    required: true,
  },
  idIndex: {
    type: [String, Number],
    required: true,
  },
});
</script>
