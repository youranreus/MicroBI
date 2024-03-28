import type { Condition } from '@/types/chart'
import type { DatasetMeta } from '@/types/dataset'
import { AnalyzeType } from '@/types/field'

const useStore = defineStore(
  'analyze',
  () => {
    const quotas = ref<Condition[]>([])
    const dims = ref<Condition[]>([])
    const filters = ref<Condition[]>([])
    const dataset = ref<DatasetMeta>()
    const allFields = ref<Condition[]>([])

    const currentDatasetId = computed(() => dataset.value?.id)

    const conditions = computed<Record<AnalyzeType, Ref<Condition[]>>>(() => {
      return {
        [AnalyzeType.DIM]: dims,
        [AnalyzeType.QUOTA]: quotas,
        [AnalyzeType.FILTER]: filters
      }
    })

    const resetChart = () => {
      quotas.value = []
      dims.value = []
      filters.value = []
    }

    const changeDataset = (data: DatasetMeta) => {
      if (data.id !== dataset.value?.id) {
        dataset.value = data
        resetChart()
      }
    }

    const changeFields = (data: Condition[]) => {
      allFields.value = data
    }

    const updateField = (type: AnalyzeType, data: Condition[]) => {
      conditions.value[type].value = data
    }

    const addFieldTo = (type: AnalyzeType, data: Condition) => {
      conditions.value[type].value = [...conditions.value[type].value, data]
    }

    return {
      quotas,
      dims,
      filters,
      conditions,
      dataset,
      allFields,
      currentDatasetId,
      changeDataset,
      changeFields,
      resetChart,
      updateField,
      addFieldTo
    }
  },
  {
    persist: {
      key: 'analyze-store'
    }
  }
)

export const useAnalyzeStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
