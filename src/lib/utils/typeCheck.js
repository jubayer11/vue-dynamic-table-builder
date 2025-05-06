/**
 * Checks if a given value is a non-null object.
 *
 * @param {*} obj - The value to check.
 * @returns {boolean} True if the value is an object and not null.
 *
 * @example
 * isObject({}) // true
 * isObject(null) // false
 * isObject([]) // true
 * isObject(42) // false
 */
export function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
