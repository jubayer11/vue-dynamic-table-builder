<template>
  <div

      :class="[
          styles.normal?.wrapper,
          customStyle.normal?.wrapper,
          customStyle.normal?.wrapperIndex[index],
          customStyle.normal?.wrapperIdIndex[id]?.[index]
          ]"

  >
    <div
        :class="[
            styles.normal?.data,
            customStyle.normal?.data,
            customStyle.normal?.dataIndex[index],
            customStyle.normal?.dataIdIndex[id]?.[index]
            ]"
    >
      {{ data }}
    </div>
  </div>
</template>

<script setup>
/**
 * @file ExpandableNormalColumn.vue
 * @description
 * This component renders a **single cell** inside the expandable row section of a dynamic table.
 * It supports custom styling at the global level, per-column level, and per-row-id level.
 *
 * @prop {Number} index - The column index, used for applying specific styles.
 * @prop {String|Number|Object} data - The cell content to be displayed inside the expandable area.
 * @prop {Object} styles - Default/global style object containing `.normal.wrapper` and `.normal.data`.
 * @prop {Object} customStyle - Custom style overrides which may include:
 *   - `normal.wrapper`: global override
 *   - `normal.wrapperIndex[index]`: per-column override
 *   - `normal.wrapperIdIndex[id][index]`: per-row/column override
 * @prop {String|Number} id - Unique row identifier used to retrieve ID-based style overrides.
 *
 * @example
 * <ExpandableNormalColumn
 *   :index="3"
 *   :data="row['email']"
 *   :id="row.id"
 *   :styles="styles.expandColumn.td"
 *   :custom-style="customStyles.expandColumn.td"
 * />
 */

import {onMounted} from "vue";

const props = defineProps({
  index: { type: Number, required: true },
  data: { type: [String, Number, Object], required: true },
  styles: { type: Object, required: true },
  customStyle: { type: Object, required: true },
  id:{type:[String,Number],required:true}
});

onMounted(()=>{
  console.log('checking row data',props.id);
})

</script>

<style scoped>
/* Add styles if necessary */
</style>
