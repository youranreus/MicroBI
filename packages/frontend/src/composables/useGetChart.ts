import { useRequest } from 'alova'
import { getChartDetail } from '@/api/chart'
import { CalcType, ChartType, SortType } from '@/types/chart'

export const useGetChart = (callback?: () => void) => {
  const {
    data: resData,
    loading,
    send,
    onSuccess
  } = useRequest(getChartDetail, {
    immediate: false
  })

  const query = (id: number) => {
    send(id)
  }

  const quotas = computed(() => {
    if (!resData.value.data) {
      return []
    }

    return resData.value.data.quotas.map((field) => {
      const addition = resData.value.data.addition.quotas.find((i) => i.id === field.id)

      return {
        ...field,
        calc: addition?.calc || CalcType.COUNT
      }
    })
  })

  const dims = computed(() => {
    if (!resData.value.data) {
      return []
    }

    return resData.value.data.dims.map((field) => {
      const addition = resData.value.data.addition.dims.find((i) => i.id === field.id)

      return {
        ...field,
        sort: addition?.sort || SortType.NONE,
        calc: CalcType.COUNT
      }
    })
  })

  const metadata = computed(() => ({
    name: resData.value?.data?.name || '',
    type: resData.value?.data?.type || ChartType.TABLE
  }))

  onSuccess(() => {
    callback?.()
  })

  return { resData, quotas, dims, metadata, loading, query }
}
