<script setup lang="ts">
import { useFormStore } from '@/stores/formState';
import ComponentsGroupSideBar from "@/components/ComponentsGroupSideBar.vue";
import FormPreview from "@/components/FormPreview.vue";
import FormSettingSideBar from "@/components/FormSettingSideBar.vue";
import FormHeader from "@/components/FormHeader.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <form-header/>
    <div class="flex flex-1 overflow-hidden">

      <div class="w-64 bg-gray-100 p-4 overflow-y-auto border-r border-gray-200">
        <h2 class="text-lg font-medium mb-4">Elements</h2>
        <ComponentsGroupSideBar/>
      </div>

      <div class="flex-1 p-4 overflow-y-auto bg-white">
        <form-preview/>
      </div>
      <div class="bg-gray-100 w-100 p-4 overflow-y-auto border-r border-gray-200">
        <form-setting-side-bar/>
      </div>
    </div>
  </div>
</template>