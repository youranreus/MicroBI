<template>
  <n-layout has-sider position="absolute" style="top: 0px; bottom: 0px">
    <dnd-provider :backend="HTML5Backend">
      <n-layout-sider bordered>
        <analyze-sidebar></analyze-sidebar>
      </n-layout-sider>
      <n-layout-content>
        <analyze-body></analyze-body>
      </n-layout-content>
    </dnd-provider>
  </n-layout>
</template>
<script setup lang="ts">
import AnalyzeSidebar from './components/analyze-sidebar.vue'
import AnalyzeBody from './components/analyze-body.vue'
import { useGetChart } from '@/composables/useGetChart'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAnalyzeStore } from '@/stores/analyze'
import { AnalyzeType } from '@/types/field'
import { useQueryStore } from '@/stores/query'

defineOptions({
  name: 'AnalyzeEdit'
})
const route = useRoute()
const { changeDataset, setName, changeType, updateField, setId, clear } = useAnalyzeStore()
const { clear: clearQuery } = useQueryStore()
const { metadata, dims, quotas, resData, query } = useGetChart(() => {
  changeDataset(resData.value.data.dataset)
  setName(metadata.value.name)
  changeType(metadata.value.type)
  setId(resData.value.data.id)
  updateField(AnalyzeType.QUOTA, quotas.value)
  updateField(AnalyzeType.DIM, dims.value)
})

const reset = () => {
  clear()
  clearQuery()
}

watch(() => route.name, reset)

onMounted(() => {
  if (route.params.chartId) {
    query(Number(route.params.chartId))
  }
})

onUnmounted(reset)
</script>
