<template>
  <div class="table__row__container">
    <div v-if="selectShow" class="table__checkbox-wrapper group">
      <input
          class="table__checkbox"
          type="checkbox"
          @change="toggleSelect"
          :checked="isSelected(id)"
      />
      <div class="table__tooltip group-hover">
        <div class="table__tooltip-text">Select</div>
      </div>
    </div>

    <div v-if="isSerialNoShow">{{ index + 1 }}</div>

    <div v-if="isExpandable" @click="toggleRow(index)">
      <slot name="expand-icon"></slot>
    </div>
  </div>
</template>


<script setup>
/**
 * @file SerialCheckboxColumn.vue
 * @description Renders the left-most cell in each table row containing:
 * a checkbox for selection, a serial number, and optionally an expand icon slot.
 * This is used inside the customizable table component.
 * @component
 *
 * @prop {Boolean} selectShow - Whether to show the checkbox for row selection.
 * @prop {Boolean} isSerialNoShow - Whether to display the serial number.
 * @prop {Boolean} isExpandable - Whether the row has expandable content.
 * @prop {Number} index - The index of the current row (used for serial and toggling).
 * @prop {String|Number} id - Unique identifier for the current row, used in selection logic.
 * @prop {Function} updateSelected - Callback to update selection state. Called with (id, index, isSelected).
 * @prop {Function} isSelected - Callback to determine if a given row is selected. Called with (id).
 *
 * @emits toggle-row(index) - Emitted when the expandable toggle icon is clicked.
 *
 * @example
 * <SerialCheckboxColumn
 *   :select-show="true"
 *   :is-serial-no-show="true"
 *   :is-expandable="true"
 *   :id="user.id"
 *   :index="index"
 *   :updateSelected="updateSelected"
 *   :isSelected="isSelected"
 *   @toggle-row="handleToggle"
 * >
 *   <template #expand-icon>
 *     <MyIcon />
 *   </template>
 * </SerialCheckboxColumn>
 */

const props=defineProps({
  selectShow: Boolean,
  isSerialNoShow: Boolean,
  isExpandable: Boolean,
  index: Number,
  id:[String,Number],
  updateSelected: {
    type: Function,
    required: true,
  },
  isSelected: {
    type: Function,
    required: true,
    default:true,
  },
});

const emit = defineEmits(['toggle-row']);

const toggleRow = (index) => {
  emit('toggle-row', index);
};
const toggleSelect = (event) => {
  if (event.target.checked) {
    props.updateSelected(props.id,props.index,true);
  } else {
    props.updateSelected(props.id,props.index,false);
  }
};
</script>

<style scoped>
.table__row__container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table__checkbox-wrapper {
  position: relative;
  margin-right: 0.2em;
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
  background-color: #007bff; /* blue */
  font-size: 0.7em;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25em;
  color: #ffffff;
  border-radius: 0.25em;
  margin-top: 0.5em;
  white-space: nowrap;
}

.group:hover .group-hover {
  display: block;
}

.table__tooltip-text {
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
}

</style>
