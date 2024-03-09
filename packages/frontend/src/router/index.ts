import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user-index',
      component: () => import('@/views/user/view-index.vue'),
      children: [
        {
          path: 'login',
          name: 'user-login',
          meta: {
            title: '登录'
          },
          component: () => import('@/views/user/user-login.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const { hasLoggedIn } = useUserStore()
  if (!hasLoggedIn.value && !['user-login', 'user-login-callback'].includes(to.name as string)) {
    return { name: 'user-login' }
  }

  return true
})

router.afterEach((to) => {
  document.title = `MicroBI | ${to.meta.title}`
})

export default router
