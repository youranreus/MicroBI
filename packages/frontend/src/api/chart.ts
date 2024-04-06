import type { Restful } from '@/types'
import api from './api'
import type { ChartListRes, ChartData, ChartSaveParams } from '@/types/chart'

export const getChartList = (page = 1, size = 10, workspace: number, search?: string) =>
  api.Get<ChartListRes>('/chart', { params: { page, size, workspace, search } })

export const getChartDetail = (id: number) => api.Get<Restful<ChartData>>(`/chart/${id}`)

export const createChart = (_id: number, data: ChartSaveParams) => api.Post<Restful>(`/chart`, data)

export const updateChart = (id: number, data: ChartSaveParams) =>
  api.Patch<Restful>(`/chart/${id}`, data)
