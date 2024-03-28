import { queryData } from '@/api/dataset'
import { useAnalyzeStore } from '@/stores/analyze'
import { useQueryStore } from '@/stores/query'

export const useQueryChart = () => {
  const { conditions, dataset } = useAnalyzeStore()
  const { loading, setLoading, updateData } = useQueryStore()

  const canQuery = computed(() => conditions.value.quota.value.length)

  const query = () => {
    if (!canQuery.value || !dataset.value) return

    setLoading(true)
    queryData(dataset.value.id, {
      quotas: conditions.value.quota.value,
      dims: conditions.value.dim.value,
      filters: conditions.value.filter.value
    })
      .then((res) => {
        console.log('🤔 res 是 ', res.data)
        updateData(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { canQuery, loading, query }
}
