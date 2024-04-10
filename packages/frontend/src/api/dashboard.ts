import type { Restful } from '@/types'
import api from './api'
import type { DashboardDetailRes, DashboardListRes, DashboardSaveParam } from '@/types/dashboard'

export const getDashboardList = (page = 1, size = 10, workspace: number, search?: string) =>
  api.Get<DashboardListRes>('/dashboard', { params: { page, size, workspace, search } })

export const getDashboardDetail = (id: number) => api.Get<DashboardDetailRes>(`/dashboard/${id}`)

export const createDashboard = (_id: number, data: DashboardSaveParam) =>
  api.Post<Restful>(`/dashboard`, data)

export const updateDashboard = (id: number, data: DashboardSaveParam) =>
  api.Patch<Restful>(`/dashboard/${id}`, data)

export const delDashboard = (id: number) => api.Delete<Restful>(`/dashboard/${id}`)
