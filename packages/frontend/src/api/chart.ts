import type { Restful } from '@/types'
import api from './api'
import type { ChartListRes, ChartData } from '@/types/chart'

export const getChartList = (page = 1, size = 10, search?: string) =>
  api.Get<ChartListRes>('/chart', { params: { page, size, search } })

export const getChartDetail = (id: number) => api.Get<Restful<ChartData>>(`/chart/${id}`)
