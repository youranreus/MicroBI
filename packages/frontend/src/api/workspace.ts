import api from './api'
import type { WorkspaceListRes, WorkspaceUserListRes } from '@/types/workspace'

export const getWorkspaceList = (page = 1, size = 10, type = 'all', search?: string) =>
  api.Get<WorkspaceListRes>('/workspace', { params: { page, size, search, type } })

export const getWorkspaceUsers = (id: number) =>
  api.Get<WorkspaceUserListRes>(`/workspace/${id}/user`)
