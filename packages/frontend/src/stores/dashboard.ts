import type { DashboardChartItem, DashboardDetail, DashboardMeta } from '@/types/dashboard'

const useStore = defineStore(
  'dashboard',
  () => {
    const metadata = ref<Pick<DashboardMeta, 'id' | 'name' | 'updated_at' | 'created_at'>>({
      name: '',
      id: 0,
      created_at: '',
      updated_at: ''
    })

    const charts = ref<DashboardChartItem[]>([])

    const initDashbaord = (data: DashboardDetail) => {
      metadata.value = {
        name: data.name,
        id: data.id,
        created_at: data.created_at,
        updated_at: data.updated_at
      }

      charts.value = data.charts
    }

    const updateCharts = (data: DashboardChartItem[]) => (charts.value = data)

    const updateName = (data: string) => (metadata.value.name = data)

    return { metadata, charts, initDashbaord, updateCharts, updateName }
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
