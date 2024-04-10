import { createDashboard, updateDashboard } from '@/api/dashboard'
import { useDashboardStore } from '@/stores/dashboard'
import { useWorkspaceStore } from '@/stores/workspace'
import type { DashboardSaveParam } from '@/types/dashboard'

export const useEditDashbaord = () => {
  const { data: ws } = useWorkspaceStore()
  const { metadata, charts } = useDashboardStore()
  const isCreate = computed(() => !metadata.value.id)
  const loading = ref(false)
  const msg = useMessage()
  const router = useRouter()

  const getSaveData = (): DashboardSaveParam => {
    return {
      name: metadata.value.name,
      workspace: ws.value.id,
      charts: charts.value.map((c) => ({
        chart: c.data.id,
        x: c.x,
        y: c.y,
        w: c.w,
        h: c.h
      }))
    }
  }

  const save = (callback?: () => void) => {
    const data = getSaveData()
    const query = !isCreate.value ? updateDashboard : createDashboard

    loading.value = true
    query(metadata.value.id, data)
      .then(() => {
        callback?.()

        if (isCreate.value) {
          msg.success('创建成功')
          router.push({ name: 'dashboard-list' })
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
