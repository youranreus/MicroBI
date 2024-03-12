import type { WorkspaceData } from '@/types/workspace'
import { useWorkspaceStore } from '@/stores/workspace'
import { cloneDeep } from 'lodash-es'
import { updateWorkspace } from '@/api/workspace'
import { useRequest } from 'alova'

export const useEditWorkspace = () => {
  const { data, refresh } = useWorkspaceStore()

  const msg = useMessage()

  const editData = ref<WorkspaceData>(cloneDeep(data.value))

  const { send, loading, onSuccess, onError } = useRequest(updateWorkspace, {
    immediate: false
  })

  watch(
    () => data.value,
    () => {
      editData.value = cloneDeep(data.value)
    },
    {
      deep: true
    }
  )

  onSuccess(() => {
    msg.success('保存成功')
    refresh()
  })

  onError((e) => {
    msg.error('保存失败')
    console.log('🤔 e 是 ', e)
  })

  const confirmUpdate = () => {
    send(data.value.id, {
      name: editData.value.name,
      logo: editData.value.logo,
      users: editData.value.users
    })
  }

  const commonBindings = computed(() => ({
    disabled: loading.value,
    loading: loading.value
  }))

  const nameBindings = computed(() => ({
    ...commonBindings.value,
    value: editData.value.name,
    'on-input': (val: string) => (editData.value.name = val)
  }))

  const logoBindings = computed(() => ({
    ...commonBindings.value,
    value: editData.value.logo,
    'on-input': (val: string) => (editData.value.logo = val)
  }))

  return { editData, loading, nameBindings, logoBindings, commonBindings, confirmUpdate }
}
