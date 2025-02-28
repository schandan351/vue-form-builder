<template>
  <div :class="['mb-4', widthClass]">
    <label :for="component.id" class="block text-sm font-medium text-gray-700">
      {{ component.label }}
      <span v-if="component.properties?.mandatory" class="text-red-500">*</span>
    </label>
    <input
        :id="component.id"
        type="text"
        :class="[
        'mt-1 block border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2',
        inputWidthClass,
        {
          'border-red-500': component.properties?.mandatory && !isValid && hasValue,
        },
      ]"
        :placeholder="component.properties?.placeholder || component.label"
        :required="component.properties?.mandatory"
        @input="handleInput"
    />
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import type { FormComponent } from '@/types';

export default defineComponent({
  name: 'ShortText',
  props: {
    component: {
      type: Object as () => FormComponent,
      required: true,
    },
  },
  emit: ['update:value'],
  setup(props, { emit}) {
    const error = ref<string | null>(null);
    const inputValue = ref<string>('');
    const value = ref<string>('');
    const widthClass = computed(() => {
      const width = props.component.properties?.width || 'full';
      switch (width) {
        case 'half':
          return 'w-1/2';
        case 'quarter':
          return 'w-1/4';
        case 'full':
        default:
          return 'w-full';
      }
    });

    const inputWidthClass = computed(() => {
      return 'w-full';
    });

    const isValid = computed(() => {
      if (!props.component.properties?.mandatory) return true;
      return inputValue.value.trim().length > 0;
    });

    const hasValue = computed(() => {
      return inputValue.value.trim().length > 0;
    });

    const handleInput = (event: Event) => {
      validateInput(event);
      const newValue = (event.target as HTMLInputElement).value;
      inputValue.value = newValue;
      value.value = newValue;
      console.log("short text value", value.value);
      emit('update:value', newValue);

      if (props.component.properties?.mandatory && newValue.trim().length === 0) {
        error.value = 'This field is required';
      } else {
        error.value = null;
      }
    };

    const validateInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      inputValue.value = value;
      if (props.component.properties?.mandatory && value.trim().length === 0) {
        error.value = 'This field is required';
      } else {
        error.value = null;
      }
    };

    return { error, validateInput, widthClass, inputWidthClass, isValid, hasValue, handleInput };
  },
});
</script>