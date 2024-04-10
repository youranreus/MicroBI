import { createDashboard, delDashboard, updateDashboard } from '@/api/dashboard'
import { useDashboardStore } from '@/stores/dashboard'
import { useWorkspaceStore } from '@/stores/workspace'
import type { DashboardSaveParam } from '@/types/dashboard'

export const useEditDashbaord = () => {
  const { data: ws } = useWorkspaceStore()
  const { metadata, charts } = useDashboardStore()
  const isCreate = computed(() => !metadata.value.id)
  const loading = ref(false)
  const msg = useMessage()
  const dialog = useDialog()
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

  const sendDel = (callback?: () => void) => {
    loading.value = true
    delDashboard(metadata.value.id)
      .then(() => {
        callback?.()

        msg.success('删除成功')
        router.push({ name: 'dashboard-list' })
      })
      .catch((e) => {
        msg.error(e.message)
      })
      .finally(() => {
        loading.value = false
      })
  }

  const del = (callback?: () => void) => {
    if (isCreate.value) return
    const d = dialog.warning({
      title: `删除「${metadata.value.name}」`,
      content: '确定要删除该看板吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        d.loading = true
        return new Promise((rs) =>
          sendDel(() => {
            rs(true)
            callback?.()
          })
        )
      }
    })
  }

  return { loading, save, del }
}
