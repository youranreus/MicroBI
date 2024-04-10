<template>
  <div :style="containerStyle">
    <n-data-table
      v-if="type === ChartType.TABLE"
      :columns="tableColumns"
      :data="data"
      bordered
      striped
      :max-height="height > 49 ? height - 49 : 49"
    />
    <v-chart v-else class="h-full w-full" :option="chartOptions" autoresize></v-chart>
  </div>
</template>
<script setup lang="ts">
import { ChartType, type Condition } from '@/types/chart'
import type { AnalyzeType } from '@/types/field'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, BarChart, TooltipComponent, LegendComponent, GridComponent])

defineOptions({
  name: 'AutoChart'
})

const props = withDefaults(
  defineProps<{
    type: ChartType
    data: Record<string, any>[]
    conditions: Record<AnalyzeType, Condition[]>
    height?: number
  }>(),
  {
    height: 500
  }
)

const containerStyle = computed(() => ({
  height: `${props.height}px`
}))

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

const dimNameArr = computed(() => props.conditions.dim.map((field) => field.name))
const quotaNameArr = computed(() => props.conditions.quota.map((field) => field.name))

const legends = computed(() => {
  return props.data.map((row) => dimNameArr.value.map((dim) => row[dim]).join('-'))
})

const series = computed(() => {
  return quotaNameArr.value.map((name) => {
    const serieData = props.data.map((row) => ({
      name: dimNameArr.value.map((dim) => row[dim]).join('-'),
      value: row[name]
    }))

    return {
      name,
      type: props.type,
      data: serieData,
      smooth: true
    }
  })
})

const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom',
    data: quotaNameArr.value
  },
  xAxis: {
    type: 'category',
    data: legends.value
  },
  yAxis: {
    type: 'value',
    boundaryGap: ['0%', '10%']
  },
  // axisPointer: {
  //   type: 'shadow',
  //   show: true
  // },
  series: series.value
}))
</script>
