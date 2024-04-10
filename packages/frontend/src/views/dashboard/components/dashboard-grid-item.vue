<template>
  <div class="w-full h-full overflow-hidden border border-gray-200 p-3 rounded-lg bg-white">
    <div class="header flex justify-between items-center">
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
  </div>
</template>
<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import type { DashboardChartItem } from '@/types/dashboard'
import { TrashOutline } from '@vicons/ionicons5'

defineOptions({
  name: 'DashboardGridItem'
})

const props = defineProps<{
  data: DashboardChartItem
}>()

const chart = computed(() => props.data.data)

const { editMode, charts, updateCharts } = useDashboardStore()

const handleDeleteChart = () => {
  const newCharts = charts.value.filter((item) => item.data.id !== chart.value.id)
  updateCharts(newCharts)
}
</script>
