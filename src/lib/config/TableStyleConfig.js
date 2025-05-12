import { isObject } from "@/utils/typeCheck.js";

/**
 * TableStyleConfig provides full control over the table's visual styling.
 * Supports global, per-index, and per-ID class overrides for all sections of the table,
 * including headers, body, pagination, expandable rows, and more.
 */
export class TableStyleConfig {
    constructor() {
        /** @type {string} Wrapper class for the main table */
        this.main = "";

        /** @type {object} Pagination styling */
        this.pagination = {
            wrapper: '',
            container: '',
            itemLink: '',
            itemLinkClicked: '',
            icon: '',
            path: [],
            loadMore: {
                wrapper: '',
                button: '',
                buttonClick: '',
                container: '',
                animation: '',
                content: '',
                contentClick: '',
            },
        };

        /** @type {object} Item-per-page dropdown styling */
        this.itemPerPage = {
            wrapper: '',
            label: '',
            field: '',
        };

        /** @type {object} Header styling */
        this.head = {
            head: '',
            headTr: '',
            headTh: '',
            headThSortItem: '',
            headThSortIcon: {
                isUpdated: 0,
                normal: {
                    icon: '',
                    path: [],
                },
                onClick: {
                    icon: '',
                    path: '',
                },
            },
            headThItem: '',
            headThIndex: { "0": "" },
        };

        /** @type {object} Body styling */
        this.body = {
            body: '',
            bodyTr: '',
            bodyTd: '',
            bodyTdIndex: {},
            bodyTdIdIndex: {},
        };

        /** @type {object} Multiple-column cell styling */
        this.multipleColumn = {
            multipleContainer: '',
            multipleContainerValue: '',
        };

        /** @type {object} Multiple-column styling by column index */
        this.multipleColumnIndex = {};

        /** @type {object} Multiple-column styling by ID and column index */
        this.multipleColumnIdIndex = {};

        /** @type {object} Action column styling */
        this.actionColumn = {
            actionColumnWrapper: '',
            actionColumnContainer: '',
            iconHover: {
                wrapper: '',
                container: '',
                caret: '',
                value: '',
            },
        };

        /** @type {object} Action column styling by column index */
        this.actionColumnIndex = {};

        /** @type {object} TD-level cell styling */
        this.td = {
            wrapper: '',
            item: '',
            wrapperIdIndex: {},
            itemIdIndex: {},
            wrapperIndex: {},
            itemIndex: {},
        };

        /** @type {object} Styling for specific columns */
        this.specificColumn = {};

        /** @type {string} Optional injected list-view component */
        this.listViewComponent = '';

        /** @type {object} Styling for expandable rows */
        this.expandColumn = {
            icon: {
                isUpdated: 0,
                plus: {
                    wrapper: '',
                    icon: '',
                    path: [],
                },
                minus: {
                    wrapper: '',
                    icon: '',
                    path: [],
                },
            },
            tr: '',
            td: {
                td: '',
                mainDiv: '',
                header: '',
                data: '',
                normal: {
                    wrapper: '',
                    data: '',
                    wrapperIndex: {},
                    dataIndex: {},
                    wrapperIdIndex: {},
                    dataIdIndex: {},
                },
            },
            tdIndex: {},
            multipleColumn: {
                multipleContainer: '',
                multipleContainerValue: '',
            },
            multipleColumnIndex: {},
            multipleColumnIdIndex: {},
            actionColumn: {
                actionColumnWrapper: '',
                actionColumnContainer: '',
                iconHover: {
                    wrapper: '',
                    container: '',
                    caret: '',
                    value: '',
                },
            },
            actionColumnIndex: {},
        };
    }

    /**
     * Dynamically update any deeply nested style using dot-notation.
     * Example: `update("pagination.loadMore.button", "my-class")`
     * @param {string} property - Dot-separated path to the style key
     * @param {*} value - New class value
     * @param {object} [obj=this] - Optional target object
     */
    update(property, value, obj = this) {
        const keys = property.split('.');
        const lastKey = keys.pop();
        let target = obj;
        for (const key of keys) {
            if (!(key in target)) throw new Error(`Property ${key} does not exist.`);
            target = target[key];
        }
        if (!(lastKey in target)) throw new Error(`Property ${lastKey} does not exist.`);
        target[lastKey] = value;
    }

    // ✅ Other methods are used for targeted updates.
    // Example:
    // - updateHeadThSortIconNormal(value)
    // - updateBodyTdIndex(index, value)
    // - updateExpandColumnMultipleContainerByIdIndex(id, index, value)
    // Each setter affects specific parts of the table visually.
    // Methods for updating individual values
    updateMain(value) {
        this.main = value;

    }
    updatePagination(property,value){
        this.pagination[property]=value;
    }
    updatePaginationLoadMore(property,value){
        this.pagination.loadMore[property]=value;
    }
    updateItemPerPage(property,value){
        this.itemPerPage[property]=value;
    }
    updateHead(value) {
        this.head.head = value;
    }

    updateHeadTr(value) {
        this.head.headTr = value;
    }

    updateHeadTh(value) {
        this.head.headTh = value;
    }

    updateHeadThSortItem(value) {
        this.head.headThSortItem = value;
    }

    updateHeadThSortIconNormal(value){
        this.head.headThSortIcon.isUpdated=1;
        this.head.headThSortIcon.normal=value;
    }
    updateHeadThSortIconOnClick(value){
        this.head.headThSortIcon.isUpdated=1;
        this.head.headThSortIcon.onClick=value;
    }
    updateHeadThSortIconNormalIcon(value) {
        this.head.headThSortIcon.isUpdated=1;
        this.head.headThSortIcon.normal.icon = value;
    }

    updateHeadThSortIconNormalPath(index, value) {
        this.head.headThSortIcon.isUpdated=1;
        this.head.headThSortIcon.normal.path[index] = value;
    }

    updateHeadThSortIconOnClickIcon(value) {
        this.head.headThSortIcon.isUpdated=1;
        this.head.headThSortIcon.onClick.icon = value;
    }

    updateHeadThSortIconOnClickPath(value) {
        this.head.headThSortIcon.isUpdated=1;
        this.head.headThSortIcon.onClick.path = value;
    }

    updateHeadThItem(value) {
        this.head.headThItem = value;
    }

    updateHeadThIndex(index, value) {
        this.head.headThIndex[index] = value;
    }

    updateBody(value) {
        this.body.body = value;
    }

    updateBodyTr(value) {
        this.body.bodyTr = value;
    }

    updateBodyTd(value) {
        this.body.bodyTd = value;
    }
    updateBodyTdIndex(index,value) {
        this.body.bodyTdIndex[index] = value;
    }
    updateBodyTdIdIndex(id,index,value) {
        this.body.bodyTdIdIndex[id]={};
        this.body.bodyTdIdIndex[id][index] = value;
    }

    updateMultipleContainer(value) {
        this.multipleColumn.multipleContainer = value;
    }

    updateMultipleContainerValue(value) {
        this.multipleColumn.multipleContainerValue = value;
    }
    updateMultipleContainerByIndex(index,value) {
        if (!isObject(this.multipleColumnIndex[index]))
        {
            this.multipleColumnIndex[index]={};
        }
        this.multipleColumnIndex[index].multipleContainer = value;
    }

    updateMultipleContainerValueByIndex(index,value) {

        if (!isObject(this.multipleColumnIndex[index]))
        {
            this.multipleColumnIndex[index]={};
        }
        this.multipleColumnIndex[index].multipleContainerValue = value;

    }


    updateMultipleContainerByIdIndex(id,index,value) {
        if (!isObject(this.multipleColumnIdIndex[id]))
        {
            this.multipleColumnIdIndex[id]={};
        }
        if (!isObject(this.multipleColumnIdIndex[id][index]))
        {
            this.multipleColumnIdIndex[id][index]={};
        }
        this.multipleColumnIdIndex[id][index].multipleContainer = value;
    }

    updateMultipleContainerValueByIdIndex(id,index,value) {

        if (!isObject(this.multipleColumnIdIndex[id]))
        {
            this.multipleColumnIdIndex[id]={};
        }
        if (!isObject(this.multipleColumnIdIndex[id][index]))
        {
            this.multipleColumnIdIndex[id][index]={};
        }
        this.multipleColumnIdIndex[id][index].multipleContainerValue = value;

    }




    updateActionColumnContainer(value) {
        this.actionColumn.actionColumnContainer = value;
    }
    updateActionColumnWrapper(value) {
        this.actionColumn.actionColumnWrapper = value;
    }

    updateActionColumnIconHover(property,value){
        this.actionColumn.iconHover[property]=value;
    }

    updateActionColumnWrapperByIndex(index,value) {
        this.actionColumnIndex[index]={};
        this.actionColumnIndex[index].actionColumnWrapper = value;
    }
    updateActionColumnContainerByIndex(index,value) {
        this.actionColumnIndex[index]={};
        this.actionColumnIndex[index].actionColumnContainer = value;
    }

    updateTdItem(value) {
        this.tdItem = value;
    }

    updateExpandColumnNormalData(property,value){
        this.expandColumn.td.normal[property]=value;
    }
    updateExpandColumnNormalDataIndex(property,index,value){
        if (!isObject(this.expandColumn.td.normal[property])){
            this.expandColumn.td.normal[property]={};
        }
        this.expandColumn.td.normal[property][index]=value;
    }
    updateExpandColumnNormalDataIdIndex(property,id,index,value){
        if (!isObject(this.expandColumn.td.normal[property][id])){
            this.expandColumn.td.normal[property][id]={};
        }
        this.expandColumn.td.normal[property][id][index]=value;
    }
    addExpandColumnNormalDataIdIndex(property,id,index,value){
        if (!isObject(this.expandColumn.td.normal[property][id])){
            this.expandColumn.td.normal[property][id]={};
        }
        this.expandColumn.td.normal[property][id][index]=this.expandColumn.td?.normal[property][id][index]+' '+value;
    }
    updateTdItemIdIndex(id,index,value) {
        if (!isObject(this.td.itemIdIndex[id])){
            this.td.itemIdIndex[id]={};
        }
        this.td.itemIdIndex[id][index]=value;
    }
    addTdItemIdIndex(id,index,value) {
        if (!isObject(this.td.itemIdIndex[id])){
            this.td.itemIdIndex[id]={};
        }
        this.td.itemIdIndex[id][index]=this.td?.itemIdIndex[id][index]+' '+value;
    }
    updateTdWrapperIdIndex(id,index,value) {
        this.td.wrapperIdIndex[id]={};
        this.td.wrapperIdIndex[id][index]=value;
    }
    updateTdItemIndex(index,value) {
        if (!isObject(this.td.itemIndex[index])){
            this.td.itemIndex[index]={};
        }
        this.td.itemIndex[index]=value;
    }
    updateTdWrapperIndex(index,value) {
        if (!isObject(this.td.wrapperIndex[index])){
            this.td.wrapperIndex[index]={};
        }
        this.td.wrapperIndex[index]=value;
    }
    updateSpecificColumnByIndex(index,value) {
        this.specificColumn[index] = value;
    }

    updateListViewComponent(value) {
        this.listViewComponent = value;
    }

    updateExpandColumnIconPlusWrapper(value) {
        this.expandColumn.icon.plus.wrapper = value;
    }

    updateExpandColumnIconPlusIcon(value) {
        this.expandColumn.icon.isUpdated=1;
        this.expandColumn.icon.plus.icon = value;
    }

    updateExpandColumnIconPlusPath(index, value) {
        this.expandColumn.icon.isUpdated=1;
        this.expandColumn.icon.plus.path[index] = value;
    }

    updateExpandColumnIconMinusWrapper(value) {
        this.expandColumn.icon.minus.wrapper = value;
    }

    updateExpandColumnIconMinusIcon(value) {
        this.expandColumn.icon.isUpdated=1;
        this.expandColumn.icon.minus.icon = value;
    }

    updateExpandColumnIconMinusPath(index, value) {
        this.expandColumn.icon.isUpdated=1;
        this.expandColumn.icon.minus.path[index] = value;
    }

    updateExpandColumnTr(value) {
        this.expandColumn.tr = value;
    }

    updateExpandColumnTd(value) {
        this.expandColumn.td.td = value;
    }

    updateExpandColumnMainDiv(value) {
        this.expandColumn.td.mainDiv = value;
    }
    updateExpandColumnTdIndexMainDiv(index,value) {
        this.expandColumn.tdIndex[index]={};
        this.expandColumn.tdIndex[index].mainDiv = value;
    }

    updateExpandColumnHeader(value) {
        this.expandColumn.td.header = value;
    }
    updateExpandColumnTdIndexHeader(index,value) {
        this.expandColumn.tdIndex[index]={};
        this.expandColumn.tdIndex[index].header = value;
    }
    updateExpandColumnData(value) {
        this.expandColumn.td.data = value;
    }
    updateExpandColumnTdIndexData(index,value) {
        this.expandColumn.tdIndex[index]={};
        this.expandColumn.tdIndex[index].data = value;
    }


    updateExpandColumnMultipleContainer(value) {
        this.expandColumn.multipleColumn.multipleContainer = value;
    }

    updateExpandColumnMultipleContainerValue(value) {
        this.expandColumn.multipleColumn.multipleContainerValue = value;
    }
    updateExpandColumnMultipleContainerByIndex(index,value) {
        if (!isObject(this.expandColumn.multipleColumnIndex[index]))
        {
            this.expandColumn.multipleColumnIndex[index]={};
        }
        this.expandColumn.multipleColumnIndex[index].multipleContainer = value;
    }

    updateExpandColumnMultipleContainerValueByIndex(index,value) {
        if (!isObject(this.expandColumn.multipleColumnIndex[index]))
        {
            this.expandColumn.multipleColumnIndex[index]={};
        }
        this.expandColumn.multipleColumnIndex[index].multipleContainerValue = value;
    }



    updateExpandColumnMultipleContainerByIdIndex(id,index,value) {
        if (!isObject(this.expandColumn.multipleColumnIdIndex[id]))
        {
            this.expandColumn.multipleColumnIdIndex[id]={};
        }
        if (!isObject(this.expandColumn.multipleColumnIdIndex[id][index]))
        {
            this.expandColumn.multipleColumnIdIndex[id][index]={};
        }
        this.expandColumn.multipleColumnIdIndex[id][index].multipleContainer = value;
    }

    updateExpandColumnMultipleContainerValueByIdIndex(id,index,value) {
        if (!isObject(this.expandColumn.multipleColumnIdIndex[id]))
        {
            this.expandColumn.multipleColumnIdIndex[id]={};
        }
        if (!isObject(this.expandColumn.multipleColumnIdIndex[id][index]))
        {
            this.expandColumn.multipleColumnIdIndex[id][index]={};
        }

        this.expandColumn.multipleColumnIdIndex[id][index].multipleContainerValue = value;
        //console.log(this.expandColumn.multipleColumnIdIndex[id]);
    }

    updateExpandColumnActionColumnWrapper(value) {
        this.expandColumn.actionColumn.actionColumnWrapper = value;
    }
    updateExpandColumnActionColumnContainer(value) {
        this.expandColumn.actionColumn.actionColumnContainer = value;
    }
    updateExpandColumnActionColumnIconHover(property,value) {
        this.expandColumn.actionColumn.iconHover[property] = value;
    }


    updateExpandColumnActionColumnContainerByIndex(index,value) {
        this.expandColumn.actionColumnIndex[index]={};
        this.expandColumn.actionColumnIndex[index].actionColumnContainer = value;
    }
    updateExpandColumnActionColumnWrapperByIndex(index,value) {
        this.expandColumn.actionColumnIndex[index]={};
        this.expandColumn.actionColumnIndex[index].actionColumnWrapper = value;
    }
}


