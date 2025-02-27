import { createRouter, createWebHistory } from 'vue-router'
import FormBuilder from "@/components/FormBuilder.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'builder',
      component: FormBuilder,
    },
  ],
})

export default router
