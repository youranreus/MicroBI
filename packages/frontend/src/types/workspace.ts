import type { Restful, Pagination, ItemDateData } from '.'

export interface WorkspaceMeta extends ItemDateData {
  name: string
  id: number
  logo: string | null
}

export type WorkspaceListRes = Restful<Pagination<WorkspaceMeta>>
