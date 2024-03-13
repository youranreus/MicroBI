import type { Restful, Pagination, ItemDateData } from '.'
import type { UserData } from './user'

export enum DatasourceType {
  MYSQL = 'mysql',
  MARIADB = 'mariadb'
}

export interface DatasourceMeta extends ItemDateData {
  name: string
  id: number
  type: DatasourceType
  creator: number | UserData
  workspace?: number
  dataset_count?: number
}

export type DatasourceListRes = Restful<Pagination<DatasourceMeta>>

export interface DatasourceConnection {
  type: DatasourceType
  ip: string
  port: number
  password: string
  user: string
  database: string
}

export interface DatasourceCreateParams extends DatasourceConnection {
  name: string
  workspace: number
}
