<template>
  <div :class="['mb-4', widthClass]">
    <label :for="component.id" class="block text-sm font-medium text-gray-700">
      {{ component.label }}
      <span v-if="component.properties?.mandatory && !readonly" class="text-red-500">*</span>
    </label>
    <input
        :id="component.id"
        type="email"
        :class="[
        'mt-1 block border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2',
        inputWidthClass,
        {
          'border-red-500': component.properties?.mandatory && !isValid && hasValue && !readonly,
          'bg-gray-100 cursor-not-allowed': readonly,
        },
      ]"
        :placeholder="component.properties?.placeholder"
        :required="component.properties?.mandatory && !readonly"
        :readonly="readonly"
        :value="value"
        @input="handleInput"
    />
    <p v-if="error && !readonly" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import type { FormComponent } from '@/types';

export default defineComponent({
  name: 'Email',
  props: {
    component: {
      type: Object as () => FormComponent,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const error = ref<string | null>(null);
    const value = ref<string>(''); // Track input value
    const inputValue = ref<string>(''); // Track input value for validation

    // Compute the width class for the outer div (container)
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
      if (!props.component.properties?.mandatory || props.readonly) return true;
      const value = inputValue.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return value === '' || emailRegex.test(value);
    });

    const hasValue = computed(() => {
      return inputValue.value.trim().length > 0;
    });

    const handleInput = (event: Event) => {
      const newValue = (event.target as HTMLInputElement).value;
      inputValue.value = newValue;
      value.value = newValue;
      emit('update:value', newValue);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      error.value = emailRegex.test(newValue) ? null : 'Please enter a valid email address';
    };

    watch(() => props.readonly, (newReadonly) => {
      if (newReadonly) {
        value.value = inputValue.value;
      }
    });

    return { error, handleInput, widthClass, inputWidthClass, isValid, hasValue, value };
  },
});
</script>