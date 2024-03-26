import type { DatasetMeta } from '@/types/dataset'
import { type Field, AnalyzeType } from '@/types/field'

const useStore = defineStore(
  'analyze',
  () => {
    const quotas = ref<Field[]>([])
    const dims = ref<Field[]>([])
    const filters = ref<Field[]>([])
    const dataset = ref<DatasetMeta>()
    const allFields = ref<Field[]>([])

    const currentDatasetId = computed(() => dataset.value?.id)

    const conditions = computed<Record<AnalyzeType, Ref<Field[]>>>(() => {
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

    const changeFields = (data: Field[]) => {
      allFields.value = data
    }

    const updateField = (type: AnalyzeType, data: Field[]) => {
      conditions.value[type].value = data
    }

    const addFieldTo = (type: AnalyzeType, data: Field) => {
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
