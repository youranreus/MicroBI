import type { DatasetCreateParams } from '@/types/dataset'
import { createDataset, updateDataset, getDataset } from '@/api/dataset'
import { useRequest } from 'alova'
import type { FormRules, FormInst } from 'naive-ui'

const rules: FormRules = {
  datasource: [
    {
      required: true,
      message: '请选择数据源'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  tablename: [
    {
      required: true,
      message: '请输入数据表名'
    }
  ]
}

export const useDataset = (formRef: Ref<FormInst | undefined>, id?: number) => {
  const editData = ref<Partial<DatasetCreateParams>>({
    name: '',
    datasource: undefined,
    tablename: '',
    fields: []
  })

  const canSave = ref(false)
  const msg = useMessage()
  const router = useRouter()
  const restoreLoading = ref(false)
  const testLoading = ref(false)

  const {
    send: sendCreate,
    loading: createLoading,
    onSuccess: onCreateSuccess,
    onError: onCreateError
  } = useRequest(id ? updateDataset : createDataset, {
    immediate: false
  })

  const loading = computed(() => createLoading.value || testLoading.value || restoreLoading.value)

  const commonBindings = computed(() => ({
    disabled: loading.value,
    loading: loading.value
  }))

  const formBindings = computed(() => ({
    ...commonBindings.value,
    rules,
    model: editData.value
  }))

  const bindings = computed(() => {
    const keys = Object.keys(editData.value)

    const allBindings = keys.reduce(
      (p, c) => {
        return {
          ...p,
          [c]: {
            ...commonBindings.value,
            value: editData.value[c as keyof DatasetCreateParams],
            'on-update:value': (val: any) => {
              Object.assign(editData.value, {
                [c]: val
              })
              canSave.value = false
            }
          }
        }
      },
      {} as Record<keyof DatasetCreateParams, Record<string, any>>
    )

    return allBindings
  })

  const test = () => {
    formRef.value
      ?.validate()
      .then(() => {
        console.log(editData.value)
      })
      .catch(() => {})
  }

  const send = () => {
    formRef.value
      ?.validate()
      .then(() => {
        if (!canSave.value) {
          return
        }

        sendCreate(editData.value, id)
      })
      .catch(() => {})
  }

  onCreateSuccess(() => {
    msg.success('操作成功')
    router.push({ name: 'datasource-admin-index' })
  })

  onCreateError((e) => {
    msg.error(e.error.message)
  })

  onMounted(() => {
    if (id) {
      restoreLoading.value = true
      getDataset(id)
        .then((res) => {
          console.log(res)
          editData.value.name = res.data.meta.name
          editData.value.tablename = res.data.meta.tablename
          editData.value.datasource = res.data.meta.datasource as number
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
    canSave,
    editData,
    loading,
    bindings,
    commonBindings,
    formBindings,
    test,
    send
  }
}
