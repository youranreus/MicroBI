import type { Restful, Pagination, ItemDateData } from '.'
import type { UserData } from './user'

export interface WorkspaceMeta extends ItemDateData {
  name: string
  id: number
  logo: string | null
}

export type WorkspaceListRes = Restful<Pagination<WorkspaceMeta>>

export type WorkspaceUserListRes = Restful<UserData[]>

export type WorkspaceData = WorkspaceMeta & {
  users: UserData[]
  datasources: number[]
}

export type WorkspaceUpdateParams = Pick<WorkspaceData, 'name' | 'logo' | 'users'>
