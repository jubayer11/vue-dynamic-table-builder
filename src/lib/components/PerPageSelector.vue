<template>
  <div :class="[styles?.wrapper, customStyles?.wrapper]">
    <label :class="[styles?.label, customStyles?.label]" for="perPage">
      {{ label }}
    </label>
    <select
        id="perPage"
        v-model="selectedOption"
        :class="[styles?.field, customStyles?.field]"
        @change="handleChange"
    >
      <option
          v-for="(option, index) in options"
          :key="index"
          :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
/**
 * @component PerPageSelector
 * @description
 * A reusable dropdown component for selecting the number of items to display per page in a table.
 * Emits `update:modelValue` when the selected value changes.
 *
 * @props {Array<number|string>} options - List of selectable options (e.g., [10, 20, 30]).
 * @props {string} [label='Items per page'] - Label text for the dropdown.
 * @props {Object} styles - Default style class mapping (e.g., wrapper, label, field).
 * @props {Object} customStyles - Custom style class overrides from the parent.
 * @props {string|number|null} modelValue - The currently selected option, used with `v-model`.
 *
 * @emits update:modelValue - Emitted when the user selects a new per-page value.
 *
 * @example
 * <PerPageSelector
 *   v-model="itemPerPage"
 *   :options="[10, 20, 50]"
 *   :label="'Rows per page'"
 *   :styles="defaultStyles"
 *   :customStyles="overrideStyles"
 * />
 */

import {ref} from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'Items per page',
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
  customStyles: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedOption = ref(props.modelValue);

const handleChange = () => {
  emit('update:modelValue', selectedOption.value);
};
</script>
