import api from './api'
import type {
  DatasourceListRes,
  DatasourceConnection,
  DatasourceCreateParams
} from '@/types/datasource'
import type { Restful } from '@/types'

export const getDatasourceList = (page = 1, size = 10, workspace?: number, search?: string) =>
  api.Get<DatasourceListRes>('/datasource', { params: { page, size, workspace, search } })

export const testDatasourceConnection = (data: DatasourceConnection) =>
  api.Put<Restful<{ status: boolean }>>('/datasource', data)

export const createDatasource = (data: DatasourceCreateParams) =>
  api.Post<Restful>('/datasource', data)
