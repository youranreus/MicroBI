import api from './api'
import type { WorkspaceListRes, WorkspaceUserListRes, WorkspaceData } from '@/types/workspace'
import type { Restful } from '@/types'

export const getWorkspaceList = (page = 1, size = 10, type = 'all', search?: string) =>
  api.Get<WorkspaceListRes>('/workspace', { params: { page, size, search, type } })

export const getWorkspaceUsers = (id: number) =>
  api.Get<WorkspaceUserListRes>(`/workspace/${id}/user`)

export const createWorkspace = (name: string) =>
  api.Post<Restful<{ id: number }>>('/workspace', { name })

export const getWorkspaceDetail = (id: number) =>
  api.Get<Restful<WorkspaceData>>(`/workspace/${id}`)
