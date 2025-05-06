import { popUpOrRoute } from "@/utils/customizableTable";
import { openDialog } from "@/composable/global/useDialogManager.js";

/**
 * Executes the action associated with an icon (e.g., view, edit, delete).
 * Redirects or opens a popup based on the `popUpOrRoute` configuration.
 *
 * @param {Object} icon - The action icon object.
 * @param {Object} router - Vue Router instance to navigate to route if needed.
 *
 * @example
 * executeActionIcon(viewIcon, router);
 */
export const executeActionIcon = (icon, router) => {
    if (icon?.popUpOrRoute?.isPopUpOrRoute === popUpOrRoute.route) {
        router.push(icon?.popUpOrRoute?.module);
    } else if (icon?.popUpOrRoute?.isPopUpOrRoute === popUpOrRoute.popUp) {
        openDialog(icon?.popUpOrRoute?.module);
    }
};

/**
 * Executes the action associated with a button (e.g., add, confirm, cancel).
 * Redirects or opens a popup based on the `popUpOrRoute` configuration.
 *
 * @param {Object} button - The action button object.
 * @param {Object} router - Vue Router instance to navigate to route if needed.
 *
 * @example
 * executeActionButton(confirmButton, router);
 */
export const executeActionButton = (button, router) => {
    if (button?.popUpOrRoute?.isPopUpOrRoute === popUpOrRoute.route) {
        router.push(button?.popUpOrRoute?.module);
    } else if (button?.popUpOrRoute?.isPopUpOrRoute === popUpOrRoute.popUp) {
        openDialog(button?.popUpOrRoute?.module);
    }
};
