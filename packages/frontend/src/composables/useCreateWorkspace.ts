import { createWorkspace } from '@/api/workspace'
import { useRequest } from 'alova'

export const useCreateWorkspace = (needRedirect = true) => {
  const msg = useMessage()
  const workspaceName = ref('')
  const router = useRouter()
  const { loading, send, onSuccess, onError } = useRequest(createWorkspace, { immediate: false })

  const setWorkspaceName = (val: string) => (workspaceName.value = val)

  const workspaceNameBindings = computed(() => ({
    value: workspaceName.value,
    'on-input': setWorkspaceName,
    loading: loading.value,
    disabled: loading.value
  }))

  const create = () => {
    send(workspaceName.value)
  }

  onSuccess((res) => {
    msg.success('创建成功')
    if (needRedirect && res.data?.data?.id) {
      router.push({ name: 'workspace-admin-layout', params: { wsId: res.data?.data?.id } })
    }
  })

  onError((e) => {
    msg.error('创建失败')
    console.log(e)
  })

  return { loading, workspaceNameBindings, setWorkspaceName, create }
}
