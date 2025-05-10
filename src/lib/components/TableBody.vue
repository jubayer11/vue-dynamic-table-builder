<template>
  <tbody
      v-for="(data, colIndex) in myTable.data"
      :key="colIndex"
      :class="[
        styles.body.body,
        customStyle?.body?.body
      ]"
  >
  <tr
      :class="[
          styles.body.bodyTr,
          customStyle?.body?.bodyTr
        ]"
  >
    <!-- Serial/Checkbox Column -->
    <td
        v-if="myTable.isSerialNoShow || myTable.selectShow || myTable?.totalColumn > dataShowStyle.columnToShow"
    >
      <SerialCheckboxColumn
          :select-show="myTable.selectShow"
          :is-serial-no-show="myTable.isSerialNoShow"
          :is-expandable="myTable?.totalColumn > dataShowStyle.columnToShow"
          :id="data[myTable?.idIndex]"
          :index="colIndex"
          @toggle-row="toggleRow"
          :updateSelected="updateSelected"
          :isSelected="isSelected"
      >
        <template #expand-icon>
          <div
              v-if="isExpandPlusOrMinus[colIndex] === true"
              :class="[
                  styles?.expandColumn?.icon?.minus?.wrapper,
                  customStyle?.expandColumn?.icon?.minus?.wrapper
                ]"
          >
            <icon-minus
                :icon="styles.expandColumn.icon.minus.icon"
                :path="styles.expandColumn.icon.minus.path"
            ></icon-minus>
          </div>
          <div
              v-else
              :class="[
                  styles?.expandColumn?.icon?.plus?.wrapper,
                  customStyle?.expandColumn?.icon?.plus?.wrapper
                ]"
          >
            <icon-plus
                :icon="styles.expandColumn.icon.plus.icon"
                :path="styles.expandColumn.icon.plus.path"
            ></icon-plus>
          </div>
        </template>
      </SerialCheckboxColumn>
    </td>

    <!-- Table Columns -->
    <template v-for="(item, rowIndex) in data" :key="rowIndex">
      <td
          v-if="rowIndex < dataShowStyle.columnToShow && myTable?.skipColumn?.columnIndex[rowIndex] === undefined"
          :class="[
              styles.body.bodyTd,
              customStyle?.body?.bodyTd,
              customStyle?.body?.bodyTdIndex[rowIndex],
              customStyle?.body?.bodyTdIdIndex[data[myTable?.idIndex]]?.[rowIndex]
            ]"
      >


        <slot
            v-if="isSpecificColumn(rowIndex)"
            name="specific-column"
            :item="item"
            :colIndex="rowIndex"

            :id="data[myTable?.idIndex]"
        ></slot>

        <!-- Multiple Columns -->
        <MultipleColumns
            v-else-if="isMultipleColumn(rowIndex)"
            :item="item"
            :styles="styles.multipleColumn"
            :custom-styles="customStyle?.multipleColumn"
            :custom-styles-index="customStyle?.multipleColumnIndex[rowIndex]"
            :custom-styles-id-index="customStyle?.multipleColumnIdIndex[data[myTable?.idIndex]]?.[rowIndex]"
        />

        <!-- Action Column -->
        <ActionColumn
            v-else-if="isActionColumn(rowIndex)"
            :actions="myTable.actions"
            :styles="styles"
            :customStyle="customStyle"
            :dynamicActionIconComponent="dynamicActionIconComponent"
            :rowIndex="rowIndex"
            :item="item"
            :data="data"
            :idIndex="myTable.idIndex"
            :colIndex="colIndex"
            :actionClick="actionClick"

        />

        <!-- Normal Column -->
        <NormalColumn
            v-else
            :styles="styles.td"
            :customStyle="customStyle.td"
            :rowIndex="rowIndex"
            :item="item"
            :data="data"
            :idIndex="myTable.idIndex"
        />
      </td>
    </template>
  </tr>

  <!-- expandable-columns Rows -->
  <transition mode="out-in" name="slide">
    <tr
        v-if="expandIndex === colIndex"
        :class="[
            styles.expandColumn.tr,
            customStyle?.expandColumn?.tr
          ]"
    >
      <td
          :class="[
              styles.expandColumn.td.td,
              customStyle?.expandColumn?.td?.td
            ]"
          colspan="100%"
      >
        <ExpandableRowContent
            :customRange="customRange"
            :rowData="data"
            :myTable="myTable"
            :styles="styles"
            :customStyle="customStyle"
        >
          <template #expandableSpecificColumn="slotProps">
            <slot name="expandable-specific-column" v-bind="slotProps" />
          </template>

          <template #expandableMultipleColumn="{index,data,rowData}">
          <ExpandableMultipleColumn
              v-if="isMultipleColumn(index)"
              :index="index"
              :data="data"
              :id="rowData[myTable.idIndex]"
              :styles="styles?.expandColumn"
              :custom-styles="customStyle?.expandColumn"
          />
          </template>
          <template #expandableActionColumn="{index,data,rowData}">
            <ExpandableActionColumn
                v-if="isActionColumn(index)"
                :index="index"
                :data="data"
                :action="myTable.actions.columnIndex[index]"
                :rowData="rowData"
                :idIndex="myTable.idIndex"
                :dynamicActionIconComponent="dynamicActionIconComponent"
                :styles="styles.expandColumn"
                :custom-styles="customStyle?.expandColumn"
                :actionClick="actionClick"
                :colIndex="colIndex"

            />
          </template>
          <template #expandableNormalColumn="{index,data,rowData}">
            <ExpandableNormalColumn
                v-if="isNormalColumn(index)"
                :index="index"
                :data="data"
                :styles="styles.expandColumn?.td"
                :custom-style="customStyle?.expandColumn?.td"
                :id="rowData[myTable.idIndex]"

            />

          </template>

        </ExpandableRowContent>
      </td>
    </tr>
  </transition>
  </tbody>
</template>



<script setup>
/**
 * @file TableBody.vue
 * @description
 * Renders the main body of a customizable table, including serial/checkbox, normal, specific,
 * multiple, and action columns. Also supports expandable rows with scoped slots.
 *
 * @component
 *
 * @prop {Object} myTable - Main table configuration object, includes:
 *   - `data`: Array of rows (each row is an array of cell values)
 *   - `headers`: Array of header labels
 *   - `actions`: Configuration for action columns
 *   - `idIndex`: Index/key used to access a row's unique identifier
 *   - `totalColumn`: Total number of columns
 *   - `selectShow`: Whether checkbox select column is shown
 *   - `isSerialNoShow`: Whether serial numbers are shown
 *   - `skipColumn`: Object of skipped column indexes
 *
 * @prop {Object} styles - Default styles for the table body and its subcomponents.
 *
 * @prop {Object} customStyle - Optional custom styles allowing overrides by:
 *   - global scope: `customStyle.body.bodyTd`
 *   - column index: `customStyle.body.bodyTdIndex`
 *   - row ID and index: `customStyle.body.bodyTdIdIndex[id][index]`
 *
 * @prop {Object} dataShowStyle - Responsive style config object, usually from `responsiveDataShow()`.
 *
 * @prop {Function} isSpecificColumn - Function that returns true if a column is a specific/custom slot column.
 *
 * @prop {Function} isMultipleColumn - Function that returns true if a column contains multiple values.
 *
 * @prop {Function} isActionColumn - Function that returns true if a column is an action button/icon column.
 *
 * @prop {Function} isNormalColumn - Function that returns true if a column is a plain text/data column.
 *
 * @prop {Number|null} expandIndex - The index of the currently expanded row.
 *
 * @prop {Object} isExpandPlusOrMinus - Map of which rows are expanded (used for toggling +/- icon).
 *
 * @prop {Function} toggleRow - Callback to toggle row expansion (triggered by clicking the expand icon).
 *
 * @prop {Array} customRange - Array of indexes used in the expandable row to determine visible columns.
 *
 * @prop {Object|Function} dynamicActionIconComponent - Map of row-indexed dynamically loaded icon components.
 *
 * @prop {Function} actionClick - Main click handler for both icons and buttons in the action column.
 *
 * @prop {Function} updateSelected - Callback to add/remove rows to/from the selected rows state.
 *
 * @prop {Function} isSelected - Function to check if a specific row is selected.
 *
 * @prop {String} imgLocation - Base image path for rendering media (currently unused but prepared).
 *
 * @slot specific-column - Used to render custom content for specific columns.
 * @slot expandable-specific-column - Custom slot for expanded rows' specific columns.
 * @slot expandableMultipleColumn - Slot used to render multiple data points in expanded rows.
 * @slot expandableActionColumn - Slot used for expanded action columns.
 * @slot expandableNormalColumn - Slot used for expanded normal columns.
 *
 * @example
 * <TableBody
 *   :myTable="table"
 *   :styles="styles"
 *   :customStyle="customStyles"
 *   :dataShowStyle="responsiveStyle"
 *   :expandIndex="expandIndex"
 *   :customRange="customRange"
 *   :isExpandPlusOrMinus="expandMap"
 *   :toggleRow="handleToggleRow"
 *   :isSpecificColumn="checkSpecific"
 *   :isMultipleColumn="checkMultiple"
 *   :isActionColumn="checkAction"
 *   :isNormalColumn="checkNormal"
 *   :updateSelected="updateSelectedItem"
 *   :isSelected="isRowSelected"
 *   :dynamicActionIconComponent="iconRegistry"
 *   :actionClick="handleActionClick"
 * />
 */

import SerialCheckboxColumn from "@/components/SerialCheckboxColumn.vue";
import MultipleColumns from "@/components/MultipleColumn.vue";
import ActionColumn from "@/components/ActionColumn.vue";
import NormalColumn from "@/components/NormalColumn.vue";
import ExpandableRowContent from "@/components/expandable-columns/ExpandableRowContent.vue";

import ExpandableMultipleColumn from "@/components/expandable-columns/ExpandableMultipleColumn.vue";
import ExpandableActionColumn from "@/components/expandable-columns/ExpandableActionColumn.vue";
import ExpandableNormalColumn from "@/components/expandable-columns/ExpandableNormalColumn.vue";
import IconMinus from "@/components/Icon/iconMinus.vue";
import IconPlus from "@/components/Icon/iconPlus.vue";




const props = defineProps({
  myTable: { type: Object, required: true },
  styles: { type: Object, required: true },
  customStyle: { type: Object, default: () => ({}) },
  dataShowStyle: { type: Object, required: true },
  isSpecificColumn: { type: Function, required: true },
  isMultipleColumn: { type: Function, required: true },
  isActionColumn: { type: Function, required: true },
  isNormalColumn:{ type:Function, required:true},
  expandIndex: { type: Number, default: null },
  isExpandPlusOrMinus: { type: Object, default: () => ({}) },
  toggleRow: { type: Function, required: true },
  customRange: { type: Array, required: true },
  dynamicActionIconComponent: { type: [Object, Function], required: true },
  actionClick: { type: Function, required: true },
  updateSelected: {type: Function, required: true},
  isSelected: {type: Function, required: true},
  imgLocation: { type: String, default: "" },
});




</script>
