import { getDatasetList } from '@/api/dataset'
import { useWorkspaceStore } from '@/stores/workspace'
import { usePagination } from '@alova/scene-vue'

export const useDatasetList = () => {
  const msg = useMessage()
  const searchValue = ref('')
  const datasource = ref<number>()
  const { data: ws } = useWorkspaceStore()

  const { refresh, data, loading, page, pageSize, total, onError } = usePagination(
    (page: number, size: number) =>
      getDatasetList(
        page,
        size,
        { workspace: ws.value.id, datasource: datasource.value },
        searchValue.value
      ),
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
      watchingStates: [searchValue, () => ws.value.id, datasource],
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

  const filterBindings = computed(() => ({
    value: datasource.value,
    'on-update:value': (val: number) => (datasource.value = val),
    loading: loading.value,
    disabled: loading.value
  }))

  onError((e) => {
    msg.error(e.error.message)
  })

  return { refresh, loading, data, searchBindings, pageBindings, filterBindings }
}
