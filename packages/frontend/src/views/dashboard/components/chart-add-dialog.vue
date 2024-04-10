<template>
  <n-button secondary round :loading="loading" @click="visible = true">
    <template #icon>
      <n-icon :component="PieChartOutline"></n-icon>
    </template>
    添加图表
  </n-button>
  <n-modal v-model:show="visible">
    <n-card class="w-[768px]" title="添加图表" :bordered="false" role="dialog" aria-modal="true">
      <n-list>
        <n-spin :show="loadingChart">
          <template v-if="data.length">
            <n-list-item v-for="item in data" :key="item.id">
              <template #prefix>
                <chart-type-tag :type="item.type"></chart-type-tag>
              </template>
              <template #suffix>
                <n-button
                  size="small"
                  tertiary
                  type="info"
                  :loading="loadingDetail"
                  :disabled="isChartAdded(item.id)"
                  @click="addChart(item)"
                >
                  添加
                </n-button>
              </template>
              {{ item.name }}
            </n-list-item>
          </template>
          <template v-else>
            <n-empty class="mt-6 mb-4" description="没有找到图表"></n-empty>
          </template>
        </n-spin>

        <template #footer>
          <div class="flex justify-end">
            <n-pagination v-bind="pageBindings"></n-pagination>
          </div>
        </template>
        <template #header>
          <n-input-group>
            <n-input v-bind="searchBindings" placeholder="按名称搜索" />
          </n-input-group>
        </template>
      </n-list>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { useChartList } from '@/composables/useChartList'
import { useGetChart } from '@/composables/useGetChart'
import { useDashboardStore } from '@/stores/dashboard'
import type { ChartMeta } from '@/types/chart'
import { PieChartOutline } from '@vicons/ionicons5'
import { isNil } from 'lodash-es'

defineOptions({
  name: 'ChartAddDialog'
})

withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false
  }
)

const visible = ref(false)
const msg = useMessage()
const { pageBindings, searchBindings, loading: loadingChart, data } = useChartList()
const { charts, updateCharts } = useDashboardStore()
const {
  resData,
  query,
  loading: loadingDetail
} = useGetChart(() => {
  const newData = resData.value.data
  if (isNil(newData)) {
    msg.error('获取信息失败')
    visible.value = false
    return
  }
  const maxY = charts.value.reduce((p, c) => (c.y + c.h > p ? c.y : p), 0)
  const newChart = {
    chart: newData.id,
    data: newData,
    x: 0,
    y: maxY + 1,
    w: 3,
    h: 1
  }
  updateCharts([...charts.value, newChart])
  // console.log('🤔 charts 是 ', charts)
  msg.success('添加成功')
  visible.value = false
})

const isChartAdded = (id: number) => charts.value.some((c) => c.data.id === id)

const addChart = (data: ChartMeta) => {
  // console.log('🤔 charts 是 ', charts)
  query(data.id)
}
</script>
