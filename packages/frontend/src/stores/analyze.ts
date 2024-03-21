import type { DatasetMeta } from '@/types/dataset'
import type { Field } from '@/types/field'

const useStore = defineStore(
  'analyze',
  () => {
    const quotas = ref<Field[]>([])
    const dims = ref<Field[]>([])
    const filters = ref<Field[]>([])
    const dataset = ref<DatasetMeta>()
    const allFields = ref<Field[]>([])

    const resetChart = () => {
      quotas.value = []
      dims.value = []
      filters.value = []
    }

    const changeDataset = (data: DatasetMeta) => {
      dataset.value = data
      resetChart()
    }

    const changeFields = (data: Field[]) => {
      allFields.value = data
    }

    const updateField = (type: 'dim' | 'quota' | 'filter', data: Field[]) => {
      const map: Record<'dim' | 'quota' | 'filter', Ref<Field[]>> = {
        dim: dims,
        quota: quotas,
        filter: filters
      }

      map[type].value = data
    }

    return {
      quotas,
      dims,
      filters,
      dataset,
      allFields,
      changeDataset,
      changeFields,
      resetChart,
      updateField
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
