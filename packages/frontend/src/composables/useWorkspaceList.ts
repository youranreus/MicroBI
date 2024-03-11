import { getWorkspaceList } from '@/api/workspace'
import { usePagination } from '@alova/scene-vue'

export const useWorkspaceList = (type: 'user' | 'all' = 'all') => {
  const msg = useMessage()
  const searchValue = ref('')

  const { data, loading, page, pageSize, total, onError } = usePagination(
    (page: number, size: number) => getWorkspaceList(page, size, type, searchValue.value),
    {
      initialPage: 1,
      initialPageSize: 10,
      initialData: {
        code: 0,
        msg: '',
        data: {
          total: 0,
          items: []
        }
      },
      total: (res) => res.data.total,
      data: (res) => res.data.items,
      watchingStates: [searchValue],
      debounce: 300
    }
  )

  const pageBindings = computed(() => ({
    page: page.value,
    itemCount: total.value,
    pageSize: pageSize.value,
    'on-upate:page': (val: number) => (page.value = val),
    'on-upate:page-size': (val: number) => (pageSize.value = val),
    loading: loading.value
  }))

  const searchBindings = computed(() => ({
    value: searchValue.value,
    'on-input': (val: string) => (searchValue.value = val),
    loading: loading.value
  }))

  onError((e) => {
    msg.error(e.error.message)
  })

  return { loading, data, searchBindings, pageBindings }
}
