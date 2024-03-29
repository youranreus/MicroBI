<template>
  <div v-if="!hasResult" class="h-full flex items-center justify-center">
    <n-empty size="large" description="请点击按钮查询以获取数据">
      <template #icon>
        <n-icon :component="FolderOpenOutline"> </n-icon>
      </template>
    </n-empty>
  </div>
  <div v-else class="flex flex-col p-4">
    <n-h5 prefix="bar">
      <n-text type="primary"> SQL </n-text>
    </n-h5>
    <v-code-block
      :code="data.sql"
      languages="sql"
      highlightjs
      theme="atom-one-light"
    ></v-code-block>
    <n-h5 prefix="bar">
      <n-text type="primary"> 图表 </n-text>
    </n-h5>
    <auto-chart :conditions="currentConditions" :data="data.data" :type="type" />
  </div>
</template>
<script setup lang="ts">
import { useQueryStore } from '@/stores/query'
import { FolderOpenOutline } from '@vicons/ionicons5'
import VCodeBlock from '@wdns/vue-code-block'
import AutoChart from '@/components/auto-chart.vue'
import { useAnalyzeStore } from '@/stores/analyze'

defineOptions({
  name: 'AnalyzeResult'
})

const { data, currentConditions } = useQueryStore()
const { type } = useAnalyzeStore()

const hasResult = computed(() => data.value.sql)
</script>
