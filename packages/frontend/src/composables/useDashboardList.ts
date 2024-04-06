import { getDashboardList } from '@/api/dashboard'
import { useWorkspaceStore } from '@/stores/workspace'
import { usePagination } from '@alova/scene-vue'

export const useDashboardList = () => {
  const msg = useMessage()
  const { data: ws } = useWorkspaceStore()
  const searchValue = ref('')

  const { refresh, data, loading, page, pageSize, total, onError } = usePagination(
    (page: number, size: number) => getDashboardList(page, size, ws.value.id, searchValue.value),
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
