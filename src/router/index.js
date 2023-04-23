import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewVue from '@/views/DashboardView.vue'
import LoginViewVue from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashboardViewVue
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
