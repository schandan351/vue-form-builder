<script setup lang="ts">
import {ComponentType} from '@/types';
import {useFormStore} from '@/stores/formState';
import draggable from "vuedraggable";

const formStore = useFormStore();


const cloneComponent = (component: any) => {
  return {
    ...component,
    id: crypto.randomUUID()
  };
};

const addComponent = (type: ComponentType, label: string, icon: string) => {
  formStore.addComponent({type, label, icon});
};

const iconComponents: { [key: string]: string } = {
  'input-text': 'i-text',
  'textarea': 'i-textarea',
  'heading': 'i-heading',
  'paragraph': 'i-paragraph',
  'user': 'i-user',
  'mail': 'i-mail',
  'phone': 'i-phone',
  'map-pin': 'i-map-pin',
  'link': 'i-link',
  'list': 'i-list',
  'radio': 'i-radio',
  'checkbox-group': 'i-checkbox-group',
  'dropdown': 'i-dropdown',
  'checkbox': 'i-checkbox',
  'calendar': 'i-calendar',
  'clock': 'i-clock',
  'hash': 'i-hash',
  'upload': 'i-upload',
  'globe': 'i-globe',
  'star': 'i-star',
  'shield': 'i-shield',
  'image': 'i-image',
  'page-break': 'i-page-break',
  'layout': 'i-layout',
  'default': 'i-default'
};

const getIconComponent = (icon: string) => {
  return iconComponents[icon] || iconComponents['default'];
};
</script>

<template>
  <div>
    <div>
      <input
          v-model="formStore.searchQuery"
          type="text"
          placeholder="Search components..."
          class="w-full px-3 my-2 py-2 border rounded-md"
      />
    </div>
    <div v-for="(group, groupIndex) in formStore.filteredComponentGroups" :key="groupIndex" class="mb-6">
      <h3 class="text-sm font-medium text-gray-500 mb-2">{{ group.title }}</h3>
        <draggable
            v-model="group.components"
            :group="{name: 'components', pull: 'clone', put: true}"
            :clone="cloneComponent"
            :sort="true"
            item-key="id"
            class="component-list"
        >
          <template #item="{element: component}">
            <div
                class="cursor-pointer form-component"
            >
              <div class="flex flex-col items-center justify-center text-center">
                <div class="form-component-icon mb-1">
                  <template v-if="component.icon === 'input-text'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </template>
                  <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                  </template>
                </div>
                <span class="text-xs">{{ component.label }}</span>
              </div>
            </div>
          </template>
        </draggable>
    </div>
  </div>
</template>