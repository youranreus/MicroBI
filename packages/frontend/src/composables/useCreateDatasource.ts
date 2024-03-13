import { type DatasourceConnection, DatasourceType } from '@/types/datasource'
import { testDatasourceConnection, createDatasource } from '@/api/datasource'
import { useRequest } from 'alova'
import { useWorkspaceStore } from '@/stores/workspace'

export const useCreateDatasource = () => {
  const connection = ref<DatasourceConnection>({
    ip: '',
    port: 3306,
    user: '',
    password: '',
    database: '',
    type: DatasourceType.MYSQL
  })

  const { data: workspace } = useWorkspaceStore()
  const name = ref('')
  const canSave = ref(false)
  const msg = useMessage()
  const router = useRouter()

  const {
    send: sendCreate,
    loading: createLoading,
    onSuccess: onCreateSuccess,
    onError: onCreateError
  } = useRequest(createDatasource, {
    immediate: false
  })

  const {
    send: sendTest,
    loading: testLoading,
    onSuccess: onTestSuccess,
    onError: onTestError
  } = useRequest(testDatasourceConnection, {
    immediate: false
  })

  const loading = computed(() => createLoading.value || testLoading.value)

  const commonBindings = computed(() => ({
    disabled: loading.value,
    loading: loading.value
  }))

  const bindings = computed(() => {
    const keys = Object.keys(connection.value)

    const allBindings = keys.reduce(
      (p, c) => {
        return {
          ...p,
          [c]: {
            ...commonBindings.value,
            value: connection.value[c as keyof DatasourceConnection],
            'on-update:value': (val: any) => {
              Object.assign(connection.value, {
                [c]: val
              })
              canSave.value = false
            }
          }
        }
      },
      {} as Record<keyof DatasourceConnection | 'name', Record<string, any>>
    )

    allBindings.name = {
      ...commonBindings.value,
      value: name.value,
      'on-update:value': (val: string) => (name.value = val)
    }

    return allBindings
  })

  const test = () => {
    sendTest(connection.value)
  }

  const create = () => {
    if (!canSave.value) {
      return
    }

    sendCreate({
      ...connection.value,
      name: name.value,
      workspace: workspace.value.id
    })
  }

  onTestSuccess((res) => {
    canSave.value = res.data?.data?.status === true
    if (res.data?.data?.status === true) {
      msg.success('连接成功')
      return
    }

    msg.error('连接失败，请检查参数')
  })

  onCreateSuccess(() => {
    msg.success('创建成功')
    router.push({ name: 'datasource-admin-index' })
  })

  onTestError((e) => {
    msg.error(e.error.message)
  })

  onCreateError((e) => {
    msg.error(e.error.message)
  })

  return { canSave, name, loading, connection, bindings, commonBindings, test, create }
}
