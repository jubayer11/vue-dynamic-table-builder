/**
 * Mapping of responsive breakpoints to their priority levels.
 * Lower numbers mean higher screen sizes.
 * Used for determining which column data to show based on screen width.
 *
 * @type {Object.<string, number>}
 */
export const breakPointsValue = {
    xxsm: 7,
    xsm: 6,
    xm: 5,
    sm: 4,
    md: 3,
    lg: 2,
    xl: 1,
    xxl: 0,
};

/**
 * Enum-like object representing the type of action trigger.
 *
 * @type {Object}
 * @property {number} route - Indicates a route redirection (e.g., `router.push()`).
 * @property {number} popUp - Indicates a pop-up/modal should be opened.
 * @property {number} neither - No action or external handler will be triggered.
 */
export const popUpOrRoute = {
    route: 0,
    popUp: 1,
    neither: 2,
};

/**
 * Enum-like object representing the visual type of an action.
 *
 * @type {Object}
 * @property {number} icon - The action is displayed as an icon.
 * @property {number} button - The action is displayed as a button.
 */
export const actionActivityType = {
    icon: 0,
    button: 1,
};
