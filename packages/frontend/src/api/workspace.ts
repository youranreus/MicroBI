import api from './api'
import type { WorkspaceListRes } from '@/types/workspace'

export const getWorkspaceList = (page = 1, size = 10, search?: string) =>
  api.Get<WorkspaceListRes>('/workspace', { params: { page, size, search } })
