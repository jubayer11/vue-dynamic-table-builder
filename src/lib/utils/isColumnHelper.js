/**
 * Checks if the given column index corresponds to a specific column.
 *
 * @param {number|string} index - The column index to check.
 * @param {Object} myTable - The table configuration object (usually TableConfig instance).
 * @returns {boolean} `true` if the column is a specific column, otherwise `false`.
 */
export const isSpecificColumn = (index, myTable) => {
    return (
        myTable?.specificColumn?.isSpecific &&
        myTable?.specificColumn?.columnIndex[index] !== undefined
    );
};

/**
 * Checks if the given column index corresponds to a multiple column.
 *
 * @param {number|string} index - The column index to check.
 * @param {Object} myTable - The table configuration object.
 * @returns {boolean} `true` if the column is a multiple column, otherwise `false`.
 */
export const isMultipleColumn = (index, myTable) => {
    return (
        myTable?.multipleColumns?.isMultipleColumns &&
        myTable?.multipleColumns?.columnIndex[index] !== undefined
    );
};

/**
 * Checks if the given column index corresponds to an action column.
 *
 * @param {number|string} index - The column index to check.
 * @param {Object} myTable - The table configuration object.
 * @returns {boolean} `true` if the column is an action column, otherwise `false`.
 */
export const isActionColumn = (index, myTable) => {
    return (
        myTable?.actions?.isActions === true &&
        myTable?.actions?.columnIndex[index] !== undefined
    );
};

/**
 * Checks if the given column index is a normal column (not multiple, specific, or action).
 *
 * @param {number|string} index - The column index to check.
 * @param {Object} myTable - The table configuration object.
 * @returns {boolean} `true` if it's a normal column, otherwise `false`.
 */
export const isNormalColumn = (index, myTable) => {
    return (
        myTable?.multipleColumns?.columnIndex[index] === undefined &&
        myTable?.specificColumn?.columnIndex[index] === undefined &&
        myTable?.actions?.columnIndex[index] === undefined
    );
};
