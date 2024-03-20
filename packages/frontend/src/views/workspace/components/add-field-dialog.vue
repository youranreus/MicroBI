<template>
  <n-button secondary type="info" @click="visible = true">新增字段</n-button>
  <n-modal v-model:show="visible">
    <n-card title="新增字段" class="w-[500px]">
      <n-form ref="formRef" :model="data" :rules="formRules">
        <n-form-item path="name" label="名称">
          <n-input v-model:value="data.name" v-bind="commonBindings"></n-input>
        </n-form-item>
        <n-form-item path="fieldname" label="数据库字段名">
          <n-input v-model:value="data.fieldname" v-bind="commonBindings"></n-input>
        </n-form-item>
        <n-form-item path="type" label="类型">
          <n-select
            v-model:value="data.type"
            v-bind="commonBindings"
            :options="FieldTypeOptions"
          ></n-select>
        </n-form-item>
      </n-form>

      <template #footer>
        <n-flex justify="end">
          <n-button v-bind="commonBindings" secondary type="primary" @click="handleConfirm">
            添加
          </n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { useAddField } from '@/composables/useAddField'
import { FieldTypeOptions } from '@/utils/constants'
import type { FormInst } from 'naive-ui'

defineOptions({
  name: 'AddFieldDialog'
})

interface Props {
  dataset: number
  callback?: () => void
}

const props = defineProps<Props>()
const formRef = ref<FormInst>()
const visible = ref(false)

const { data, formRules, commonBindings, submit } = useAddField(props.dataset, () => {
  visible.value = false
  props.callback?.()
})

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      submit()
    })
    .catch(() => {})
}
</script>
