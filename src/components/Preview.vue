<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Form Preview</h1>
    <div class="space-y-4">
      <component
          v-for="component in formStore.form.components"
          :key="component.id"
          :is="renderPreviewComponent(component)"
          :component="component"
          :readonly="true"
      />
    </div>
    <button
        @click="submitForm"
        class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, h, resolveComponent } from 'vue';
import { useFormStore } from '@/stores/formState';
import type { FormComponent } from '@/types';

export default defineComponent({
  name: 'Preview',
  setup() {
    const formStore = useFormStore();
    const formValues = ref<Record<string, any>>({});

    const renderPreviewComponent = (component: FormComponent) => {
      const CustomComponent = resolveComponent(component.type);
      return h(CustomComponent, {
        component,
        readonly: false,
        onUpdateValue: (value: any) => updateValue(component.id, value),
      });
    };

    const updateValue = (id: string, value: any) => {
      console.log("value updated", id, value);
      formValues.value[id] = value;
    };

    const submitForm = () => {
      console.log(JSON.stringify(formValues.value, null, 2));
    };

    return {
      formStore,
      renderPreviewComponent,
      submitForm,
      formValues,
      updateValue,
    };
  },
});
</script>

<style scoped>
</style>