import { queryData } from '@/api/dataset'
import { useAnalyzeStore } from '@/stores/analyze'
import { useQueryStore } from '@/stores/query'

export const useQueryChart = () => {
  const { conditions, dataset } = useAnalyzeStore()
  const { loading, currentConditions, setLoading, updateData, saveConditions } = useQueryStore()

  const canQuery = computed(() => conditions.value.quota.value.length)

  const query = () => {
    if (!canQuery.value || !dataset.value) return

    setLoading(true)
    const saveCondition = {
      quota: conditions.value.quota.value,
      dim: conditions.value.dim.value,
      filter: conditions.value.filter.value
    }
    queryData(dataset.value.id, {
      quotas: conditions.value.quota.value,
      dims: conditions.value.dim.value,
      filters: conditions.value.filter.value
    })
      .then((res) => {
        updateData(res.data)
        saveConditions(saveCondition)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { canQuery, loading, currentConditions, query }
}
