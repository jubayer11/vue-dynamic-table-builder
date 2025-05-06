<template>
  <div class="neu-glow-inset p-[1em]">
    <customizable-table
        :myTable="myTable"
        :customStyle="tableCustomStyle"
        :onPaginate="handlePagination"
        :onSelectorChange="handleSelectorChange"
        :onActionClick="handleActionClick"
    >
      <template #specific-column="{ item, rowIndex, id }">
      <div v-if="rowIndex===0">
        {{item}}
      </div>
        <div style="background-color: red;color: white" v-else>
          {{item}}
        </div>
      </template>
      <template #expandable-specific-column="{ item, rowIndex, id }">
        <div v-if="rowIndex===0">
          {{item}}
        </div>
        <div v-else>
          {{item}}
        </div>
      </template>
    </customizable-table>
    <div v-if="dialog.editIcon">
      <div @click="closeDialog('editIcon')">
        hi. This is jubayer ahmed
      </div>
    </div>


    <router-view  :key="fullPath" />
  </div>
</template>
<script setup>
import CustomizableTable from "@/components/index.vue";
import {computed, reactive, ref, watch} from "vue";
import {TableStyleConfig} from "@/utils/TableStyleConfig.js";
import {TableConfig} from "@/utils/TableConfig.js";
import {
  DestroyActionIcon,
  EditActionIcon,
  ViewActionIcon
} from "@/utils/action/actionIconClass";
import {ResponsiveColumnConfig} from "@/utils/ResponsiveColumnConfig.js";
import {IconInlineActivityType} from "@/utils/ActionActivityType.js";
import {breakPointsValue, popUpOrRoute} from "@/utils/customizableTable";
import {useRoute, useRouter} from "vue-router";
import {dialog,  closeDialog} from "@/composable/global/useDialogManager.js";




const router=useRouter();


const route = useRoute();
const fullPath = computed(() => route.fullPath);



const headers=ref(['Name','capacity','Players','Has Couch','has Schedule','Accepting New Members','Created Date','Action']);


// Mock groupList for testing
const groupList = ref([
  {
    id: 1,
    profileImage: 'https://via.placeholder.com/40',
    name: 'Group Alpha',
    capacity: 20,
    players: 15,
    hasCoach: 1,
    hasSchedule: 1,
    isAccepting: 1,
    createdDate: '2025-05-04'
  },
  {
    id: 2,
    profileImage: 'https://via.placeholder.com/40',
    name: 'Group Beta',
    capacity: 25,
    players: 20,
    hasCoach: 0,
    hasSchedule: 1,
    isAccepting: 1,
    createdDate: '2025-05-02'
  },
  {
    id: 3,
    profileImage: null,
    name: 'Group Gamma',
    capacity: 18,
    players: 18,
    hasCoach: 1,
    hasSchedule: 0,
    isAccepting: 0,
    createdDate: '2025-05-01'
  }
])
const groupListPagination = ref({
  current_page: 1,
  first_page_url: 'http://localhost?page=1',
  from: 1,
  last_page: 5,
  last_page_url: 'http://localhost?page=5',
  links: [
    { url: null, label: '&laquo; Previous', active: false },
    { url: 'http://localhost?page=1', label: '1', active: true },
    { url: 'http://localhost?page=2', label: '2', active: false },
    { url: 'http://localhost?page=3', label: '3', active: false },
    { url: 'http://localhost?page=4', label: '4', active: false },
    { url: 'http://localhost?page=5', label: '5', active: false },
    { url: 'http://localhost?page=2', label: 'Next &raquo;', active: false }
  ],
  next_page_url: 'http://localhost?page=2',
  path: 'http://localhost',
  per_page: 3,
  prev_page_url: null,
  to: 3,
  total: 15
})


const customTable=reactive(new TableConfig());
const customStyle=new TableStyleConfig();
const viewIcon=new ViewActionIcon();
const editIcon=new EditActionIcon();
const destroyIcon= new DestroyActionIcon();



viewIcon.updatePopUpOrRoute(popUpOrRoute.neither);
editIcon.updatePopUpOrRoute(popUpOrRoute.popUp,'editIcon');
destroyIcon.updatePopUpOrRoute(popUpOrRoute.popUp,'destroyIcon');



customStyle.updateTdWrapperIndex(3,'table__tdItem__group__status__wrapper');
customStyle.updateExpandColumnNormalDataIndex('wrapperIndex',3,'table__tdItem__group__status__expandWrapper');
customStyle.updateTdItemIndex(3,'table__tdItem__group__status__active');
customStyle.updateExpandColumnNormalDataIndex('dataIndex',3,'table__tdItem__group__status__active');

customStyle.updateTdWrapperIndex(4,'table__tdItem__group__status__wrapper');
customStyle.updateExpandColumnNormalDataIndex('wrapperIndex',4,'table__tdItem__group__status__expandWrapper');
customStyle.updateTdItemIndex(4,'table__tdItem__group__status__active');
customStyle.updateExpandColumnNormalDataIndex('dataIndex',4,'table__tdItem__group__status__active');

customStyle.updateTdWrapperIndex(5,'table__tdItem__group__status__wrapper');
customStyle.updateExpandColumnNormalDataIndex('wrapperIndex',5,'table__tdItem__group__status__expandWrapper');
customStyle.updateTdItemIndex(5,'table__tdItem__group__status__active');
customStyle.updateExpandColumnNormalDataIndex('dataIndex',5,'table__tdItem__group__status__active');

//table style

customStyle.updateHeadThIndex(0,'table__head__group__thNameItem');
customStyle.updateHeadThIndex(5,'table__head__group__thNewMember');
customStyle.updateHeadThIndex(6,'table__head__group__thCreated');


const arrayOfTableData = computed(() => {
  return (groupList.value || []).map((obj) => {
    let coach='Yes';
    let schedule='Yes';
    let newMember='Yes';

    if (obj.hasCoach===0){
      coach='No';
      customStyle.updateTdItemIdIndex(obj.id,3,'table__tdItem__group__status__inActive');
      customStyle.updateExpandColumnNormalDataIdIndex('dataIdIndex',obj.id,3,'table__tdItem__group__status__inActive');
    }
    if (obj.hasSchedule===0){
      schedule='No';
      customStyle.updateTdItemIdIndex(obj.id,4,'table__tdItem__group__status__inActive');
      customStyle.updateExpandColumnNormalDataIdIndex('dataIdIndex',obj.id,4,'table__tdItem__group__status__inActive');
    }
    if (obj.isAccepting===0){
      newMember='No';
      customStyle.updateTdItemIdIndex(obj.id,5,'table__tdItem__group__status__inActive');
      customStyle.updateExpandColumnNormalDataIdIndex('dataIdIndex',obj.id,5,'table__tdItem__group__status__inActive');
    }
    return [
      [obj.profileImage || '', obj.name || ''],
      obj.capacity || 'N/A',
      obj.players || 'N/A',
      coach || 'N/A',
      schedule,
      newMember,
      obj.createdDate || 'N/A',
      obj.id || 'N/A'
    ];
  });
});





editIcon.updateStyleClasses('wrapper','table__tdItem__group__icon__edit__wrapper');

viewIcon.updateStyleClasses('wrapper','table__tdItem__group__icon__view__wrapper');
viewIcon.updateStyleClasses('icon','table__tdItem__group__icon__view__icon');
viewIcon.updateStyleClasses('path',['table__tdItem__group__icon__view__icon__path1','table__tdItem__group__icon__view__icon__path2']);

destroyIcon.updateStyleClasses('wrapper','table__tdItem__group__icon__destroy__wrapper');
destroyIcon.updateStyleClasses('icon','table__tdItem__group__icon__destroy__icon');
destroyIcon.updateStyleClasses('path',['table__tdItem__group__icon__destroy__icon__path1','table__tdItem__group__icon__destroy__icon__path2']);



const dataShow= new ResponsiveColumnConfig(8);
const actionActivityType =new IconInlineActivityType();
dataShow.setColumnByBreakPointsArray(breakPointsValue.xxsm,0);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xsm,2);
dataShow.setColumnByBreakPointsArray(breakPointsValue.xm,4);
dataShow.setColumnByBreakPointsArray(breakPointsValue.sm,4);
dataShow.setColumnByBreakPointsArray(breakPointsValue.md,6);
dataShow.setColumnByBreakPointsArray(breakPointsValue.lg,8);

customTable.updateHeaders(headers.value);
customTable.updateData(arrayOfTableData.value);
customTable.updatePaginationData(groupListPagination.value);
customTable.updateIdIndex(7);
customTable.updateSelectShow();
customTable.updateIsSerialNoShow();
customTable.updateTotalColumn(8);
customTable.updateSortingColumnIndexWithoutStyleByProperty([0,1,2,3,4,5,6]);
customTable.updateSpecificColumnIndexPropertyArray([0,1]);
customTable.updateDataShow(dataShow);
customTable.updateActionColumnIndexProperty(7,actionActivityType,[viewIcon,editIcon,destroyIcon]);
customTable.updateItemPerPage();
customTable.updateItemPerPageValue(100);
//customTable.updateSkipColumnIndexPropertyArray([0])

// console.log(customTable);


const myTable=computed(()=>{
  return customTable;
})
const tableCustomStyle=computed(()=>{
  return customStyle;
})

watch(
    () => [groupList.value, groupListPagination.value],
    ([newUserList, newPagination]) => {
      console.log('watch triggered with:', newUserList, newPagination);
      customTable.updatePaginationData(groupListPagination.value);
      customTable.updateData(arrayOfTableData.value);
    },
    { immediate: true }
);

const handlePagination =async (currentPage) => {
  if (currentPage!==groupStore.getGroupQuery.page){
    groupStore.getGroupQuery.page=currentPage;
    const response=await groupStore.getGroups();
    console.log(response);
    return response;
  }
};

const handleSelectorChange = async (perPageValue) => {
  groupStore.getGroupQuery.perPage=perPageValue;
  groupStore.getGroupQuery.page=1;
  const response=await groupStore.getGroups();
  if (response){
    customTable.updateItemPerPageValue(perPageValue);
  }
};
// const handleSelectItemChange=async (id,index,isChecked)=>{
//   customTable.updateCheckBox(id,index,isChecked);
//   groupStore.groupRemoveQuery.ids=customTable.selectedItem.ids;
//   console.log('checking',groupStore.groupRemoveQuery);
// }
const handleActionClick = async (item, id, index, type) => {
  console.log(item,id,index,type);
  return true;
};
</script>

<!--<style  lang="scss">-->
<!--@import '@/assets/css/scss/table/userList.scss';-->



<!--</style>-->
<style>
.check{
 height: 20px!important;
  width: 30px!important;
  background-color: red!important;
}
</style>