import api from './api'
import type { ChartListRes } from '@/types/chart'

export const getChartList = (page = 1, size = 10, search?: string) =>
  api.Get<ChartListRes>('/chart', { params: { page, size, search } })
