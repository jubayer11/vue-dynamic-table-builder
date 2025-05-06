/**
 * Base class for creating customizable action buttons used in the table system.
 * Each button holds a value, display content, optional styling classes, and
 * popup or route behavior configuration.
 */
export class ActionTypeButton {
    /**
     * @param {Object} config - Configuration object for the button.
     * @param {*} config.value - The value or identifier for the button.
     * @param {string} config.content - Text or HTML content displayed in the button.
     * @param {string} config.styleClasses - CSS classes for styling the button.
     * @param {Object} [config.popUpOrRoute] - Behavior configuration for popup or route.
     * @param {number} [config.popUpOrRoute.isPopUpOrRoute=0] - Behavior type (0=route, 1=popup).
     * @param {string} [config.popUpOrRoute.module=""] - Route path or dialog key.
     */
    constructor({ value, content, styleClasses, popUpOrRoute = {} }) {
        this.value = value;
        this.content = content;
        this.styleClasses = styleClasses;
        this.popUpOrRoute = popUpOrRoute;
    }

    /**
     * Update the button's style classes.
     * @param {string} value - CSS class string.
     */
    updateStyleClasses(value) {
        this.styleClasses = value;
    }

    /**
     * Update a single property in the popUpOrRoute object.
     * @param {string} property - Property name to update.
     * @param {*} value - Value to assign to the property.
     */
    updatePopUpOrRouteByProperty(property, value) {
        this.popUpOrRoute[property] = value;
    }

    /**
     * Set both the behavior type and module for popUpOrRoute.
     * @param {number} isPopUpOrRoute - 0 for route, 1 for popup.
     * @param {string} module - Route path or popup key.
     */
    updatePopUpOrRoute(isPopUpOrRoute, module) {
        this.popUpOrRoute.isPopUpOrRoute = isPopUpOrRoute;
        this.popUpOrRoute.module = module;
    }
}

// Utility to generate button configuration defaults
const createButtonConfig = (styleClasses) => ({
    styleClasses,
    popUpOrRoute: { isPopUpOrRoute: 0, module: '' },
});

/**
 * PrimaryNormal button with solid primary style.
 * @extends ActionTypeButton
 */
export class PrimaryNormalButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__primary__normal'),
        });
    }
}

/**
 * PrimaryOutline button with outlined primary style.
 * @extends ActionTypeButton
 */
export class PrimaryOutlineButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__primary__outline'),
        });
    }
}

/**
 * SecondaryNormal button with solid secondary style.
 * @extends ActionTypeButton
 */
export class SecondaryNormalButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__secondary__normal'),
        });
    }
}

/**
 * SecondaryOutline button with outlined secondary style.
 * @extends ActionTypeButton
 */
export class SecondaryOutlineButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__secondary__outline'),
        });
    }
}

/**
 * DisableNormal button with solid disabled style.
 * @extends ActionTypeButton
 */
export class DisableNormalButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__disable__normal'),
        });
    }
}

/**
 * DisableOutline button with outlined disabled style.
 * @extends ActionTypeButton
 */
export class DisableOutlineButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__disable__outline'),
        });
    }
}

/**
 * CancelNormal button with solid cancel style.
 * @extends ActionTypeButton
 */
export class CancelNormalButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__cancel__normal'),
        });
    }
}

/**
 * CancelOutline button with outlined cancel style.
 * @extends ActionTypeButton
 */
export class CancelOutlineButton extends ActionTypeButton {
    constructor(value, content) {
        super({
            value,
            content,
            ...createButtonConfig('customTable__button__cancel__outline'),
        });
    }
}
