import api from './api'
import type {
  DatasetListRes,
  DatasetCreateParams,
  DatasetDetailRes,
  TableColumnRes
} from '@/types/dataset'
import type { Restful } from '@/types'

export const getDatasetList = (
  page = 1,
  size = 10,
  { workspace, datasource }: { workspace?: number; datasource?: number },
  search?: string
) => api.Get<DatasetListRes>('/dataset', { params: { page, size, workspace, datasource, search } })

export const createDataset = (data: DatasetCreateParams) => api.Post<Restful>('/dataset', data)

export const updateDataset = (data: DatasetCreateParams, id: number) =>
  api.Patch<Restful>(`/dataset/${id}`, data)

export const getDataset = (id: number) => api.Get<Restful<DatasetDetailRes>>(`/dataset/${id}`)

export const delDataset = (id: number) => api.Delete<Restful>(`/dataset/${id}`)

export const getTableColumn = (datasource: number, table: string) =>
  api.Put<TableColumnRes>(`/dataset/${datasource}`, {}, { params: { table } })
