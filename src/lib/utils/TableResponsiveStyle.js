/**
 * Responsive breakpoints used for determining column visibility based on screen size.
 *
 * @type {Object<string, number>}
 * @example
 * responsive.md // 767
 */
const responsive = {
    xxsm: 0,
    xsm: 400,
    xm: 480,
    sm: 639,
    md: 767,
    lg: 1023,
    xl: 1279,
    xxl: 1535,
};

/**
 * Determines which data configuration to use based on the current screen size.
 *
 * @param {number} screen - The current screen width.
 * @param {ResponsiveColumnConfig} item - An instance containing breakpoints and dataShow mapping.
 * @returns {Object|undefined} The column configuration for the matched breakpoint.
 */
export const responsiveDataShow = (screen, item) => {
    const breakPoints = item.breakpoints;
    for (let i = 0; i < breakPoints.length; i++) {
        if (responsiveStyle(screen, responsive[breakPoints[i]])) {
            return item.dataShow[breakPoints[i]];
        }
    }
};

/**
 * Checks if the current screen width matches a given breakpoint.
 *
 * @param {number} screen - The current screen width.
 * @param {number} breakpoints - The minimum width for the breakpoint.
 * @returns {boolean} True if screen is larger than the breakpoint.
 */
const responsiveStyle = (screen, breakpoints) => {
    return screen > breakpoints;
};
