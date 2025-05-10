<template>
  <dialog open class="base-dialog">
    <template v-if="dialog['descriptionDialog']===true">
      <h3>User Description</h3>
      <p>{{ user?.description || 'No description available.' }}</p>
      <button class="btn-close" @click="$emit('close')">Close</button>
    </template>

    <template v-else-if="dialog['editDialog']===true">
      <h3>Edit User</h3>
      <label>Name: <input v-model="localData.name" /></label>
      <label>Role: <input v-model="localData.role" /></label>
      <label>Status:
        <select v-model="localData.status">
          <option value="locked">Locked</option>
          <option value="active">Active</option>
          <option value="invited">Invited</option>
          <option value="deactivated">Deactivated</option>
        </select>
      </label>
      <div class="actions">
        <button @click="$emit('save', localData)" class="btn-save">Save</button>
        <button @click="$emit('close')" class="btn-close">Cancel</button>
      </div>
    </template>

    <template v-else-if="dialog['confirmDialog']===true">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete <strong>{{ user?.name }}</strong>?</p>
      <div class="actions">
        <button @click="$emit('confirm', user?.id)" class="btn-confirm">Yes</button>
        <button @click="$emit('close')" class="btn-close">Cancel</button>
      </div>
    </template>
  </dialog>
</template>

<script setup>
import {onMounted, reactive, watch} from 'vue';
import {dialog, dialogValue} from "@";

const props = defineProps({
  user: Object
});

const localData = reactive({ name: '', role: '', status: '' });

watch(
    () => props.user,
    (newUser) => {
      if (dialogValue.value === 'editDialog' && newUser) {
        Object.assign(localData, newUser);
      }
    },
    { immediate: true }
);
onMounted(()=>{
  console.log(dialogValue.value);
})
</script>

<style scoped>
.base-dialog {
  background: white;
  border-radius: 12px;
  padding: 2em;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #111827;
}
label {
  display: block;
  margin: 0.5em 0;
  font-weight: 600;
  text-align: left;
}
input,
select {
  width: 100%;
  padding: 0.5em;
  margin-top: 0.25em;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 1.5em;
}
.btn-save {
  background-color: #10b981;
  color: white;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 6px;
}
.btn-close {
  background-color: #ef4444;
  color: white;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 6px;
}
.btn-confirm {
  background-color: #dc2626;
  color: white;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 6px;
}

/* 🌙 Dark Mode Support */
.dark-mode .base-dialog {
  background-color: #1f2937;
  color: #f9fafb;
  box-shadow: 0 20px 50px rgba(255, 255, 255, 0.1);
}
.dark-mode input,
.dark-mode select {
  background-color: #374151;
  color: #f9fafb;
  border: 1px solid #4b5563;
}
.dark-mode .btn-close {
  background-color: #b91c1c;
}
.dark-mode .btn-save {
  background-color: #059669;
}
.dark-mode .btn-confirm {
  background-color: #dc2626;
}
</style>
