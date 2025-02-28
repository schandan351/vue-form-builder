import { createRouter, createWebHistory } from 'vue-router'
import FormBuilder from "@/components/FormBuilder.vue";
import Preview from "@/components/Preview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'builder',
      component: FormBuilder,
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
    },
  ],
})

export default router
