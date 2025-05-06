<template>
  <div
      :class="[
      styles.multipleContainer,
      customStyles?.multipleContainer,
      customStylesIndex?.multipleContainer,
      customStylesIdIndex?.multipleContainer,
    ]"
  >
    <div
        v-for="(value, itemIndex) in item"
        :key="itemIndex"
        :class="[
        styles.multipleContainerValue,
        customStyles?.multipleContainerValue,
        customStylesIndex?.multipleContainerValue,
        customStylesIdIndex?.multipleContainerValue,
      ]"
    >
      {{ value }}
    </div>
  </div>
</template>
<script setup>
/**
 * @file MultipleColumns.vue
 * @description Renders a group of values inside a table cell for columns that display multiple values.
 * This component is used in the customizable table body when a column is marked as a multiple-column type.
 * Each value is styled and displayed in a vertically stacked layout.
 *
 * @prop {Array} item - The array of values to display within the cell.
 * @prop {Object} styles - Default style classes applied to each part of the component.
 * @prop {Object} customStyles - General custom style overrides.
 * @prop {Object} customStylesIndex - Index-based custom style overrides (per column index).
 * @prop {Object} customStylesIdIndex - ID-based custom style overrides (per row ID and column index).
 *
 * @example
 * <MultipleColumns
 *   :item="['Email', 'SMS', 'Push']"
 *   :styles="styles.multipleColumn"
 *   :custom-styles="customStyle.multipleColumn"
 *   :custom-styles-index="customStyle.multipleColumnIndex[columnIndex]"
 *   :custom-styles-id-index="customStyle.multipleColumnIdIndex[rowId]?.[columnIndex]"
 * />
 */

defineProps({
  item: Array,
  styles: Object,
  customStyles: Object,
  customStylesIndex: Object,
  customStylesIdIndex: Object,
});
</script>
