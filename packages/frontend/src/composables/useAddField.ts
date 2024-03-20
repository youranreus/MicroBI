import { addField } from '@/api/dataset'
import { FieldType, type Field } from '@/types/field'
import { useRequest } from 'alova'
import type { FormRules } from 'naive-ui'

const formRules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入姓名'
    }
  ],
  type: [
    {
      required: true,
      message: '请选择类型'
    }
  ],
  fieldname: [
    {
      required: true,
      message: '请输入数据库名'
    }
  ]
}

export const useAddField = (dataset: number, callback?: () => void) => {
  const msg = useMessage()
  const data = ref<Pick<Field, 'name' | 'type' | 'fieldname'>>({
    name: '',
    type: FieldType.STRING,
    fieldname: ''
  })

  const { loading, onSuccess, onError, send } = useRequest(addField, {
    immediate: false
  })

  const commonBindings = computed(() => ({
    loading: loading.value,
    disabled: loading.value
  }))

  const submit = () => {
    send(dataset, data.value)
  }

  onSuccess(() => {
    msg.success('创建成功')
    data.value = {
      name: '',
      type: FieldType.STRING,
      fieldname: ''
    }
    callback?.()
  })

  onError((e) => {
    console.log('🤔 e 是 ', e)
    msg.error('创建失败')
  })

  return { data, loading, formRules, commonBindings, submit }
}
