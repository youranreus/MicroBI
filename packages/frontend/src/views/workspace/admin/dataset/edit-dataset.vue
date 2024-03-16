<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">{{ isEdit ? '编辑' : '创建' }}数据集</div>

    <n-button type="info" secondary @click="redirectBack">返回</n-button>
  </div>

  <n-form ref="formRef">
    <n-form-item path="name" label="名称">
      <n-input placeholder="数据源名称"></n-input>
    </n-form-item>
    <n-form-item path="datasource" label="数据源">
      <n-select :options="dsOptions" placeholder="数据源"></n-select>
    </n-form-item>
    <n-form-item path="tablename" label="数据库表名">
      <n-input placeholder="tablename"></n-input>
    </n-form-item>
  </n-form>
  <n-flex justify="space-between">
    <n-button type="primary" secondary> 测试连接 </n-button>
    <n-button type="info" secondary>
      {{ isEdit ? '保存' : '创建' }}
    </n-button>
  </n-flex>
</template>
<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { useDatasourceList } from '@/composables/useDatasourceList'

defineOptions({
  name: 'EditDataset'
})

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInst>()

const isEdit = computed(() => route.name === 'dataset-admin-edit')

const { data: datasources } = useDatasourceList(100)

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
