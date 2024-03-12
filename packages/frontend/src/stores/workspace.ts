import type { RouteLocationNormalized } from 'vue-router'
import type { WorkspaceData } from '@/types/workspace'
import { useRequest } from 'alova'
import { getWorkspaceDetail } from '@/api/workspace'

const INIT_WS_DATA: WorkspaceData = {
  id: -1,
  logo: null,
  name: '',
  users: [],
  datasources: [],
  created_at: '',
  updated_at: ''
}

const useStore = defineStore(
  'workspace',
  () => {
    const data = reactive<WorkspaceData>({ ...INIT_WS_DATA })
    const msg = useMessage()

    const updateData = (val: WorkspaceData) => Object.assign(data, val)

    const { send, loading, onSuccess, onError } = useRequest(
      (id: number) => getWorkspaceDetail(id),
      {
        immediate: false,
        force: true
      }
    )

    const handleChangeWorkspace = (route: RouteLocationNormalized) => {
      if (!route.params.wsId) {
        updateData({ ...INIT_WS_DATA })
        return
      }

      if (data.id !== Number(route.params.wsId)) {
        send(Number(route.params.wsId))
      }
    }

    onSuccess((res) => {
      updateData(res.data.data)
    })

    onError((e) => {
      msg.error(e.error.message)
      updateData({ ...INIT_WS_DATA })
      console.log(e)
    })

    const refresh = () => {
      send(data.id)
    }

    return { data, loading, updateData, handleChangeWorkspace, refresh }
  },
  {
    persist: {
      key: 'workspace-store'
    }
  }
)

export const useWorkspaceStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
