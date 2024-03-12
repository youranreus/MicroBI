import api from './api'
import type { UserLoginRes } from '@/types/user'
import type { Restful } from '@/types'

export const userLogin = (token: string) =>
  api.Post<UserLoginRes>('/user', {}, { params: { token } })

export const updateUserData = (data: { name: string; avatar: string }) =>
  api.Patch<Restful>('/user', data)
