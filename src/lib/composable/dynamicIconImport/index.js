import { iconComponents } from '@/composable/dynamicIconImport/iconRegistry.js';
import { defineAsyncComponent } from 'vue';

/**
 * Local registry for caching loaded dynamic icon components.
 * Prevents redundant imports.
 * @type {Record<string, ReturnType<typeof defineAsyncComponent>>}
 */
const dynamicComponentRegistry = {};

/**
 * Dynamically imports and registers Vue icon components for each action item in the table.
 * It caches components by `iconType` to avoid re-importing the same icons.
 *
 * @param {Object} item - The action column item containing an `activityList`.
 * @param {string|number} key - The table row or action group key (e.g., row ID or index).
 * @param {import('vue').Ref<Record<string|number, Record<number, ReturnType<typeof defineAsyncComponent>>>>} dynamicActionIconComponent -
 *        A reactive object where imported components are stored by `key` and activity index.
 */
export function importDynamicIconComponent(item, key, dynamicActionIconComponent) {
    dynamicActionIconComponent.value[key] = {};

    for (let i = 0; i < item.activityList.length; i++) {
        const iconType = item?.activityList[i]?.iconType;

        if (!iconType) {
            console.error(`Missing iconType for activity at index ${i}`);
            continue;
        }

        if (!dynamicComponentRegistry[iconType]) {
            dynamicActionIconComponent.value[key][i] = defineAsyncComponent(
                iconComponents[iconType] || iconComponents.iconPlus // fallback icon
            );
            dynamicComponentRegistry[iconType] = dynamicActionIconComponent.value[key][i];
        } else {
            dynamicActionIconComponent.value[key][i] = dynamicComponentRegistry[iconType];
        }
    }
}
