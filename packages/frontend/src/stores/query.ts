import type { Condition } from '@/types/chart'
import type { QueryDataRes } from '@/types/dataset'
import { AnalyzeType } from '@/types/field'

const useStore = defineStore(
  'query',
  () => {
    const data = ref<QueryDataRes['data']>({
      data: [],
      sql: ''
    })
    const currentConditions = ref<Record<AnalyzeType, Condition[]>>({
      [AnalyzeType.DIM]: [],
      [AnalyzeType.QUOTA]: [],
      [AnalyzeType.FILTER]: []
    })
    const loading = ref(false)

    const setLoading = (val: boolean) => (loading.value = val)

    const updateData = (val: QueryDataRes['data']) => (data.value = val)

    const saveConditions = (val: Record<AnalyzeType, Condition[]>) =>
      (currentConditions.value = val)

    return { data, loading, currentConditions, setLoading, updateData, saveConditions }
  },
  {
    persist: false
  }
)

export const useQueryStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
