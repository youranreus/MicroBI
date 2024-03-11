import type { WorkspaceData } from '@/types/workspace'

const INIT_WS_DATA: WorkspaceData = {
  id: -1,
  logo: null,
  name: '',
  users: [],
  created_at: '',
  updated_at: ''
}

const useStore = defineStore(
  'workspace',
  () => {
    const data = reactive<WorkspaceData>({ ...INIT_WS_DATA })

    const updateData = (val: WorkspaceData) => Object.assign(data, val)

    return { data, updateData }
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
