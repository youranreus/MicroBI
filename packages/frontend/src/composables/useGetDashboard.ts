import { useRequest } from 'alova'
import { getDashboardDetail } from '@/api/dashboard'

export const useGetDashboard = (callback?: () => void) => {
  const {
    data: resData,
    loading,
    send,
    onSuccess
  } = useRequest(getDashboardDetail, {
    immediate: false
  })

  const query = (id: number) => {
    send(id)
  }

  onSuccess(() => {
    callback?.()
  })

  return { resData, loading, query }
}
