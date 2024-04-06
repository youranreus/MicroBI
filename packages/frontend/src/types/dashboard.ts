import type { Restful, Pagination, ItemDateData } from '.'
import type { ChartData } from './chart'
import type { UserData } from './user'
import type { WorkspaceMeta } from './workspace'

export interface DashboardMeta extends ItemDateData {
  id: number
  name: string
  creator: UserData
  workspace: WorkspaceMeta
}

export interface DashboardPosition {
  x: number
  y: number
  w: number
  h: number
}

export interface DashboardChartItem extends DashboardPosition {
  data: ChartData
}

export interface DashboardDetail extends DashboardMeta {
  charts: DashboardChartItem[]
}

export type DashboardListRes = Restful<Pagination<DashboardMeta>>

export type DashboardDetailRes = Restful<DashboardDetail>
