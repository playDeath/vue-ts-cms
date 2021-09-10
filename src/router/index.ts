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
router.beforeEach((to) => {
  console.log(to)

  if (to.path === '/') {
    router.push({
      path: '/home/news'
    })
  }
})
export default router
