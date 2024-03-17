import type { DatasetCreateParams } from '@/types/dataset'
import { createDataset, updateDataset, getDataset, getTableColumn } from '@/api/dataset'
import { useRequest } from 'alova'
import { FieldTypeOptions } from '@/utils/constants'
import type { FormRules, FormInst, DataTableColumns } from 'naive-ui'
import { NInput, NSelect } from 'naive-ui'
import type { Field } from '@/types/field'

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
  ],
  fields: [
    {
      validator(_r, value: Field[]) {
        return value.every((v) => !!v.name)
      },
      trigger: ['blur']
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

  const canSave = ref(!!id)
  const msg = useMessage()
  const router = useRouter()
  const restoreLoading = ref(false)
  const columnLoading = ref(false)

  const {
    send: sendCreate,
    loading: createLoading,
    onSuccess: onCreateSuccess,
    onError: onCreateError
  } = useRequest(id ? updateDataset : createDataset, {
    immediate: false
  })

  const loading = computed(() => createLoading.value || columnLoading.value || restoreLoading.value)

  const commonBindings = computed(() => ({
    disabled: loading.value,
    loading: loading.value
  }))

  const formBindings = computed(() => ({
    ...commonBindings.value,
    rules,
    model: editData.value
  }))

  const tableBindings = computed(() => {
    const columns: DataTableColumns<Field> = [
      {
        title: '字段名',
        key: 'fieldname'
      },
      {
        title: '展示名',
        key: 'name',
        render(rowData, rowIndex) {
          return h(NInput, {
            value: rowData.name,
            onUpdateValue(v) {
              if (editData.value.fields) {
                editData.value.fields[rowIndex].name = v
              }
            }
          })
        }
      },
      {
        title: '类型',
        key: 'type',
        render(rowData, rowIndex) {
          return h(NSelect, {
            value: rowData.type,
            onUpdateValue(v) {
              if (editData.value.fields) {
                editData.value.fields[rowIndex].type = v
              }
            },
            options: FieldTypeOptions,
            disabled: !!id
          })
        }
      }
    ]

    return {
      columns,
      data: editData.value.fields,
      ...commonBindings.value
    }
  })

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
              canSave.value = !!id
            }
          }
        }
      },
      {} as Record<keyof DatasetCreateParams, Record<string, any>>
    )

    return allBindings
  })

  const getColumn = () => {
    columnLoading.value = true
    formRef.value
      ?.validate()
      .then(() =>
        getTableColumn(editData.value.datasource as number, editData.value.tablename as string)
      )
      .then((res) => {
        editData.value.fields = res.data.map((field) => ({
          ...field,
          fieldname: field.name
        }))
        canSave.value = !!res.data.length

        canSave.value && msg.success('获取成功')
        !canSave.value && msg.error('未获取到数据列信息')
      })
      .catch(() => {})
      .finally(() => {
        columnLoading.value = false
      })
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
    router.push({ name: 'dataset-admin-index' })
  })

  onCreateError((e) => {
    msg.error(e.error.message)
  })

  onMounted(() => {
    if (id) {
      restoreLoading.value = true
      getDataset(id)
        .then((res) => {
          editData.value.name = res.data.meta.name
          editData.value.tablename = res.data.meta.tablename
          editData.value.datasource = res.data.meta.datasource as number
          editData.value.fields = res.data.fields
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
    tableBindings,
    getColumn,
    send
  }
}
