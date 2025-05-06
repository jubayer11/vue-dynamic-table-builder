<template>
  <div
      :class="[
      styles?.actionColumn?.actionColumnWrapper,
      customStyle?.actionColumn?.actionColumnWrapper,
      customStyle?.actionColumnIndex[rowIndex]?.actionColumnWrapper
    ]"
  >
    <!-- ICON ACTIONS -->
    <div
        v-if="actions.columnIndex[rowIndex].actionActivityType.value === actionActivityType.icon"
        :class="[
        styles?.actionColumn?.actionColumnContainer,
        customStyle?.actionColumn?.actionColumnContainer,
        customStyle?.actionColumnIndex[rowIndex]?.actionColumnContainer
      ]"
    >
      <!-- Specific Action -->
      <div
          v-if="item?.isSpecificAction === true"
          :class="[
          actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.wrapper
        ]"
          class="customizableTable__ListIconRef my-group"
          @click="actionClick(
          actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex],
          data[idIndex],
          colIndex,
          actions.columnIndex[rowIndex].actionActivityType.value
        )"
      >
        <component
            :is="dynamicActionIconComponent[rowIndex][item?.actionIndex]"
            :icon="actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.icon"
            :path="actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.path"
            :stroke="actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.stroke"
        ></component>

        <!-- Hover Details -->
        <div
            :class="[
            styles?.actionColumn?.iconHover?.wrapper,
            customStyle?.actionColumn?.iconHover?.wrapper,
            actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.iconHover?.wrapper
          ]"
            class="my-child"
        >
          <div
              :class="[
              styles?.actionColumn?.iconHover?.container,
              customStyle?.actionColumn?.iconHover?.container,
              actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.iconHover?.container
            ]"
          >
            <div
                :class="[
                styles?.actionColumn?.iconHover?.caret,
                customStyle?.actionColumn?.iconHover?.caret,
                actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.iconHover?.caret
              ]"
            ></div>
            <div
                :class="[
                styles?.actionColumn?.iconHover?.value,
                customStyle?.actionColumn?.iconHover?.value,
                actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses?.iconHover?.value
              ]"
            >
              {{ actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.content }}
            </div>
          </div>
        </div>


      </div>

      <!-- Multiple Icons -->
      <div
          v-else
          v-for="(iconComponent, index) in actions.columnIndex[rowIndex].activityList"
          :key="index"
          :class="iconComponent?.styleClasses?.wrapper"
          class="customizableTable__ListIconRef my-group"
          @click="actionClick(
          iconComponent,
          data[idIndex],
          colIndex,
          actions.columnIndex[rowIndex].actionActivityType.value
        )"
      >
        <component
            :is="dynamicActionIconComponent[rowIndex][index]"
            :icon="iconComponent?.styleClasses?.icon"
            :path="iconComponent?.styleClasses?.path"
            :stroke="iconComponent?.styleClasses?.stroke"
        ></component>

        <div
            :class="[
            styles?.actionColumn?.iconHover?.wrapper,
            customStyle?.actionColumn?.iconHover?.wrapper,
            iconComponent?.styleClasses?.iconHover?.wrapper
          ]"
            class="my-child"
        >
          <div
              :class="[
              styles?.actionColumn?.iconHover?.container,
              customStyle?.actionColumn?.iconHover?.container,
              iconComponent?.styleClasses?.iconHover?.container
            ]"
          >
            <div
                :class="[
                styles?.actionColumn?.iconHover?.caret,
                customStyle?.actionColumn?.iconHover?.caret,
                iconComponent?.styleClasses?.iconHover?.caret,
              ]"
            ></div>
            <div
                :class="[
                styles?.actionColumn?.iconHover?.value,
                customStyle?.actionColumn?.iconHover?.value,
                iconComponent?.styleClasses?.iconHover?.value
              ]"
            >
              {{ iconComponent?.content }}
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- BUTTON ACTIONS -->
    <div
        v-else-if="actions.columnIndex[rowIndex].actionActivityType.value === actionActivityType.button"
        :class="[
        styles?.actionColumn?.actionColumnContainer,
        customStyle?.actionColumn?.actionColumnContainer,
        customStyle?.actionColumnIndex[rowIndex]?.actionColumnContainer
      ]"
    >
      <!-- Specific Button -->
      <button
          v-if="item?.isSpecificAction === true"
          :class="actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.styleClasses"
          class=" my-group"
          @click="actionClick(
          actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex],
          data[idIndex],
          colIndex,
          actions.columnIndex[rowIndex].actionActivityType.value
        )"
      >
        {{ actions?.columnIndex[rowIndex]?.activityList[item?.actionIndex]?.content }}
      </button>

      <!-- Multiple Buttons -->
      <div
          v-for="(buttonComponent, index) in actions.columnIndex[rowIndex].activityList"
          v-else
          :key="index"
          :class="buttonComponent?.styleClasses"
          class="my-group"
          @click="actionClick(
          buttonComponent,
          data[idIndex],
          colIndex,
          actions.columnIndex[rowIndex].actionActivityType.value
        )"
      >
        {{ buttonComponent?.content }}
      </div>
    </div>
  </div>
</template>

<script setup>

/**
 * @file ActionColumn.vue
 * @description This component is used inside the customizable table body to render actions (icons or buttons)
 * for each row in a specific column. It supports both multiple actions and specific (single) actions per row.
 * Actions can be either of type `icon` or `button`, and each is dynamically rendered with its associated click behavior.
 *
 * @prop {Object} actions - Action configuration object containing `columnIndex`, `activityList`, and `actionActivityType`.
 * @prop {Object} styles - Default style classes for layout and styling.
 * @prop {Object} customStyle - Custom override styles for per-column and per-row customizations.
 * @prop {Object} dynamicActionIconComponent - A registry of dynamically imported icon components used in the icon actions.
 * @prop {Number} rowIndex - The current row index for the column being rendered.
 * @prop {Object|Number} item - The current cell's action data. Can be an object with `isSpecificAction` and `actionIndex`, or just a primitive value.
 * @prop {Object} data - The full row data for the current row.
 * @prop {Number} colIndex - The column index of the current action cell.
 * @prop {Function} actionClick - A callback function triggered when an action is clicked. It receives the action item, row ID, colIndex, and action type.
 * @prop {String|Number} idIndex - The key used to extract the unique identifier from the row data.
 *
 * @example
 * <ActionColumn
 *   :actions="myTable.actions"
 *   :styles="styles"
 *   :customStyle="customStyle"
 *   :dynamicActionIconComponent="dynamicActionIconComponent"
 *   :rowIndex="index"
 *   :item="cellItem"
 *   :data="rowData"
 *   :colIndex="columnIndex"
 *   :actionClick="handleClick"
 *   :idIndex="myTable.idIndex"
 * />
 */


import {defineProps} from 'vue';

import {actionActivityType} from "@/utils/customizableTable";


const props = defineProps({
  actions: {
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
  dynamicActionIconComponent: {
    type: Object,
    required: true,
  },
  rowIndex: {
    type: Number,
    required: true,
  },
  item: {
    type: [Object, Number],
    default: () => ({}),
  },
  data: {
    type: Object,
    required: true,
  },
  colIndex: {
    type: Number,
    required: true,
  },


  actionClick: {
    type: Function,
    required: true,
  },
  idIndex: {
    type: [String, Number],
    required: true,
  },
});
</script>


<style scoped>
.my-group  {
  position: relative;
}
.my-group .my-child {
  display: none;
}

.my-group:hover .my-child {
  display: block;
}

</style>