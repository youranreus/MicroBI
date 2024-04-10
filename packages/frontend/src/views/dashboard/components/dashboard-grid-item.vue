<template>
  <div class="w-full h-full overflow-hidden border border-gray-200">
    <div class="header">
      {{ chart.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DashboardChartItem } from '@/types/dashboard'

defineOptions({
  name: 'DashboardGridItem'
})

const props = defineProps<{
  data: DashboardChartItem
}>()

const chart = computed(() => props.data.data)
</script>
