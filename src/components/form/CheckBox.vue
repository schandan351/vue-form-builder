<template>
  <div :class="['mb-4', widthClass]">
    <label :for="component.id" class="flex items-center">
      <input
          :id="component.id"
          type="checkbox"
          :class="[
          'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
          {
            'border-red-500': component.properties?.mandatory && !isChecked && !readonly,
            'bg-gray-100 cursor-not-allowed': readonly,
          },
        ]"
          v-model="isChecked"
          :required="component.properties?.mandatory && !readonly"
          :disabled="readonly"
      />
      <span class="ml-2 text-sm text-gray-700">
        {{ component.label }}
        <span v-if="component.properties?.mandatory && !readonly" class="text-red-500">*</span>
      </span>
      <span v-if="component.properties?.placeholder && !readonly" class="ml-2 text-sm text-gray-400 italic">
        ({{ component.properties?.placeholder }})
      </span>
    </label>
    <p v-if="error && !readonly" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import type { FormComponent } from '@/types';

export default defineComponent({
  name: 'Checkbox',
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
    const isChecked = ref<boolean>(false);

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

    const validateCheckbox = () => {
      if (props.component.properties?.mandatory && !isChecked.value && !props.readonly) {
        error.value = 'This field is required';
      } else {
        error.value = null;
      }
      emit('update:value', isChecked.value);
    };

    watch(isChecked, validateCheckbox);

    watch(() => props.readonly, (newReadonly) => {
      if (newReadonly) {
      }
    });

    return { error, isChecked, widthClass, validateCheckbox };
  },
});
</script>