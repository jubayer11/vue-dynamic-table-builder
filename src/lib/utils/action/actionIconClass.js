/**
 * Base class for ActionType icons used in action columns.
 */
export class ActionTypeIcon {
    /**
     * @param {Object} options
     * @param {number|string} options.value - Unique identifier or value for the action.
     * @param {string} options.content - Label or description for the icon action.
     * @param {string} options.iconType - Icon name identifier.
     * @param {Object} [options.popUpOrRoute={}] - Popup or route configuration.
     * @param {Object} [options.styleClasses={}] - CSS class configuration.
     */
    constructor({ value, content, iconType, popUpOrRoute = {}, styleClasses = {} }) {
        this.value = value;
        this.content = content;
        this.iconType = iconType;
        this.popUpOrRoute = popUpOrRoute;
        this.styleClasses = styleClasses;
    }

    /**
     * Update a specific style class property.
     * @param {string} property - The property name to update.
     * @param {string} newValue - The new class name.
     */
    updateStyleClasses(property, newValue) {
        this.styleClasses[property] = newValue;
    }

    /**
     * Update popup or route configuration.
     * @param {number} id - Identifier for popup or route.
     * @param {string} module - Related module name.
     */
    updatePopUpOrRoute(id, module) {
        this.popUpOrRoute.isPopUpOrRoute = id;
        this.popUpOrRoute.module = module;
    }

    /**
     * Update the icon type.
     * @param {string} value - New icon type.
     */
    updateIconType(value) {
        this.iconType = value;
    }

    /**
     * Update any property directly.
     * @param {string} property - Property key.
     * @param {*} value - New value to assign.
     */
    updateProperty(property, value) {
        this[property] = value;
    }

    /**
     * Update only popup type.
     * @param {number} value
     */
    updateIsPopUp(value) {
        this.popUpOrRoute.isPopUpOrRoute = value;
    }

    /**
     * Update popup or route module.
     * @param {string} value
     */
    updateIsPopUpOrRouteModule(value) {
        this.popUpOrRoute.module = value;
    }
}

/**
 * Utility function to generate default styleClasses for Action Icons.
 * @param {string} baseClass
 * @param {boolean} [useWrapper=false]
 * @returns {Object}
 */
const createStyleClasses = (baseClass, useWrapper = false) => {
    const classPrefix = `${baseClass}__wrapper`;
    return {
        wrapper: useWrapper ? `${classPrefix}` : '',
        icon: `${classPrefix}__icon`,
        path: [`${classPrefix}__icon__path1`, `${classPrefix}__icon__path2`],
        stroke: [`${classPrefix}__icon__stroke1`, `${classPrefix}__icon__stroke2`],
        iconHover: {
            wrapper: '',
            container: '',
            caret: '',
            value: '',
        },
        expandIconHover: {
            wrapper: '',
            container: '',
            caret: '',
            value: '',
        },
    };
};

/**
 * A standardized icon action with default styles.
 */
export class StandardActionIcon extends ActionTypeIcon {
    /**
     * @param {Object} options
     * @param {number|string} options.value
     * @param {string} options.content
     * @param {string} options.iconType
     * @param {string} options.baseClass
     * @param {string} [options.module='']
     * @param {number} [options.isPopUpOrRoute=0]
     * @param {boolean} [options.useWrapper=false]
     */
    constructor({ value, content, iconType, baseClass, module = '', isPopUpOrRoute = 0, useWrapper = false }) {
        super({
            value,
            content,
            iconType,
            popUpOrRoute: {
                isPopUpOrRoute,
                module,
            },
            styleClasses: createStyleClasses(baseClass, useWrapper),
        });
    }
}

// Below are specific standard action types with predefined configurations

/** View icon */
export class ViewActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 1,
            content: 'view',
            iconType: 'iconView',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** Edit icon */
export class EditActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 2,
            content: 'edit',
            iconType: 'iconEdit',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** Delete/Destroy icon */
export class DestroyActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 3,
            content: 'delete',
            iconType: 'iconDestroy',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** SMS icon */
export class SmsActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 4,
            content: 'sms',
            iconType: 'iconPhoneText',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** Message icon */
export class MessageActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 5,
            content: 'Message',
            iconType: 'iconMessage',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** Email icon */
export class EmailActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 6,
            content: 'email',
            iconType: 'iconEmail',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** List icon */
export class ListActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 7,
            content: 'click',
            iconType: 'iconList',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}

/** Add User icon */
export class AddUserActionIcon extends StandardActionIcon {
    constructor(useWrapper = true) {
        super({
            value: 19,
            content: 'add user',
            iconType: 'iconAddUser',
            baseClass: 'table__action',
            useWrapper,
        });
    }
}
