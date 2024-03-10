export interface Restful<T = null> {
  code: number
  msg: string
  data: T
}

export interface Pagination<T> {
  items: T[]
  total: number
}

export interface ItemDateData {
  created_at: string
  updated_at: string
}
