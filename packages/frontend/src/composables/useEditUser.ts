import type { UserData } from '@/types/user'
import { useWorkspaceStore } from '@/stores/workspace'
import { useUserStore } from '@/stores/user'
import { updateUserData } from '@/api/user'
import { useRequest } from 'alova'

export const useEditUser = () => {
  const { userData, updateUser } = useUserStore()
  const { refresh } = useWorkspaceStore()

  const msg = useMessage()

  const editData = ref<Pick<UserData, 'name' | 'avatar'>>({
    name: userData.value.name,
    avatar: userData.value.avatar
  })

  const { send, loading, onSuccess, onError } = useRequest(updateUserData, {
    immediate: false
  })

  watch(
    () => userData.value,
    () => {
      editData.value = {
        name: userData.value.name,
        avatar: userData.value.avatar
      }
    },
    {
      deep: true
    }
  )

  onSuccess(() => {
    msg.success('保存成功')
    updateUser(editData.value)
    refresh()
  })

  onError((e) => {
    msg.error('保存失败')
    console.log('🤔 e 是 ', e)
  })

  const confirmUpdate = () => {
    send({
      name: editData.value.name,
      avatar: editData.value.avatar
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

  const avatarBindings = computed(() => ({
    ...commonBindings.value,
    value: editData.value.avatar,
    'on-input': (val: string) => (editData.value.avatar = val)
  }))

  return {
    editData,
    loading,
    nameBindings,
    avatarBindings,
    commonBindings,
    confirmUpdate
  }
}
