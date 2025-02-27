<script setup lang="ts">
import {useFormStore} from '@/stores/formState';
import {computed} from 'vue';
import draggable from 'vuedraggable';

const formStore = useFormStore();
const hasComponents = computed(() => formStore.hasComponents);

const handleDraggedComponents = (event) => {
  console.log("dragged", event);
};
</script>

<template>
  <div
      :class="[
      'form-builder-area',
      { 'has-components': hasComponents }
    ]"
      class="relative w-full h-full"
  >
    <draggable
        v-model="formStore.form.components"
        :group="{ name: 'form-components', pull: true, put: true }"
        @end="handleDraggedComponents"
        item-key="id"
        class="w-full h-full space-y-2 transition-all"
        ghost-class="bg-blue-100"
    >
      <template #item="{ element: component }">
        <div>{{ component.label }}</div>
      </template>
      <template #footer>
        <div v-if="!hasComponents"
             class="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <p>Drag and Drop the components to get started</p>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
</style>