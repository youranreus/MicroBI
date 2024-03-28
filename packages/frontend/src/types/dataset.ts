import type { Restful, Pagination, ItemDateData } from '.'
import type { UserData } from './user'
import type { Field } from './field'
import type { Condition } from './chart'

export interface DatasetMeta extends ItemDateData {
  name: string
  id: number
  tablename: string
  datasource: number | UserData
  workspace?: number
}

export type DatasetListRes = Restful<Pagination<DatasetMeta>>

export interface DatasetCreateParams {
  name: string
  datasource: number
  tablename: string
  fields: Partial<Field>[]
}

export interface DatasetDetailRes {
  meta: DatasetMeta
  fields: Field[]
}

export type TableColumnRes = Restful<Pick<Field, 'name' | 'type'>[]>

export interface QueryDataParams {
  quotas: Condition[]
  dims: Condition[]
  filters: Condition[]
}

export type QueryDataRes = Restful<{
  data: Record<string, any>[]
  sql: string
}>
