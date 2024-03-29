import { getDatasourceList } from '@/api/datasource'
import { useWorkspaceStore } from '@/stores/workspace'
import { usePagination } from '@alova/scene-vue'

export const useDatasourceList = (size = 10) => {
  const msg = useMessage()
  const searchValue = ref('')
  const { data: ws } = useWorkspaceStore()

  const { refresh, data, loading, page, pageSize, total, onError } = usePagination(
    (page: number, size: number) => getDatasourceList(page, size, ws.value.id, searchValue.value),
    {
      initialPage: 1,
      initialPageSize: size,
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
      watchingStates: [searchValue, () => ws.value.id],
      debounce: 300
    }
  )

  const pageBindings = computed(() => ({
    page: page.value,
    itemCount: total.value,
    pageSize: pageSize.value,
    'on-update:page': (val: number) => (page.value = val),
    'on-update:page-size': (val: number) => (pageSize.value = val),
    loading: loading.value,
    disabled: loading.value
  }))

  const searchBindings = computed(() => ({
    value: searchValue.value,
    'on-input': (val: string) => (searchValue.value = val),
    loading: loading.value,
    disabled: loading.value
  }))

  onError((e) => {
    msg.error(e.error.message)
  })

  return { refresh, loading, data, searchBindings, pageBindings }
}
