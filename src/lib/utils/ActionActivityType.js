/**
 * Base class representing the type of activity (e.g., icon or button) associated with an action column.
 */
class ActionActivityType {
    /**
     * Create an instance of ActionActivityType.
     * @param {number} value - Numeric identifier for the action type.
     */
    constructor(value) {
        /**
         * @type {number}
         * Represents the internal value of the action type.
         * For example: 0 for icon-based, 1 for button-based.
         */
        this.value = value;
    }
}

/**
 * Represents an action type that displays an inline icon (e.g., eye, pencil).
 * Used when the activity should appear as a clickable icon inside the table row.
 *
 * @extends ActionActivityType
 */
export class IconInlineActivityType extends ActionActivityType {
    constructor() {
        super(0); // 0 indicates icon type
    }
}

/**
 * Represents an action type that displays as a button.
 * Used when the activity should appear as a clickable button (e.g., Edit, Delete).
 *
 * @extends ActionActivityType
 */
export class ButtonActionActivityType extends ActionActivityType {
    constructor() {
        super(1); // 1 indicates button type
    }
}
