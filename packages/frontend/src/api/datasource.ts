import api from './api'
import type {
  DatasourceListRes,
  DatasourceConnection,
  DatasourceCreateParams,
  DatasourceMeta
} from '@/types/datasource'
import type { Restful } from '@/types'

export const getDatasourceList = (page = 1, size = 10, workspace?: number, search?: string) =>
  api.Get<DatasourceListRes>('/datasource', { params: { page, size, workspace, search } })

export const testDatasourceConnection = (data: DatasourceConnection) =>
  api.Put<Restful<{ status: boolean }>>('/datasource', data)

export const createDatasource = (data: DatasourceCreateParams) =>
  api.Post<Restful>('/datasource', data)

export const updateDatasource = (data: DatasourceCreateParams, id: number) =>
  api.Patch<Restful>(`/datasource/${id}`, data)

export const getDatasource = (id: number) => api.Get<Restful<DatasourceMeta>>(`/datasource/${id}`)

export const delDatasource = (id: number) => api.Delete<Restful>(`/datasource/${id}`)
