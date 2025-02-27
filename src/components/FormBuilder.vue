<script setup lang="ts">
import { useFormStore } from '@/stores/formState';
import { computed } from 'vue';
import ComponentsGroupSideBar from "@/components/ComponentsGroupSideBar.vue";

const formStore = useFormStore();
const hasComponents = computed(() => formStore.hasComponents);
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
<!--      headers-->
      <div class="w-64 bg-gray-100 p-4 overflow-y-auto border-r border-gray-200">
        <h2 class="text-lg font-medium mb-4">Elements</h2>
        <ComponentsGroupSideBar/>
      </div>

      <div class="flex-1 p-4 overflow-y-auto bg-white">
<!--        preview-->
      </div>
    </div>
  </div>
</template>