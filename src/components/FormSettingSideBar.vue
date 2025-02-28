<script setup lang="ts">
import {useFormStore} from "@/stores/formState.ts";
const formStore = useFormStore();

console.log("form settings", formStore.componentSettings);
</script>

<template>
  <div
      v-if="formStore.activeComponent"
  >
    <h2 class="text-lg font-semibold mb-4">Settings</h2>
    <form @submit.prevent="formStore.updateComponentSettings">
      <div>
        <label class="block text-sm font-medium text-gray-700">Label</label>
        <input
            v-model="formStore.componentSettings.label"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter label"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Placeholder</label>
        <input
            v-model="formStore.componentSettings.placeholder"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter placeholder"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Mandatory</label>
        <input
            v-model="formStore.componentSettings.mandatory"
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Width</label>
        <select
            v-model="formStore.componentSettings.width"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="full">Full</option>
          <option value="half">Half</option>
          <option value="quarter">Quarter</option>
        </select>
      </div>
      <div v-if="formStore.form.components.find(c => c.id === formStore.activeComponent)?.type === 'grid'">
        <label class="block text-sm font-medium text-gray-700">Columns</label>
        <select
            v-model="formStore.componentSettings.columns"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="2">2 Columns</option>
          <option value="3">3 Columns</option>
        </select>
      </div>
      <button
          type="submit"
          class="mt-4 w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
      >
        Save Settings
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>