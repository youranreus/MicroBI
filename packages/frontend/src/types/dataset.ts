import type { Restful, Pagination, ItemDateData } from '.'
import type { UserData } from './user'
import type { Field } from './field'

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
  fields: Pick<Field, 'name' | 'type' | 'fieldname'>[]
}

export interface DatasetDetailRes {
  meta: DatasetMeta
  fields: Field[]
}
