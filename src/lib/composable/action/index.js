import { actionActivityType } from "@/utils/customizableTable";
import { executeActionButton, executeActionIcon } from "@/composable/action/handle";

/**
 * Handles a user-triggered action on a table item, either by icon or button.
 *
 * @param {Object} item - The action configuration (either icon or button object).
 * @param {number|string} id - The ID of the item the action is being performed on.
 * @param {number} index - The index of the item in the table.
 * @param {number} type - The type of the action (0 = icon, 1 = button) based on `actionActivityType`.
 * @param {Object} myTable - The table configuration instance (not directly used here, but passed for future extensibility).
 * @param {Object} router - Vue Router instance used for route navigation if needed.
 *
 * @example
 * handleActionClick(editIcon, 5, 2, actionActivityType.icon, myTable, router);
 */
export function handleActionClick(item, id, index, type, myTable, router) {
    if (type === actionActivityType.icon) {
        executeActionIcon(item, router);
    }

    if (type === actionActivityType.button) {
        executeActionButton(item, router);
    }
}
