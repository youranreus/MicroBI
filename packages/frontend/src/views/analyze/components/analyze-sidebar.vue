<template>
  <div class="p-2 flex flex-col gap-y-4 h-full">
    <div class="text-lg font-bold pt-2">{{ isEdit ? '编辑' : '创建' }}分析</div>

    <div class="flex flex-col gap-y-2">
      <div>选择数据集</div>
      <n-select
        :value="dataset?.id"
        placeholder="数据集"
        :loading="datasetLoading"
        :options="datasetOptions"
        filterable
        :on-update:value="handleSelectDataset"
      ></n-select>
    </div>

    <div>字段列表</div>
    <n-spin :show="fieldsLoading">
      <div class="flex flex-col gap-y-1">
        <field-item v-for="field in fieldList?.data" :key="field.id" :field="field" />
      </div>
    </n-spin>
    <div
      v-if="!datasetLoading && !fieldList?.data?.length"
      class="flex-1 flex items-center justify-center"
    >
      <n-empty description="暂无可用字段"></n-empty>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDatasetList } from '@/composables/useDatasetList'
import { useDatasetFields } from '@/composables/useDatasetFields'
import { useAnalyzeStore } from '@/stores/analyze'
import FieldItem from './field-item.vue'
import type { DatasetMeta } from '@/types/dataset'
import { useQueryStore } from '@/stores/query'

defineOptions({
  name: 'AnalyzeSidebar'
})

const route = useRoute()
const { data: datasetList, loading: datasetLoading } = useDatasetList(100)
const { dataset, currentDatasetId, changeDataset, changeFields } = useAnalyzeStore()
const { updateData } = useQueryStore()

const { data: fieldList, loading: fieldsLoading } = useDatasetFields(currentDatasetId, () => {
  changeFields(fieldList.value.data)
})

const isEdit = computed(() => route.name === 'analyze-edit')
const datasetOptions = computed(() => {
  return datasetList.value.map((ds) => ({
    label: ds.name,
    value: ds.id
  }))
})

const handleSelectDataset = (value: number) => {
  changeDataset(datasetList.value.find((ds) => ds.id === value) as DatasetMeta)
  updateData({
    data: [],
    sql: ''
  })
}
</script>
