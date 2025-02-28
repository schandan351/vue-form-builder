<script setup lang="ts">
import { useFormStore } from '@/stores/formState';
import {computed, resolveComponent, h, ref, onMounted, onUnmounted} from 'vue';
import draggable from 'vuedraggable';
import type { FormComponent } from '@/types';
import { DocumentDuplicateIcon, TrashIcon,  Cog6ToothIcon} from '@heroicons/vue/20/solid';

const formStore = useFormStore();
const hasComponents = computed(() => formStore.hasComponents);

const handleDraggedComponents = (event: any) => {
  console.log("dragged", event);
  formStore.updateComponentOrder(formStore.form.components);
};

function renderField(component: FormComponent) {
  console.log("componenet", component);
  const CustomComponent = resolveComponent(component.type);

  return h(CustomComponent, {
    component
  });
}

const addSampleComponent = (component: FormComponent) => {
  formStore.addComponent(component);
};

onMounted(() => {
  document.addEventListener('click', formStore.clearActiveComponent);
});

onUnmounted(() => {
  document.removeEventListener('click', formStore.clearActiveComponent);
});
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
        <div
            class="w-full relative"
            @click.stop="formStore.setActiveComponent(component.id)"
        >
          <component :is="renderField(component)" />
          <div
              v-if="formStore.activeComponent === component.id"
              class="absolute top-1 right-2 flex space-x-2"
          >
            <button
                @click.stop="addSampleComponent(component)"
                class="p-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                title="Copy"
            >
              <DocumentDuplicateIcon class="h-5 w-5" />
            </button>
            <button
                @click.stop="formStore.removeComponent(component.id)"
                class="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                title="Remove"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </template>
      <template #footer>
        <div
            v-if="!hasComponents"
            class="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
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