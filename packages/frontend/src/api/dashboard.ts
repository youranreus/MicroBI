import api from './api'
import type { DashboardDetailRes, DashboardListRes } from '@/types/dashboard'

export const getDashboardList = (page = 1, size = 10, workspace: number, search?: string) =>
  api.Get<DashboardListRes>('/dashboard', { params: { page, size, workspace, search } })

export const getDashboardDetail = (id: number) => api.Get<DashboardDetailRes>(`/dashboard/${id}`)
