export interface Restful<T = null> {
  code: number
  msg: string
  data: T
}
