import { type RouteRecordRaw, RouterView } from 'vue-router'
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
    path: 'datasource',
    name: 'datasource-admin-layout',
    meta: {
      title: '数据源管理'
    },
    component: RouterView,
    redirect: { name: 'datasource-admin-index' },
    children: [
      {
        path: '',
        name: 'datasource-admin-index',
        meta: {
          title: '数据源管理'
        },
        component: () => import('@/views/workspace/admin/datasource/view-index.vue')
      },
      {
        path: 'create',
        name: 'datasource-admin-create',
        meta: {
          title: '新增数据源'
        },
        component: () => import('@/views/workspace/admin/datasource/edit-datasource.vue')
      },
      {
        path: 'edit/:sourceId',
        name: 'datasource-admin-edit',
        meta: {
          title: '编辑数据源'
        },
        component: () => import('@/views/workspace/admin/datasource/edit-datasource.vue')
      }
    ]
  },
  {
    path: 'dataset',
    name: 'dataset-admin-layout',
    meta: {
      title: '数据集管理'
    },
    component: RouterView,
    redirect: { name: 'dataset-admin-index' },
    children: [
      {
        path: '',
        name: 'dataset-admin-index',
        meta: {
          title: '数据集管理'
        },
        component: () => import('@/views/workspace/admin/dataset/view-index.vue')
      },
      {
        path: 'create',
        name: 'dataset-admin-create',
        meta: {
          title: '新增数据集'
        },
        component: () => import('@/views/workspace/admin/dataset/edit-dataset.vue')
      },
      {
        path: 'edit/:setId',
        name: 'dataset-admin-edit',
        meta: {
          title: '编辑数据集'
        },
        component: () => import('@/views/workspace/admin/dataset/edit-dataset.vue')
      },
      {
        path: 'preview/:setId',
        name: 'dataset-admin-preview',
        meta: {
          title: '编辑数据集'
        },
        component: () => import('@/views/workspace/admin/dataset/preview-data.vue')
      }
    ]
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
    path: ':chartId',
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
    path: 'list',
    name: 'dashboard-list',
    meta: {
      title: '我的看板'
    },
    component: () => import('@/views/dashboard/dashboard-list.vue')
  },
  {
    path: '',
    name: 'dashboard-create',
    meta: {
      title: '看板'
    },
    component: () => import('@/views/dashboard/dashboard-view.vue')
  },
  {
    path: ':pid',
    name: 'dashboard-view',
    meta: {
      title: '看板',
      hide: true,
      menuAlias: 'dashboard-create'
    },
    component: () => import('@/views/dashboard/dashboard-view.vue')
  },
  {
    path: ':pid',
    name: 'dashboard-edit',
    meta: {
      title: '看板编辑',
      hide: true,
      menuAlias: 'dashboard-create'
    },
    component: () => import('@/views/dashboard/dashboard-edit.vue')
  }
]

export const adminMenuItems = getBasicRoute(adminChildren)

export const analyzeMenuItems = getBasicRoute(analyzeChildren)

export const dashboardMenuItems = getBasicRoute(dashboardChildren)
