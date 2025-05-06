/**
 * Starts the button animation by updating the style references.
 *
 * @param {Ref<boolean>} isButtonAnimation - A Vue ref that tracks animation state.
 * @param {Object} styles - Default style object (usually from internal config).
 * @param {Object} customStyles - Custom style overrides provided by the user.
 *
 * @example
 * startAnimation(isAnimating, defaultStyles, userStyles)
 */
export function startAnimation(isButtonAnimation, styles, customStyles) {
    isButtonAnimation.value = true;

    styles.loadMore.button = styles?.loadMore?.buttonClick;
    styles.loadMore.content = styles?.loadMore?.contentClick;

    customStyles.loadMore.button = customStyles?.loadMore?.buttonClick;
    customStyles.loadMore.content = customStyles?.loadMore?.contentClick;
}

/**
 * Stops the button animation by resetting styles to original values.
 *
 * @param {Ref<boolean>} isButtonAnimation - A Vue ref that tracks animation state.
 * @param {Object} styles - Default style object to revert.
 * @param {Object} customStyles - Custom style overrides to revert.
 * @param {Object} originalStyles - Snapshot of original style values.
 *
 * @example
 * stopAnimation(isAnimating, defaultStyles, userStyles, originalStyles)
 */
export function stopAnimation(isButtonAnimation, styles, customStyles, originalStyles) {
    isButtonAnimation.value = false;

    styles.loadMore.button = originalStyles.button;
    styles.loadMore.content = originalStyles.content;

    customStyles.loadMore.button = originalStyles.customButton;
    customStyles.loadMore.content = originalStyles.customContent;
}

/**
 * Captures the original styles for loadMore button and content.
 *
 * @param {Object} styles - Default styles used internally.
 * @param {Object} customStyle - User-provided custom styles.
 * @returns {Object} Snapshot of button and content styles from both sources.
 *
 * @example
 * const original = getOriginalStyles(defaultStyles, userStyles)
 */
export function getOriginalStyles(styles, customStyle) {
    return {
        button: styles.pagination.loadMore.button,
        content: styles.pagination.loadMore.content,
        customButton: customStyle.pagination?.loadMore?.button || '',
        customContent: customStyle.pagination?.loadMore?.content || '',
    };
}
