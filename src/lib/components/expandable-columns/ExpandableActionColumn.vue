<template>
  <div
      :class="[
      styles?.actionColumn?.actionColumnWrapper,
      customStyles?.actionColumn?.actionColumnWrapper,
      customStyles?.actionColumnIndex[index]?.actionColumnWrapper
    ]"
  >
    <!-- ICON ACTIONS -->
    <div
        v-if="action?.actionActivityType.value === actionActivityType.icon"
        :class="[
        styles?.actionColumn?.actionColumnContainer,
        customStyles?.actionColumn?.actionColumnContainer,
        customStyles?.actionColumnIndex[index]?.actionColumnContainer
      ]"
    >
      <!-- Specific Action -->
      <div
          v-if="data?.isSpecificAction === true"
          :class="action?.activityList[data?.actionIndex]?.styleClasses?.wrapper"
          class="my-group"
          @click="actionClick(
            action?.activityList[data?.actionIndex],
            rowData[idIndex],
            index,
            action.actionActivityType.value
          )"
      >
        <component
            :is="dynamicActionIconComponent[index]?.[data?.actionIndex]"
            :icon="action?.activityList[data?.actionIndex]?.styleClasses?.icon"
            :path="action?.activityList[data?.actionIndex]?.styleClasses?.path"
            :stroke="action?.activityList[data?.actionIndex]?.styleClasses?.stroke"
        ></component>

        <!-- Hover Details -->
        <div
            :class="[
            styles?.actionColumn?.iconHover?.wrapper,
            customStyles?.actionColumn?.iconHover?.wrapper,
            action?.activityList[data?.actionIndex]?.styleClasses?.iconHover?.wrapper
          ]"
            class="my-child"
        >
          <div
              :class="[
              styles?.actionColumn?.iconHover?.container,
              customStyles?.actionColumn?.iconHover?.container
            ]"
          >
            <div
                :class="[
                styles?.actionColumn?.iconHover?.caret,
                customStyles?.actionColumn?.iconHover?.caret
              ]"
            ></div>
            <div
                :class="[
                styles?.actionColumn?.iconHover?.value,
                customStyles?.actionColumn?.iconHover?.value
              ]"
            >
              {{ action?.activityList[data?.actionIndex]?.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- Multiple Icons -->
      <div
          v-else
          v-for="(iconComponent, idx) in action?.activityList"
          :key="idx"
          :class="iconComponent?.styleClasses?.wrapper"
          class="my-group"
          @click="actionClick(
            iconComponent,
            rowData[idIndex],
            index,
            action.actionActivityType.value
          )"
      >
        <component
            :is="dynamicActionIconComponent[index]?.[idx]"
            :icon="iconComponent?.styleClasses?.icon"
            :path="iconComponent?.styleClasses?.path"
            :stroke="iconComponent?.styleClasses?.stroke"
        ></component>
        <div
            :class="[
            styles?.actionColumn?.iconHover?.wrapper,
            customStyles?.actionColumn?.iconHover?.wrapper,
            iconComponent?.styleClasses?.expandIconHover?.wrapper,
          ]"
            class="my-child"
        >
          <div
              :class="[
              styles?.actionColumn?.iconHover?.container,
              customStyles?.actionColumn?.iconHover?.container,
              iconComponent?.styleClasses?.expandIconHover?.container,
            ]"
          >
            <div
                :class="[
                styles?.actionColumn?.iconHover?.caret,
                customStyles?.actionColumn?.iconHover?.caret,
                iconComponent?.styleClasses?.expandIconHover?.caret,
              ]"
            ></div>
            <div
                :class="[
                    styles.actionColumn?.iconHover?.value,
                    customStyles?.actionColumn?.iconHover?.value,
                    iconComponent?.styleClasses?.expandIconHover?.value,
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
        v-else-if="action?.actionActivityType.value === actionActivityType.button"
        :class="[
        styles?.actionColumn?.actionColumnContainer,
        customStyles?.actionColumn?.actionColumnContainer,
        customStyles?.actionColumnIndex[index]?.actionColumnContainer
      ]"
    >
      <button
          v-if="data?.isSpecificAction === true"
          :class="action?.activityList[data?.actionIndex]?.styleClasses"
          class="my-group"
          @click="actionClick(
            action?.activityList[data?.actionIndex],
            rowData[idIndex],
            index,
            action.actionActivityType.value
          )"
      >
        {{action?.activityList[data?.actionIndex]?.content }}
      </button>
      <button
          v-else
          v-for="(buttonComponent, idx) in action?.activityList"
          :key="idx"
          :class="buttonComponent?.styleClasses"
          class="customizableTable__ListIconRef relative"
          @click="actionClick(
            buttonComponent,
            rowData[idIndex],
            index,
            action.actionActivityType.value
          )"
      >
        {{ buttonComponent?.content }}
      </button>
    </div>
  </div>
</template>

<script setup>

/**
 * @file ExpandableActionColumn.vue
 * @description
 * This component is used inside expandable rows of a dynamic table to render
 * either **icon-based** or **button-based** actions. It supports both multiple
 * and specific actions and applies style overrides based on column index or row ID.
 *
 * @prop {Number} index - Column index used to apply per-column style overrides and to access actions.
 * @prop {Object|Number} data - The row cell data. If `isSpecificAction` is true, it includes `actionIndex`.
 * @prop {Object} action - The action configuration for this column. Includes:
 *   - `actionActivityType.value`: Indicates icon (0) or button (1).
 *   - `activityList`: List of icons or buttons to render.
 * @prop {Object} rowData - The entire data object of the current row, used to extract ID.
 * @prop {String|Number} idIndex - The key/index of the row’s unique identifier.
 * @prop {Object} dynamicActionIconComponent - Object mapping dynamic icon components to render.
 * @prop {Object} styles - Global style configuration object (e.g., for hover tooltips, wrappers, etc.).
 * @prop {Object} customStyles - Custom style overrides which can include:
 *   - `actionColumn`: general overrides,
 *   - `actionColumnIndex[index]`: per-column overrides
 * @prop {Function} actionClick - Callback function executed on click of an icon or button.
 *   Parameters: `(actionItem, id, index, actionTypeValue)`
 *
 * @example
 * <ExpandableActionColumn
 *   :index="2"
 *   :data="{ isSpecificAction: false }"
 *   :action="myTable.actions.columnIndex[2]"
 *   :rowData="row"
 *   :idIndex="'id'"
 *   :dynamicActionIconComponent="icons"
 *   :styles="styles"
 *   :customStyles="customStyles"
 *   :actionClick="onClickAction"
 * />
 */


import { onMounted} from 'vue';
import { actionActivityType } from "@/utils/customizableTable";


const props = defineProps({
  index: { type: Number, required: true },
  data: { type: [Object, Number], required: true },
  action: { type: Object, required: true },
  rowData: { type: Object, required: true },
  idIndex: { type: [String,Number], required: true },
  dynamicActionIconComponent: { type: Object, required: true },
  styles: { type: Object, required: true },
  customStyles: { type: Object, required: true },
  actionClick: { type: Function, required: true },

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
