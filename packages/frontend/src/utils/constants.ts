import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { adminMenuItems, analyzeMenuItems, dashboardMenuItems } from '@/router/detail-routes'

export const NAV_ITEMS = [
  {
    label: '看板',
    key: 'dashboard-layout'
  },
  {
    label: '分析',
    key: 'analyze-layout'
  },
  {
    label: '管理',
    key: 'workspace-admin-layout'
  }
]

export const NAV_VALUE_LIST = NAV_ITEMS.map((item) => item.key)

const mapRoute2Menu = (r: Pick<RouteRecordRaw, 'name' | 'meta' | 'path'>) => {
  return {
    label: r.meta?.title as string,
    key: r.meta?.hide ? (r.meta?.menuAlias as string) : (r.name as string),
    show: !r.meta?.hide
  }
}

export const MENU_ITEMS_MAP: Record<string, MenuOption[]> = {
  'dashboard-layout': dashboardMenuItems.map(mapRoute2Menu),
  'analyze-layout': analyzeMenuItems.map(mapRoute2Menu),
  'workspace-admin-layout': adminMenuItems.map(mapRoute2Menu)
}
