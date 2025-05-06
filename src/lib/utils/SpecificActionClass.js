/**
 * Class representing a specific action in a table row.
 * Useful when a particular action needs to be conditionally customized or triggered
 * (e.g., only show "Edit" action or apply different behavior on a certain index).
 */
export class SpecificAction {
    /**
     * Create a specific action configuration.
     * @param {number} index - The index of the specific action within the action list.
     */
    constructor(index) {
        /**
         * Indicates this is a specific action (used for internal checks).
         * @type {boolean}
         */
        this.isSpecificAction = true;

        /**
         * The index of the action in the action list (e.g., 0 for first action).
         * @type {number}
         */
        this.actionIndex = index;
    }
}
