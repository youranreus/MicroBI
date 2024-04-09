import type { DashboardChartItem, DashboardDetail, DashboardMeta } from '@/types/dashboard'
import { cloneDeep } from 'lodash-es'

const DEFAULT_VALUE = {
  name: '',
  id: 0,
  created_at: '',
  updated_at: '',
  creator: {
    id: 0,
    avatar: '',
    name: '',
    email: '',
    created_at: '',
    updated_at: ''
  }
}

const useStore = defineStore(
  'dashboard',
  () => {
    const metadata = ref<
      Pick<DashboardMeta, 'id' | 'name' | 'updated_at' | 'created_at' | 'creator'>
    >(cloneDeep(DEFAULT_VALUE))

    const charts = ref<DashboardChartItem[]>([])

    const editMode = ref(false)

    const initDashbaord = (data: DashboardDetail) => {
      metadata.value = {
        name: data.name,
        id: data.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        creator: data.creator
      }

      charts.value = data.charts
    }

    const updateCharts = (data: DashboardChartItem[]) => (charts.value = data)

    const updateName = (data: string) => (metadata.value.name = data)

    const reset = () => {
      metadata.value = cloneDeep(DEFAULT_VALUE)
      charts.value = []
    }

    const toggleEditMode = (val?: boolean) => (editMode.value = val ?? !editMode.value)

    return {
      metadata,
      charts,
      editMode,
      initDashbaord,
      updateCharts,
      updateName,
      reset,
      toggleEditMode
    }
  },
  {
    persist: false
  }
)

export const useDashboardStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
