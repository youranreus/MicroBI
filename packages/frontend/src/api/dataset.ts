import api from './api'
import type { DatasetListRes, DatasetCreateParams, DatasetMeta } from '@/types/dataset'
import type { Restful } from '@/types'

export const getDatasetList = (
  page = 1,
  size = 10,
  { workspace, datasource }: { workspace?: number; datasource?: number },
  search?: string
) => api.Get<DatasetListRes>('/dataset', { params: { page, size, workspace, datasource, search } })

export const createDataset = (data: DatasetCreateParams) => api.Post<Restful>('/dataset', data)

export const getDataset = (id: number) => api.Get<Restful<DatasetMeta>>(`/dataset/${id}`)

export const delDataset = (id: number) => api.Delete<Restful>(`/dataset/${id}`)
