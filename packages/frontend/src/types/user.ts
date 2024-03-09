import type { Restful } from '.'

export interface UserData {
  id: number
  avatar: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface UserLoginData {
  user: UserData
  token: string
}

export type UserLoginRes = Restful<UserLoginData>
