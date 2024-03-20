<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">{{ isEdit ? '编辑' : '创建' }}数据集</div>

    <n-button v-bind="commonBindings" type="info" secondary @click="redirectBack">返回</n-button>
  </div>

  <n-form ref="formRef" v-bind="formBindings">
    <n-form-item path="name" label="名称">
      <n-input v-bind="bindings.name" placeholder="数据源名称"></n-input>
    </n-form-item>
    <n-form-item path="datasource" label="数据源">
      <n-select
        v-bind="bindings.datasource"
        :disabled="isEdit"
        :options="dsOptions"
        placeholder="数据源"
      ></n-select>
    </n-form-item>
    <n-form-item path="tablename" label="数据库表名">
      <n-input v-bind="bindings.tablename" :disabled="isEdit" placeholder="tablename"></n-input>
    </n-form-item>
    <n-form-item path="fields" label="数据列信息">
      <n-data-table v-bind="tableBindings" bordered></n-data-table>
    </n-form-item>
  </n-form>
  <n-flex justify="space-between">
    <n-flex>
      <n-button
        v-bind="commonBindings"
        :disabled="loading || isEdit"
        type="primary"
        secondary
        @click="getColumn"
      >
        获取数据列
      </n-button>
      <add-field-dialog
        v-if="isEdit"
        :dataset="Number(route.params.setId)"
        :callback="restoreData"
      />
    </n-flex>
    <n-button
      v-bind="commonBindings"
      type="info"
      secondary
      :disabled="!canSave || loading"
      @click="send"
    >
      {{ isEdit ? '保存' : '创建' }}
    </n-button>
  </n-flex>
</template>
<script setup lang="ts">
import { type FormInst } from 'naive-ui'
import AddFieldDialog from '../../components/add-field-dialog.vue'
import { useDatasourceList } from '@/composables/useDatasourceList'
import { useDataset } from '@/composables/useDataset'

defineOptions({
  name: 'EditDataset'
})

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInst>()

const isEdit = computed(() => route.name === 'dataset-admin-edit')

const { data: datasources } = useDatasourceList(100)
const {
  formBindings,
  canSave,
  loading,
  bindings,
  commonBindings,
  tableBindings,
  getColumn,
  send,
  restoreData
} = useDataset(formRef, Number(route.params.setId))

const dsOptions = computed(() =>
  datasources.value.map((ds) => ({
    label: ds.name,
    value: ds.id
  }))
)

const redirectBack = () => {
  router.push({ name: 'dataset-admin-index' })
}
</script>
