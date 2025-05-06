import { ref } from 'vue';

/**
 * Reactive object to store dialog open/close states by key.
 * @type {import('vue').Ref<Record<string, boolean>>}
 */
export const dialog = ref({});

/**
 * Reactive reference to track the currently opened dialog key.
 * @type {import('vue').Ref<string>}
 */
export const dialogValue = ref('');

/**
 * Opens a dialog for a specific key and sets it as the active dialog.
 *
 * @param {string} key - Unique key representing the dialog to open.
 */
export function openDialog(key) {
    dialog.value = {
        ...dialog.value,
        [key]: true,
    };
    dialogValue.value = key;
    console.log(dialogValue);
}

/**
 * Closes a dialog for a specific key and resets the active dialog value.
 *
 * @param {string} key - Unique key representing the dialog to close.
 */
export function closeDialog(key) {
    dialog.value = {
        ...dialog.value,
        [key]: false,
    };
    dialogValue.value = '';
}

/**
 * Checks if a specific dialog key is currently open.
 *
 * @param {string} key - The key of the dialog to check.
 * @returns {boolean} `true` if the dialog is open, `false` otherwise.
 */
export function isDialogOpen(key) {
    return !!dialog.value[key];
}
