/**
 * TableConfig serves as the full configuration builder for the customizable table component.
 * This class allows the user to define headers, data, actions, styles, pagination, and
 * responsive behaviors using structured methods and properties.
 */
export class TableConfig {
    constructor() {
        /**
         * @property {Array} headers - Table column headers.
         */
        this.headers = [];

        /**
         * @property {Array} data - Table row data.
         */
        this.data = [];

        /**
         * @property {Object} multipleColumns - Configuration for column group layout.
         * @property {boolean} multipleColumns.isMultipleColumns - Toggle multiple column layout.
         * @property {Object} multipleColumns.columnIndex - Column keys marked as grouped.
         */
        this.multipleColumns = {
            isMultipleColumns: false,
            columnIndex: {},
        };

        /**
         * @property {Object} actions - Configuration for action column.
         * @property {boolean} actions.isActions - Toggle action column visibility.
         * @property {Object} actions.columnIndex - Map of column keys to activity types and action lists.
         */
        this.actions = {
            isActions: false,
            columnIndex: {},
        };

        /**
         * @property {Object} specificColumn - Columns rendered in a "specific" layout conditionally.
         */
        this.specificColumn = {
            isSpecific: false,
            columnIndex: {},
        };

        /**
         * @property {Object} skipColumn - Columns to hide from normal rendering.
         */
        this.skipColumn = {
            isSkip: false,
            columnIndex: {},
        };

        /**
         * @property {string|null} idIndex - Key name used to uniquely identify each row.
         */
        this.idIndex = null;

        /**
         * @property {boolean} isSerialNoShow - Whether to show serial/index column.
         */
        this.isSerialNoShow = false;

        /**
         * @property {boolean} selectShow - Whether to show checkboxes for row selection.
         */
        this.selectShow = false;

        /**
         * @property {Object} sorting - Configuration for sortable columns.
         */
        this.sorting = {
            isSorting: false,
            columnIndex: {},
        };

        /**
         * @property {string|null} totalColumn - Column key to calculate a total/sum.
         */
        this.totalColumn = null;

        /**
         * @property {Object} styleClasses - Custom CSS class overrides by table section or component.
         */
        this.styleClasses = {};

        /**
         * @property {Object} defaultNestedPropertyKeys - Keys and default structure for nested activity/action types.
         */
        this.defaultNestedPropertyKeys = {
            actionActivityType: 0,
            activityList: [],
        };

        /**
         * @property {Object} dataShow - Processed or sliced data used in rendering (e.g., paginated data).
         */
        this.dataShow = {};

        /**
         * @property {Object} itemPerPage - Configuration for per-page item selection.
         */
        this.itemPerPage = {
            isShow: false,
            label: 'Show',
            options: [5, 10, 20, 50, 100],
            value: 5,
        };

        /**
         * @property {Object} pagination - Full pagination configuration.
         * @property {boolean} pagination.isShow - Toggle pagination visibility.
         * @property {number} pagination.paginationType - 1 = standard, 2 = load-more
         * @property {Object} pagination.data - Pagination metadata (total, current page, etc.)
         */
        this.pagination = {
            isShow: false,
            paginationType: 1,
            data: {},
        };

        /**
         * @property {Object} selectedItem - Tracks selected rows.
         * @property {boolean} selectedItem.isAllSelected - Whether all rows are selected.
         * @property {Array} selectedItem.ids - Array of selected row IDs.
         */
        this.selectedItem = {
            isAllSelected: false,
            ids: [],
        };
    }

    // -----------------------------
    // Update Methods
    // -----------------------------

    /** @param {Array} value */
    updateHeaders(value) {
        this.headers = value;
    }

    /** @param {Array} value */
    updateData(value) {
        this.data = value;
    }

    /** @param {Object} value */
    updateDataShow(value) {
        this.dataShow = value;
    }

    /** @param {string} property */
    /** @param property
     @param {*} newValue */
    updateMultipleColumnsByProperty(property, newValue) {
        this.multipleColumns[property] = newValue;
    }

    /** @param {Array<string>} index */
    updateMultipleColumns(index) {
        this.multipleColumns.isMultipleColumns = true;
        for (let i = 0; i < index.length; i++) {
            this.multipleColumns.columnIndex[index[i]] = 1;
        }
    }

    /** @param {string} property */
    /** @param property
     @param {*} value */
    updateActionsByProperty(property, value) {
        this.actions[property] = value;
    }

    /** @param {string} property */
    /** @param property
     @param {*} value */
    updateSpecificColumn(property, value) {
        this.specificColumn[property] = value;
    }

    /** @param {*} value */
    updateIdIndex(value) {
        this.idIndex = value;
    }

    /**
     * Add a new action column entry.
     * @param {string} columnIndexKey
     * @param {number} type - Action type (e.g., button or icon).
     * @param {Array} activity - List of actions (view, edit, etc.).
     */
    updateActionColumnIndexProperty(columnIndexKey, type, activity) {
        this.actions.isActions = true;
        this.actions.columnIndex[columnIndexKey] = {
            actionActivityType: type,
            activityList: activity,
        };
    }

    /** @param {string} columnIndex */
    updateSpecificColumnIndexProperty(columnIndex) {
        this.specificColumn.isSpecific = true;
        this.specificColumn.columnIndex[columnIndex] = columnIndex;
    }

    /** @param {Array<string>} index */
    updateSpecificColumnIndexPropertyArray(index) {
        this.specificColumn.isSpecific = true;
        for (let i = 0; i < index.length; i++) {
            this.specificColumn.columnIndex[index[i]] = index[i];
        }
    }

    /** @param {Array<string>} index */
    updateSkipColumnIndexPropertyArray(index) {
        this.skipColumn.isSkip = true;
        for (let i = 0; i < index.length; i++) {
            this.skipColumn.columnIndex[index[i]] = index[i];
        }
    }

    /** @param {boolean} [value=true] */
    updateIsSerialNoShow(value = true) {
        this.isSerialNoShow = value;
    }

    /** @param {boolean} [value=true] */
    updateSelectShow(value = true) {
        this.selectShow = value;
    }

    /** @param {Object} value */
    updateSorting(value) {
        this.sorting = value;
    }

    /** @param {Array<string>} index */
    updateSortingColumnIndexWithoutStyleByProperty(index) {
        this.sorting.isSorting = true;
        for (let i = 0; i < index.length; i++) {
            this.sorting.columnIndex[index[i]] = index[i];
        }
    }

    /** @param {*} value */
    updateTotalColumn(value) {
        this.totalColumn = value;
    }

    /** @param {string} property */
    /** @param property
     @param {*} newValue */
    updateStyleClasses(property, newValue) {
        this.styleClasses[property] = newValue;
    }

    updateItemPerPage() {
        this.itemPerPage.isShow = true;
    }

    /** @param {number} value */
    updateItemPerPageValue(value) {
        this.itemPerPage.value = value;
    }

    /**
     * Enables pagination display.
     *
     * This method sets the `isShow` flag to `true`, ensuring that
     * pagination controls are visible in the table.
     */
    updatePagination() {
        this.pagination.isShow = true;
    }

    /**
     * Sets the pagination type to "Load More" mode.
     *
     * This assigns a value of `2` to `pagination.paginationType`,
     * which is interpreted by the table system as the "Load More" button style.
     */
    updatePaginationLoadMore() {
        this.pagination.paginationType = 2;
    }

    /**
     * Sets the pagination type to "Numbered" mode.
     *
     * This assigns a value of `1` to `pagination.paginationType`,
     * which renders standard numbered pagination controls.
     */
    updatePaginationNumber() {
        this.pagination.paginationType = 1;
    }

    /** @param {Object} value */
    updatePaginationData(value) {
        this.pagination.isShow=true;
        this.pagination.data = value;
    }

    /**
     * Handle checkbox selection logic based on row or all-select toggle.
     * @param {string|null} id
     * @param {number} index
     * @param {boolean} isChecked
     */
    updateCheckBox(id, index, isChecked) {
        if (id !== null) {
            this.updateSelectedItem(id, isChecked);
        } else if (isChecked) {
            this.updateAllSelect();
        } else {
            this.updateAllDeselect();
        }
    }

    /**
     * @param {string|number} id
     * @param {boolean} isChecked
     */
    updateSelectedItem(id, isChecked) {
        if (isChecked) {
            this.selectedItem.ids.push(id);
            if (this.selectedItem.ids.length === this.data.length) {
                this.selectedItem.isAllSelected = true;
            }
        } else {
            const index = this.selectedItem.ids.indexOf(id);
            if (index !== -1) {
                this.selectedItem.ids.splice(index, 1);
                this.selectedItem.isAllSelected = false;
            }
        }
    }

    updateAllSelect() {
        this.selectedItem.ids = [];
        for (const item of this.data) {
            this.selectedItem.ids.push(item[this.idIndex]);
        }
        this.selectedItem.isAllSelected = true;
    }

    updateAllDeselect() {
        this.selectedItem.ids = [];
        this.selectedItem.isAllSelected = false;
    }
}
