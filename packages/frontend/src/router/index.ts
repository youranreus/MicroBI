import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'

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
      path: '/user',
      name: 'user-index',
      component: () => import('@/layout/flex-center-layout.vue'),
      children: [
        {
          path: 'login',
          name: 'user-login',
          meta: {
            title: '登录'
          },
          component: () => import('@/views/user/user-login.vue')
        },
        {
          path: 'callback',
          name: 'user-login-callback',
          meta: {
            title: '登录'
          },
          component: () => import('@/views/user/user-login-callback.vue')
        }
      ]
    },
    {
      path: '/workspace',
      name: 'workspace-layout',
      component: () => import('@/layout/flex-center-layout.vue'),
      children: [
        {
          path: '',
          name: 'workspace-index',
          meta: {
            title: '选择工作区'
          },
          component: () => import('@/views/workspace/view-index.vue')
        },
        {
          path: ':id',
          name: 'workspace-layout',
          component: () => import('@/views/workspace/workspace-layout.vue'),
          children: [
            {
              path: 'admin',
              name: 'workspace-admin-layout',
              meta: {
                title: '管理工作区'
              },
              component: () => import('@/views/workspace/admin/view-index.vue')
            },
            {
              path: 'dashboard',
              name: 'workspace-dashboard-layout',
              meta: {
                title: '看板'
              },
              component: () => import('@/views/workspace/dashboard/view-index.vue')
            },
            {
              path: 'analyze',
              name: 'workspace-analyze-layout',
              meta: {
                title: '分析'
              },
              component: () => import('@/views/workspace/analyze/view-index.vue')
            }
          ]
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

  const { handleRouteChange } = useMenuStore()
  handleRouteChange(to)

  return true
})

router.afterEach((to) => {
  document.title = `MicroBI | ${to.meta.title}`
})

export default router
