
/**
 * Default class names used throughout the customizable table system.
 * These classes can be overridden by the user via the TableStyleConfig class.
 *
 * Structure:
 * - `main`: Main table wrapper.
 * - `pagination`: Classes related to pagination (including load-more variant).
 * - `head`: Table header styling (including sortable icons and th index-based control).
 * - `body`: Standard table row and cell styling.
 * - `multipleColumn`: Styling for multiple stacked columns in a single cell.
 * - `actionColumn`: Styles for action buttons or icons in a row.
 * - `td`: Styles for general data cells.
 * - `expandColumn`: Styling used in expandable rows.
 * - `sorting`: Styling for sorting icons.
 * - `itemPerPage`: Styles for item-per-page selector UI.
 *
 * All keys mirror structure in TableStyleConfig, making it easier to override.
 *
 * @type {Object}
 */

const tableStyles = {
    main: "table__main",
    pagination: {
        wrapper: 'table__pagination__wrapper',
        container: 'table__pagination__container',
        itemLink: 'table__pagination__itemLink',
        itemLinkClicked: 'table__pagination__itemLinkClicked',
        icon: 'table__pagination__icon__icon',
        path: ['table__pagination__icon__path1', 'table__pagination__icon__path2'],
        loadMore:{
            wrapper:'table__pagination__loadMore__wrapper',
            button:'table__pagination__loadMore__button',
            buttonClick:'table__pagination__loadMore__buttonClick',
            container:'table__pagination__loadMore__container',
            animation:'table__pagination__loadMore__animation',
            content:'table__pagination__loadMore__animation__content',
            contentClick:'table__pagination__loadMore__animation__contentClick',
        },
    },
    head: {
        head: "table__head",
        headTr: 'table__head__tr',
        headTh: 'table__head__th',
        headThSortItem: 'table__head__th__sortItem',
        headThSortIcon: {
            normal: {
                icon: 'table__head__th__sortIcon__icon',
                path: ['table__head__th__sortIcon__icon__path1', 'table__head__th__sortIcon__icon__path2'],
            },
            onClick: {
                icon: 'table__head__th__sortIcon__click__icon',
                path: 'table__head__th__sortIcon__click__icon__path',
            }
        },
        headThItem: 'table__head__th__item',
        headThIndex: {
            '0': 'table__head__th__0Index',
        },

    },
    body: {
        body: "table__body",
        bodyTr: "table__body__tr",
        bodyTd: "table__body__td",
    },
    multipleColumn: {
        multipleContainer: 'table__body__td__multipleColumn__wrapper',
        multipleContainerValue: 'table__body__td__multipleColumn__value',
    },
    actionColumn: {
        actionColumnWrapper: 'table__body__td__actionColumn__wrapper',
        actionColumnContainer: 'table__body__td__actionColumn__container',

        iconHover:{
            wrapper:'table__body__td__actionColumn__iconHover__wrapper',
            container:'table__body__td__actionColumn__iconHover__container',
            caret:'table__body__td__actionColumn__iconHover__caret',
            value:'table__body__td__actionColumn__iconHover__value',
        },

    },
    td: {
        wrapper: 'table__body__td__normal__wrapper',
        item: 'table__body__td__normal__item',
    },

    expandColumn: {
        icon: {
            plus: {
                wrapper: 'table__expandColumn__icon__plus__wrapper',
                icon: 'table__expandColumn__icon__plus__icon',
                path: ['table__expandColumn__icon__plus__icon__path1', 'table__expandColumn__icon__plus__icon__path2']
            },
            minus: {
                wrapper: 'table__expandColumn__icon__minus__wrapper',
                icon: 'table__expandColumn__icon__minus__icon',
                path: ['table__expandColumn__icon__minus__icon__path1', 'table__expandColumn__icon__minus__icon__path2']
            }
        },
        tr: 'table__expandColumn__tr',
        td: {
            td: 'table__expandColumn__td',
            mainDiv: 'table__expandColumn__td__mainDiv',
            header: 'table__expandColumn__td__mainDiv__header',
            data: 'table__expandColumn__td__mainDiv__data__main',
            normal: {
                wrapper: 'table__expandColumn__td__mainDiv__data__wrapper',
                Data: 'table__expandColumn__td__mainDiv__data__normal',
            }

        },
        multipleColumn: {
            multipleContainer: 'table__expandColumn__td__multipleColumn__wrapper',
            multipleContainerValue: 'table__expandColumn__td__multipleColumn__value',
        },
        actionColumn: {
            actionColumnWrapper: 'table__expandColumn__td__actionColumn__wrapper',
            actionColumnContainer: 'table__expandColumn__td__actionColumn__container',
            iconHover:{
                wrapper:'table__expandColumn__td__actionColumn__iconHover__wrapper',
                container:'table__expandColumn__td__actionColumn__iconHover__container',
                caret:'table__expandColumn__td__actionColumn__iconHover__caret',
                value:'table__expandColumn__td__actionColumn__iconHover__value',
            },
        },
    },
    sorting: {
        icon: 'table__action__wrapper__icon',
        path: ['table__action__wrapper__icon__path1', 'table__action__wrapper__icon__path2'],
        pathClick: ['table__action__wrapper__icon__path1', 'table__action__wrapper__icon__path2'],
    },
    itemPerPage: {
        wrapper: 'table__itemPerPage__wrapper',
        label: 'table__itemPerPage__label',
        field: 'table__itemPerPage__field',
    }

};

export default tableStyles;
