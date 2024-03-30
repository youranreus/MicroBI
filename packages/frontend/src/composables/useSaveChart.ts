import { createChart, updateChart } from '@/api/chart'
import { useAnalyzeStore } from '@/stores/analyze'
import { useWorkspaceStore } from '@/stores/workspace'
import { SortType, type ChartSaveParams } from '@/types/chart'

export const useSaveChart = () => {
  const { conditions, name, type, id } = useAnalyzeStore()
  const { data: ws } = useWorkspaceStore()
  const loading = ref(false)
  const msg = useMessage()
  const router = useRouter()

  const getSaveData = (): ChartSaveParams => {
    const quotas = conditions.value.quota.value.map((f) => f.id)
    const dims = conditions.value.dim.value.map((f) => f.id)

    const quotaData = conditions.value.quota.value.map((f) => ({
      id: f.id,
      calc: f.calc
    }))
    const dimData = conditions.value.dim.value.map((f) => ({
      id: f.id,
      sort: f.sort || SortType.NONE
    }))

    return {
      name: name.value,
      type: type.value,
      workspace: ws.value.id,
      quotas,
      dims,
      quotaData,
      dimData,
      filters: []
    }
  }

  const save = () => {
    const data = getSaveData()
    const query = id.value ? updateChart : createChart

    loading.value = true
    query(id.value, data)
      .then(() => {
        if (!id.value) {
          msg.success('创建成功')
          router.push({ name: 'analyze-gallery' })
        } else {
          msg.success('保存成功')
        }
      })
      .catch((e) => {
        msg.error(e.message)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { loading, save }
}
