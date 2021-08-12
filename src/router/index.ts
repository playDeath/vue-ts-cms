import { createRouter, createWebHistory } from 'vue-router'
// 加个type表示引入的是类型
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
