import { type Condition, ChartType } from '@/types/chart'
import type { DatasetMeta } from '@/types/dataset'
import { AnalyzeType, type Field } from '@/types/field'

const useStore = defineStore(
  'analyze',
  () => {
    const quotas = ref<Condition[]>([])
    const dims = ref<Condition[]>([])
    const filters = ref<Condition[]>([])
    const dataset = ref<DatasetMeta>()
    const allFields = ref<Field[]>([])
    const type = ref<ChartType>(ChartType.TABLE)

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
      type.value = ChartType.TABLE
    }

    const changeDataset = (data: DatasetMeta) => {
      if (data.id !== dataset.value?.id) {
        dataset.value = data
        resetChart()
      }
    }

    const changeType = (val: ChartType) => (type.value = val)

    const changeFields = (data: Field[]) => {
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
      type,
      dataset,
      allFields,
      currentDatasetId,
      changeDataset,
      changeFields,
      resetChart,
      updateField,
      addFieldTo,
      changeType
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
