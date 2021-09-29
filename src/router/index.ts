import { createRouter, createWebHistory } from 'vue-router'
// 加个type表示引入的是类型
import type { RouteRecordRaw } from 'vue-router'
import Cache from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/404.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})
router.beforeEach((to, next) => {
  if (to.path !== '/login') {
    if (Cache.getCache('token') === null) {
      return {
        path: '/login'
      }
    }
  } else {
    if (Cache.getCache('token') !== null) {
      return {
        path: '/home/'
      }
    }
  }
})
export default router
