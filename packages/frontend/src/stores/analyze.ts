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
    const name = ref('新建图表')
    const id = ref(0)

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
      dataset.value = undefined
    }

    const changeDataset = (data: DatasetMeta) => {
      if (data.id !== dataset.value?.id) {
        resetChart()
        dataset.value = data
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

    const setName = (val: string) => (name.value = val)

    const setId = (val: number) => (id.value = val)

    const clear = () => {
      quotas.value = []
      dims.value = []
      filters.value = []
      dataset.value = undefined
      allFields.value = []
      type.value = ChartType.TABLE
      name.value = '新建图表'
      id.value = 0
    }

    return {
      quotas,
      dims,
      filters,
      conditions,
      type,
      name,
      id,
      dataset,
      allFields,
      currentDatasetId,
      changeDataset,
      changeFields,
      resetChart,
      updateField,
      addFieldTo,
      changeType,
      setName,
      clear,
      setId
    }
  },
  {
    persist: false
  }
)

export const useAnalyzeStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
