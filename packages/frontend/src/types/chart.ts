import type { Restful, Pagination, ItemDateData } from '.'
import type { DatasetMeta } from './dataset'
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

export enum CalcType {
  AVG = 'AVG',
  SUM = 'SUM',
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN'
}

export enum SortType {
  NONE = '',
  DESC = 'DESC',
  ASC = 'ASC'
}

export interface ChartQuota {
  id: number
  calc: CalcType
}

export interface ChartDim {
  id: number
  sort: SortType
}

export interface ChartSaveParams {
  name: string
  type: ChartType
  workspace: number
  quotas: number[]
  dims: number[]
  filters: number[]
  quotaData: ChartQuota[]
  dimData: ChartDim[]
}

export interface Condition extends Field {
  calc: CalcType
  sort?: SortType
}

export interface ChartData extends ChartMeta {
  dims: Field[]
  quotas: Field[]
  filters: Field[]
  dataset: DatasetMeta
  addition: {
    quotas: ChartQuota[]
    dims: ChartDim[]
  }
}
