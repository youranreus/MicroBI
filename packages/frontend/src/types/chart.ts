import type { Restful, Pagination, ItemDateData } from '.'
import type { Field } from './field'

export enum ChartType {
  TABLE = 'table',
  LINE = 'line',
  BAR = 'bar'
}

export interface ChartMeta extends ItemDateData {
  name: string
  id: number
  type: ChartType
}

export type ChartListRes = Restful<Pagination<ChartMeta>>

export interface ChartUpdateParams {
  name: string
  type: ChartType
  quotas: number[]
  dims: number[]
  filters: number[]
}

export interface ChartCreateParams extends ChartUpdateParams {
  workspace: number
}

export interface ChartData extends ChartMeta {
  dims: Field[]
  quotas: Field[]
  filters: Field[]
}
