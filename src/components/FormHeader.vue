<script setup lang="ts">
import {ref} from 'vue';
import {useFormStore} from '@/stores/formState';

const formStore = useFormStore();
const isEditing = ref(false);
const formTitle = ref(formStore.form.title);

const startEditing = () => {
  isEditing.value = true;
  formTitle.value = formStore.form.title;
};

const saveTitle = () => {
  formStore.updateTitle(formTitle.value);
  isEditing.value = false;
};

const cancelEditing = () => {
  formTitle.value = formStore.form.title;
  isEditing.value = false;
};
</script>

<template>
  <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
    <div class="flex items-center">
      <template v-if="isEditing">
        <input
            v-model="formTitle"
            class="border border-gray-300 rounded px-2 py-1 mr-2"
            @keyup.enter="saveTitle"
            @keyup.esc="cancelEditing"
            ref="titleInput"
        />
        <button @click="saveTitle" class="text-green-600 mr-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"/>
          </svg>
        </button>
        <button @click="cancelEditing" class="text-red-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"/>
          </svg>
        </button>
      </template>
      <template v-else>
        <h1 class="text-xl font-semibold">{{ formStore.form.title }}</h1>
        <button @click="startEditing" class="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
        </button>
      </template>
    </div>

    <div>
      <button class="px-3 py-1 border border-gray-300 rounded mr-2 text-sm hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                clip-rule="evenodd"/>
        </svg>
        Theme
      </button>
      <button class="px-3 py-1 border border-gray-300 rounded mr-2 text-sm hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                clip-rule="evenodd"/>
        </svg>
        Preview
      </button>
      <button class="px-3 py-1 border border-gray-300 rounded mr-2 text-sm bg-gray-200 hover:bg-gray-300">
        Cancel
      </button>
      <button class="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600">
        Save
      </button>
    </div>
  </div>
</template>