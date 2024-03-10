import type { Restful, ItemDateData } from '.'

export interface UserData extends ItemDateData {
  id: number
  avatar: string
  email: string
  name: string
}

export interface UserLoginData {
  user: UserData
  token: string
}

export type UserLoginRes = Restful<UserLoginData>
