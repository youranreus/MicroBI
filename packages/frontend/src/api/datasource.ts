import api from './api'
import type { DatasourceListRes } from '@/types/datasource'

export const getDatasourceList = (page = 1, size = 10, workspace?: number, search?: string) =>
  api.Get<DatasourceListRes>('/datasource', { params: { page, size, workspace, search } })
