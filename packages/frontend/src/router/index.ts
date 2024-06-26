import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { adminChildren, analyzeChildren, dashboardChildren } from './detail-routes'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { useWorkspaceStore } from '@/stores/workspace'

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
          path: ':wsId',
          name: 'workspace-base-layout',
          component: () => import('@/views/workspace/workspace-layout.vue'),
          children: [
            {
              path: 'admin',
              name: 'workspace-admin-layout',
              meta: {
                title: '管理工作区'
              },
              component: () => import('@/views/workspace/admin/view-index.vue'),
              children: adminChildren,
              redirect: { name: 'workspace-admin-index' }
            },
            {
              path: 'dashboard',
              name: 'dashboard-layout',
              meta: {
                title: '看板'
              },
              component: () => import('@/views/dashboard/view-index.vue'),
              children: dashboardChildren,
              redirect: { name: 'dashboard-list' }
            },
            {
              path: 'analyze',
              name: 'analyze-layout',
              meta: {
                title: '分析'
              },
              component: () => import('@/views/analyze/view-index.vue'),
              children: analyzeChildren,
              redirect: { name: 'analyze-create' }
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
  const { handleChangeWorkspace } = useWorkspaceStore()
  handleRouteChange(to)
  handleChangeWorkspace(to)

  return true
})

router.afterEach((to) => {
  document.title = `MicroBI | ${to.meta.title}`
})

export default router
