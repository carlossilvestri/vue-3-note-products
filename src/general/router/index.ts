import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/authentication/views/LoginView.vue'
import { applicationRoute } from '@/application/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      ...applicationRoute
    }
  ]
})

export default router
