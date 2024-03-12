import type { RouteRecordRaw } from 'vue-router'
import { getBasicRoute } from '@/utils'

export const adminChildren: RouteRecordRaw[] = [
  {
    path: '',
    name: 'workspace-admin-index',
    meta: {
      title: '工作区配置'
    },
    component: () => import('@/views/workspace/admin/workspace-admin.vue')
  },
  {
    path: 'dataset',
    name: 'dataset-admin-layout',
    meta: {
      title: '数据集管理'
    },
    component: () => import('@/views/workspace/admin/dataset/view-index.vue')
  }
]

export const analyzeChildren: RouteRecordRaw[] = [
  {
    path: '',
    name: 'analyze-create',
    meta: {
      title: '分析'
    },
    component: () => import('@/views/analyze/analyze-edit.vue')
  },
  {
    path: 'gallery',
    name: 'analyze-gallery',
    meta: {
      title: '图表库'
    },
    component: () => import('@/views/analyze/analyze-gallery.vue')
  },
  {
    path: ':cid',
    name: 'analyze-edit',
    meta: {
      title: '编辑分析',
      hide: true,
      menuAlias: 'analyze-create'
    },
    component: () => import('@/views/analyze/analyze-edit.vue')
  }
]

export const dashboardChildren: RouteRecordRaw[] = [
  {
    path: '',
    name: 'dashboard-view',
    meta: {
      title: '图表'
    },
    component: () => import('@/views/dashboard/dashboard-view.vue')
  },
  {
    path: ':pid',
    name: 'dashboard-edit',
    meta: {
      title: '图表编辑',
      hide: true,
      menuAlias: 'dashboard-view'
    },
    component: () => import('@/views/dashboard/dashboard-edit.vue')
  }
]

export const adminMenuItems = getBasicRoute(adminChildren)

export const analyzeMenuItems = getBasicRoute(analyzeChildren)

export const dashboardMenuItems = getBasicRoute(dashboardChildren)
