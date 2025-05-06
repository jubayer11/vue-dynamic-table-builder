<template>
  <div
      v-for="n in customRange"
      :key="n"
      :class="[
          styles.expandColumn.td.mainDiv,
          customStyle.expandColumn?.td?.mainDiv,
          customStyle?.expandColumn?.tdIndex[n]?.mainDiv
          ]"
  >
    <div
        v-if="!myTable?.skipColumn?.columnIndex[n]"
        :class="[
            styles.expandColumn.td.header,
             customStyle.expandColumn?.td?.header,
             customStyle?.expandColumn?.tdIndex[n]?.header
             ]"
    >
      {{ myTable?.headers[n] }}:
    </div>
    <div
        v-if="!myTable?.skipColumn?.columnIndex[n]"
        :class="[
            styles.expandColumn.td.data,
            customStyle.expandColumn?.td?.data,
            customStyle?.expandColumn?.tdIndex[n]?.data
        ]"
    >
      <!-- Specific Column Slot -->
      <slot

          name="expandableSpecificColumn"
          v-bind="{item: rowData[n],rowIndex: n,id:rowData[myTable?.idIndex] }"
      />

      <!-- Multiple Column Slot -->
      <slot
          name="expandableMultipleColumn"
          v-bind="{ index: n, data: rowData[n],rowData}"
      />

      <!-- Action Column Slot -->
      <slot
          name="expandableActionColumn"
          v-bind="{ index: n, data: rowData[n],rowData}"
      />

      <!-- Default Column -->
      <slot
          name="expandableNormalColumn"
          v-bind="{ index: n, data: rowData[n],rowData}"
      >
      </slot>
    </div>
  </div>
</template>

<script setup>
/**
 * @file ExpandableRowContent.vue
 * @description
 * This component is responsible for rendering the expanded content of a row when the user clicks the expand icon.
 * It dynamically iterates through visible columns defined by `customRange`, and renders content using scoped slots
 * based on the type of column (specific, multiple, action, or normal).
 *
 * @prop {Array<Number>} customRange - List of column indices to render in the expanded section.
 * @prop {Object} rowData - Data for the current row, used to populate each expanded cell.
 * @prop {Object} myTable - Configuration object for the entire table, including headers and skipColumn info.
 * @prop {Object} styles - Default style configuration object containing class names for layout and formatting.
 * @prop {Object} customStyle - User-defined overrides for styling. Accepts general and per-column overrides:
 *  - `expandColumn.td.mainDiv`, `expandColumn.td.header`, `expandColumn.td.data`
 *  - `expandColumn.tdIndex[n].mainDiv`, etc. (per column index)
 *
 * @slot expandableSpecificColumn - Used to render custom content for a "specific" column.
 * @slot expandableMultipleColumn - Used to render grouped data for a multiple column.
 * @slot expandableActionColumn - Used to render buttons or icons for actions.
 * @slot expandableNormalColumn - Used to render basic/default data when no other slot is matched.
 *
 * @example
 * <ExpandableRowContent
 *   :customRange="customRange"
 *   :rowData="rowData"
 *   :myTable="myTable"
 *   :styles="styles"
 *   :customStyle="customStyle"
 * >
 *   <template #expandableNormalColumn="{ index, data, rowData }">
 *     <!-- Custom content -->
 *   </template>
 * </ExpandableRowContent>
 */

import {onMounted} from "vue";

const props = defineProps({
  customRange: { type: Array, required: true },
  rowData: { type: Object, required: true },
  myTable: { type: Object, required: true },
  styles: { type: Object, required: true },
  customStyle: { type: Object, required: true },
});
onMounted(() => {
  console.log('Checking custom range:', props.customRange);
});
</script>
