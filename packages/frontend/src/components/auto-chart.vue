<template>
  <div>
    <n-data-table
      v-if="type === ChartType.TABLE"
      :columns="tableColumns"
      :data="data"
      bordered
      striped
    />
  </div>
</template>
<script setup lang="ts">
import { ChartType, type Condition } from '@/types/chart'
import type { AnalyzeType } from '@/types/field'

defineOptions({
  name: 'AutoChart'
})

const props = defineProps<{
  type: ChartType
  data: Record<string, any>[]
  conditions: Record<AnalyzeType, Condition[]>
}>()

const tableColumns = computed(() => {
  const dimCols = props.conditions.dim.map((f) => ({
    title: f.name,
    key: f.name
  }))

  const quotaCols = props.conditions.quota.map((f) => ({
    title: f.name,
    key: f.name
  }))

  return [...dimCols, ...quotaCols]
})
</script>
