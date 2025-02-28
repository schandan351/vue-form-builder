<template>
  <div
      :class="[
      'mb-4 p-20 border rounded bg-gray-50',
      gridClass,
    ]"
      :data-id="component.id"
  >
    <h3 class="text-sm font-medium mb-2">{{ component.label }}</h3>
    <draggable
        v-model="nestedComponents"
        :group="{ name: 'form-components', pull: 'clone', put: true }"
        :item-key="getItemKey"
        class="grid gap-4"
        :class="[gridColumnsClass]"
        @end="handleDragEnd"
    >
      <template #item="{ element: nestedComponent }">
        <div class="relative">
          <component
              :is="renderNestedField(nestedComponent)"
              :component="nestedComponent"
              :readonly="readonly"
          />
          <div
              v-if="activeComponentId === nestedComponent.id && !readonly"
              class="absolute top-2 right-2 flex space-x-2"
          >
            <button
                @click.stop="copyNestedComponent(nestedComponent)"
                class="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                title="Copy"
            >
              <DocumentDuplicateIcon class="h-5 w-5" />
            </button>
            <button
                @click.stop="removeNestedComponent(nestedComponent.id)"
                class="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                title="Remove"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </template>
    </draggable>
    <p v-if="!nestedComponents.length" class="text-gray-500 text-sm">
      Drag components here to add them to the grid.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, h } from 'vue';
import draggable from 'vuedraggable';
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/20/solid';
import type { FormComponent } from '@/types';
import { resolveComponent } from 'vue';

export default defineComponent({
  name: 'Grid',
  components: {
    draggable,
    DocumentDuplicateIcon,
    TrashIcon,
  },
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
    const nestedComponents = ref<FormComponent[]>(props.component.properties?.components || []);
    const activeComponentId = ref<string | null>(null);

    // Default to 2 columns, but use the stored value if available
    const columns = computed(() => props.component.properties?.columns || 2);

    const gridClass = computed(() => 'grid-container');
    const gridColumnsClass = computed(() => {
      return columns.value === 2 ? 'grid-cols-2' : 'grid-cols-3';
    });

    const getItemKey = (item: FormComponent) => item.id;

    const renderNestedField = (nestedComponent: FormComponent) => {
      const CustomComponent = resolveComponent(nestedComponent.type);
      return h(CustomComponent, {
        component: nestedComponent,
        readonly: props.readonly,
      });
    };

    const handleDragEnd = (event: any) => {
      if (event.from !== event.to && !props.readonly) {
        const newComponent = { ...event.item.component };
        newComponent.id = crypto.randomUUID();
        nestedComponents.value.push(newComponent);
        updateNestedComponents();
      }
    };

    const updateNestedComponents = () => {
      props.component.properties = {
        ...props.component.properties,
        components: nestedComponents.value,
      };
      emitValues();
    };

    const setActiveNestedComponent = (id: string) => {
      if (!props.readonly) {
        activeComponentId.value = id;
      }
    };

    const copyNestedComponent = (nestedComponent: FormComponent) => {
      if (!props.readonly) {
        const newComponent = { ...nestedComponent, id: crypto.randomUUID() };
        nestedComponents.value.push(newComponent);
        updateNestedComponents();
      }
    };

    const removeNestedComponent = (id: string) => {
      if (!props.readonly) {
        nestedComponents.value = nestedComponents.value.filter(c => c.id !== id);
        updateNestedComponents();
        if (activeComponentId.value === id) {
          activeComponentId.value = null;
        }
      }
    };

    const emitValues = () => {
      const values: Record<string, any> = {};
      nestedComponents.value.forEach(comp => {
        values[comp.id] = comp.type === 'checkbox' ? isChecked(comp.id) : getValue(comp.id);
      });
      emit('update:value', values);
    };

    const isChecked = (id: string): boolean => {
      const comp = nestedComponents.value.find(c => c.id === id);
      return comp?.type === 'checkbox' ? (comp as any).isChecked || false : false;
    };

    const getValue = (id: string): any => {
      const comp = nestedComponents.value.find(c => c.id === id);
      return comp?.properties?.value || '';
    };

    return {
      nestedComponents,
      activeComponentId,
      gridClass,
      gridColumnsClass,
      getItemKey,
      renderNestedField,
      handleDragEnd,
      setActiveNestedComponent,
      copyNestedComponent,
      removeNestedComponent,
    };
  },
});
</script>

<style scoped>
.grid-container {
  transition: all 0.3s ease;
}

.grid-container:hover,
.grid-container:focus-within {
  outline: 1px solid #e5e7eb;
}
</style>