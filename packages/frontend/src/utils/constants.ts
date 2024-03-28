import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { adminMenuItems, analyzeMenuItems, dashboardMenuItems } from '@/router/detail-routes'
import { FieldType } from '@/types/field'
import { CalcType, ChartType } from '@/types/chart'
import { CalendarClearOutline, StatsChartOutline, TextOutline } from '@vicons/ionicons5'

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

export const FieldTypeOptions = [
  {
    label: '字符串',
    value: FieldType.STRING
  },
  {
    label: '数值',
    value: FieldType.NUMBER
  },
  {
    label: '日期',
    value: FieldType.DATE
  }
]

export const FieldCalcMap: Record<FieldType, CalcType[]> = {
  [FieldType.STRING]: [CalcType.MAX, CalcType.MIN, CalcType.COUNT],
  [FieldType.NUMBER]: [CalcType.MAX, CalcType.MIN, CalcType.COUNT, CalcType.AVG, CalcType.SUM],
  [FieldType.DATE]: [CalcType.MAX, CalcType.MIN, CalcType.COUNT]
}

export const CalcNameMap: Record<CalcType, string> = {
  [CalcType.AVG]: '平均',
  [CalcType.COUNT]: '计数',
  [CalcType.MAX]: '最大值',
  [CalcType.MIN]: '最小值',
  [CalcType.SUM]: '求和'
}

export const FieldCalcOptions = Object.keys(FieldCalcMap).reduce(
  (p, c) => ({
    ...p,
    [c]: FieldCalcMap[c as FieldType].map((t) => ({ label: CalcNameMap[t], value: t }))
  }),
  {} as Record<FieldType, { label: string; value: CalcType }[]>
)

export const ChartTypeMap: Record<ChartType, string> = {
  [ChartType.TABLE]: '表格',
  [ChartType.LINE]: '线图',
  [ChartType.BAR]: '柱状图'
}

export const ChartTypeOptions = Object.entries(ChartTypeMap).map(([value, label]) => ({
  label,
  value
}))

export const FieldIconMap = {
  [FieldType.STRING]: TextOutline,
  [FieldType.DATE]: CalendarClearOutline,
  [FieldType.NUMBER]: StatsChartOutline
}
