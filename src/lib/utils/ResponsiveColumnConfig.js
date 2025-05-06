/**
 * Class representing the responsive column configuration for a table.
 * It allows setting which columns should be shown at different breakpoints.
 */
export class ResponsiveColumnConfig {
    /**
     * Creates a new ResponsiveColumnConfig instance.
     * @param {number} columnToShow - Default number of columns to show for all breakpoints.
     */
    constructor(columnToShow) {
        /**
         * Ordered list of breakpoints (from largest to smallest).
         * @type {string[]}
         */
        this.breakpoints = ['xxl', 'xl', 'lg', 'md', 'sm', 'xm', 'xsm', 'xxsm'];

        /**
         * Object holding column visibility settings for each breakpoint.
         * @type {Object.<string, { columnToShow: number }>}
         */
        this.dataShow = {};

        /**
         * Default number of columns to show.
         * @type {number}
         */
        this.columnToShow = columnToShow;

        this.initializeDataShow();
    }

    /**
     * Initializes column visibility data for all breakpoints using the default columnToShow value.
     */
    initializeDataShow() {
        this.breakpoints.forEach(breakpoint => {
            this.dataShow[breakpoint] = { columnToShow: this.columnToShow };
        });
    }

    /**
     * Sets the number of columns to show for a specific breakpoint.
     * @param {string} breakpoint - The breakpoint key (e.g., 'md').
     * @param {number} columnToShow - Number of columns to show.
     */
    setColumnToShowByProperty(breakpoint, columnToShow) {
        if (this.dataShow[breakpoint]) {
            this.dataShow[breakpoint].columnToShow = columnToShow;
        } else {
            console.error(`Breakpoint ${breakpoint} not found.`);
        }
    }

    /**
     * Sets column visibility using an index from the breakpoint list.
     * @param {number} index - Index of the breakpoint in the list.
     * @param {number} columnToShow - Number of columns to show.
     */
    setColumnByBreakPointsArray(index, columnToShow) {
        if (this.dataShow[this.breakpoints[index]]) {
            this.dataShow[this.breakpoints[index]].columnToShow = columnToShow;
        }
    }

    /**
     * Sets column visibility across a range of breakpoints (looping from end to start index).
     * @param {number} start - Start index (e.g., 2 for 'lg').
     * @param {number} end - End index (e.g., 5 for 'xm').
     * @param {number} columnToShow - Number of columns to show.
     */
    setColumnByLoopInProperty(start, end, columnToShow) {
        for (let i = end; i <= start; i++) {
            if (this.dataShow[this.breakpoints[i]]) {
                this.dataShow[this.breakpoints[i]].columnToShow = columnToShow;
            }
        }
    }

    /**
     * Gets the number of columns to show for a given breakpoint.
     * @param {string} breakpoint - The breakpoint key (e.g., 'sm').
     * @returns {number|null} The number of columns, or null if not found.
     */
    getColumnToShow(breakpoint) {
        if (this.dataShow[breakpoint]) {
            return this.dataShow[breakpoint].columnToShow;
        } else {
            console.error(`Breakpoint ${breakpoint} not found.`);
            return null;
        }
    }

    /**
     * Returns the full `dataShow` object mapping breakpoints to column counts.
     * @returns {Object.<string, { columnToShow: number }>}
     */
    getAllDataShow() {
        return this.dataShow;
    }

    /**
     * Replaces the breakpoints list and reinitializes the column configuration.
     * @param {string[]} newBreakPoints - New list of breakpoint keys.
     */
    updateBreakPoints(newBreakPoints) {
        this.breakpoints = newBreakPoints;
        this.initializeDataShow();
    }
}
