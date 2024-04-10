<template>
  <div
    ref="containerRef"
    class="w-full h-full overflow-hidden border border-gray-200 p-3 rounded-lg bg-white"
  >
    <div class="header flex justify-between items-center mb-4">
      <n-h6 prefix="bar" align-text class="mb-0">
        {{ chart.name }}
      </n-h6>

      <n-popconfirm
        v-if="editMode"
        positive-text="确定"
        negative-text="取消"
        @positive-click="handleDeleteChart"
      >
        <template #trigger>
          <n-button size="small" circle secondary type="error">
            <template #icon>
              <n-icon :component="TrashOutline"></n-icon>
            </template>
          </n-button>
        </template>
        确定删除图表「{{ chart.name }}」吗
      </n-popconfirm>
    </div>
    <n-spin :show="loading">
      <n-scrollbar
        :style="{
          height: `${chartHeight}px`
        }"
      >
        <auto-chart
          :type="chart.type"
          :data="resData.data"
          :conditions="chartConditions"
          :height="chartHeight"
        ></auto-chart>
      </n-scrollbar>
    </n-spin>
  </div>
</template>
<script setup lang="ts">
import { useQueryChart } from '@/composables/useQueryChart'
import { useDashboardStore } from '@/stores/dashboard'
import { CalcType, SortType, type Condition } from '@/types/chart'
import type { DashboardChartItem } from '@/types/dashboard'
import type { QueryDataParams } from '@/types/dataset'
import { TrashOutline } from '@vicons/ionicons5'

defineOptions({
  name: 'DashboardGridItem'
})

const props = defineProps<{
  data: DashboardChartItem
}>()

const chart = computed(() => props.data.data)

const { editMode, charts, updateCharts } = useDashboardStore()
const { directQuery, loading, resData } = useQueryChart()
const containerRef = ref<HTMLElement>()

const handleDeleteChart = () => {
  const newCharts = charts.value.filter((item) => item.data.id !== chart.value.id)
  updateCharts(newCharts)
}

const chartHeight = ref(0)

const requestParams = computed<QueryDataParams>(() => {
  const quotas: Condition[] = chart.value.quotas.map((item) => ({
    ...item,
    calc: chart.value.addition.quotas.find((q) => q.id === item.id)?.calc || CalcType.COUNT
  }))

  const dims: Condition[] = chart.value.quotas.map((item) => ({
    ...item,
    calc: CalcType.COUNT,
    sort: chart.value.addition.dims.find((q) => q.id === item.id)?.sort || SortType.NONE
  }))

  return {
    filters: [],
    quotas,
    dims
  }
})

const chartConditions = computed(() => {
  const quota: Condition[] = chart.value.quotas.map((item) => ({
    ...item,
    calc: chart.value.addition.quotas.find((q) => q.id === item.id)?.calc || CalcType.COUNT
  }))

  const dim: Condition[] = chart.value.quotas.map((item) => ({
    ...item,
    calc: CalcType.COUNT,
    sort: chart.value.addition.dims.find((q) => q.id === item.id)?.sort || SortType.NONE
  }))

  return {
    filter: [],
    quota,
    dim
  }
})

const observer = new ResizeObserver((entries) => {
  const target = entries[0].target
  chartHeight.value = target.clientHeight - 24 - 26 - 16
})

onMounted(() => {
  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

watch(
  () => chart.value.id,
  (val) => {
    if (!val) return

    directQuery(chart.value.dataset.id, requestParams.value)
  },
  { immediate: true }
)

onUnmounted(() => {
  observer.disconnect()
})
</script>
