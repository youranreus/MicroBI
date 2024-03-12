import type { WorkspaceData } from '@/types/workspace'
import { useWorkspaceStore } from '@/stores/workspace'
import { cloneDeep } from 'lodash-es'
import { updateWorkspace, delWorkspace } from '@/api/workspace'
import { useUserStore } from '@/stores/user'
import { useRequest } from 'alova'

export const useEditWorkspace = () => {
  const { data, refresh } = useWorkspaceStore()
  const { userData } = useUserStore()

  const msg = useMessage()
  const dialog = useDialog()
  const router = useRouter()
  const isQuit = ref(false)

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
    if (isQuit.value) {
      msg.success('退出成功')
      router.push({ name: 'workspace-index' })
      return
    }
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
      users: editData.value.users.map((u) => u.id)
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

  const removeUser = (id: number) => {
    editData.value.users = editData.value.users.filter((u) => u.id !== id)
    confirmUpdate()
  }

  const quit = () => {
    isQuit.value = true
    removeUser(userData.value.id)
  }

  const del = () => {
    const d = dialog.warning({
      title: `删除工作区`,
      content: `你确定要删除工作区「${editData.value.name}」吗`,
      positiveText: '删除',
      negativeText: '取消',
      positiveButtonProps: {
        secondary: true,
        ghost: false
      },
      negativeButtonProps: {
        secondary: true,
        ghost: false
      },
      onPositiveClick: () => {
        d.loading = true
        return new Promise((rs) => {
          delWorkspace(editData.value.id)
            .then(() => {
              msg.success('删除成功')
              router.push({ name: 'workspace-index' })
            })
            .then(rs)
        })
      }
    })
  }

  return {
    editData,
    loading,
    nameBindings,
    logoBindings,
    commonBindings,
    confirmUpdate,
    removeUser,
    quit,
    del
  }
}
