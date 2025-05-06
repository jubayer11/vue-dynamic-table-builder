<template>
  <div
      :class="[
      styles?.multipleColumn?.multipleContainer,
      customStyles?.multipleColumn?.multipleContainer,
      customStyles?.multipleColumnIndex?.[index]?.multipleContainer,
      customStyles?.multipleColumnIdIndex?.[id]?.[index]?.multipleContainer
    ]"
  >
    <div
        v-for="(value, itemIndex) in data"
        :key="itemIndex"
        :class="[
        styles?.multipleColumn?.multipleContainerValue,
        customStyles?.multipleColumn?.multipleContainerValue,
        customStyles?.multipleColumnIndex?.[index]?.multipleContainerValue,
        customStyles?.multipleColumnIdIndex?.[id]?.[index]?.multipleContainerValue
      ]"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup>
/**
 * @file ExpandableMultipleColumn.vue
 * @description
 * This component renders the content of a "multiple column" inside an expandable row.
 * Each item in the provided `data` array is rendered inside its own styled container.
 * Styles can be customized globally, per index, or per ID-based row+column combination.
 *
 * @prop {Number} index - The column index to determine which style overrides to apply.
 * @prop {Array} data - The array of values to render as separate sub-items in the cell.
 * @prop {Object} styles - Default style configuration object for multiple columns. Should include:
 *  - `multipleColumn.multipleContainer`
 *  - `multipleColumn.multipleContainerValue`
 * @prop {Object} customStyles - Optional custom styling object with the following keys:
 *  - `multipleColumn`: general custom styles
 *  - `multipleColumnIndex[index]`: per-column override
 *  - `multipleColumnIdIndex[id][index]`: per-row-per-column override
 * @prop {String|Number} id - Unique identifier of the current row to apply per-row style overrides.
 *
 * @example
 * <ExpandableMultipleColumn
 *   :index="4"
 *   :data="['A', 'B', 'C']"
 *   :id="123"
 *   :styles="styles"
 *   :customStyles="customStyles"
 * />
 */

const props = defineProps({
  index: { type: Number, required: true },
  data: { type: Array, required: true },
  styles: { type: Object, required: true },
  customStyles: { type: Object, required: true },
  id:{type:[String,Number],required:true}

});
</script>
