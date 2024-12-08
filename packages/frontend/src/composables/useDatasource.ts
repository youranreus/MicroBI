import { type DatasourceConnection, DatasourceType } from '@/types/datasource'
import {
  testDatasourceConnection,
  createDatasource,
  updateDatasource,
  getDatasource
} from '@/api/datasource'
import { useRequest } from 'alova'
import { useWorkspaceStore } from '@/stores/workspace'
import type { FormRules, FormInst } from 'naive-ui'

const rules: FormRules = {
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  ip: [
    {
      required: true,
      message: '请输入数据库IP'
    }
  ],
  user: [
    {
      required: true,
      message: '请输入数据库用户名'
    }
  ],
  port: [
    {
      required: true,
      message: '请输入数据库端口'
    }
  ],
  type: [
    {
      required: true,
      message: '请选择数据库类型'
    }
  ],
  database: [
    {
      required: true,
      message: '请输入数据库名'
    }
  ]
}

export const useDatasource = (formRef: Ref<FormInst | undefined>, id?: number) => {
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
  const restoreLoading = ref(false)

  const {
    send: sendCreate,
    loading: createLoading,
    onSuccess: onCreateSuccess,
    onError: onCreateError
  } = useRequest(id ? updateDatasource : createDatasource, {
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

  const loading = computed(() => createLoading.value || testLoading.value || restoreLoading.value)

  const formData = computed(() => ({
    ...connection.value,
    name: name.value
  }))

  const commonBindings = computed(() => ({
    disabled: loading.value,
    loading: loading.value
  }))

  const formBindings = computed(() => ({
    ...commonBindings.value,
    rules,
    model: formData.value
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
    formRef.value
      ?.validate()
      .then(() => {
        sendTest(connection.value)
      })
      .catch(() => {})
  }

  const send = () => {
    formRef.value
      ?.validate()
      .then(() => {
        if (!canSave.value || !id) {
          return
        }

        sendCreate(
          {
            ...connection.value,
            name: name.value,
            workspace: workspace.value.id
          },
          id
        )
      })
      .catch(() => {})
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
    msg.success('操作成功')
    router.push({ name: 'datasource-admin-index' })
  })

  onTestError((e) => {
    msg.error(e.error.message)
  })

  onCreateError((e) => {
    msg.error(e.error.message)
  })

  onMounted(() => {
    if (id) {
      restoreLoading.value = true
      getDatasource(id)
        .then((res) => {
          name.value = res.data.meta.name
          connection.value.type = res.data.meta.type
        })
        .catch((e) => {
          console.log(e)
          msg.error('获取数据失败')
        })
        .finally(() => {
          restoreLoading.value = false
        })
    }
  })

  return {
    formRules: rules,
    formData,
    canSave,
    name,
    loading,
    connection,
    bindings,
    commonBindings,
    formBindings,
    test,
    send
  }
}
