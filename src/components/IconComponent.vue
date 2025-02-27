<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  icon: string;
  height?: number| 5;
  width?: number | 5;
}>();

const getIconComponent = async (icon: string) => {
  try {
    const iconModule = await import(`@/assets/icons/${icon}.svg`);
    return iconModule.default;
  } catch (e) {
    const defaultIconModule = await import('@/assets/icons/default.svg');
    return defaultIconModule.default;
  }
};

</script>

<template>
<!--  <component-->
<!--      :is="getIconComponent(icon)"-->
<!--      :height="height"-->
<!--      :width="width"-->
<!--      alt="icon"-->
<!--  />-->
</template>