import type { QueryDataRes } from '@/types/dataset'

const useStore = defineStore(
  'query',
  () => {
    const data = ref<QueryDataRes['data']>({
      data: [],
      sql: ''
    })
    const loading = ref(false)

    const setLoading = (val: boolean) => (loading.value = val)

    const updateData = (val: QueryDataRes['data']) => (data.value = val)

    return { data, loading, setLoading, updateData }
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
