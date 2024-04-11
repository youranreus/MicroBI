<template>
  <div class="dashboard-grid">
    <grid-layout
      v-model:layout="layout"
      :col-num="6"
      :margin="[16, 16]"
      :row-height="400"
      :is-draggable="editMode"
      :is-resizable="editMode"
      :vertical-compact="true"
      :use-css-transforms="true"
      :restore-on-drag="true"
    >
      <grid-item
        v-for="item in charts"
        class="touch-none custom-grid-item"
        :key="item.data.id"
        :i="`${item.data.id}`"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :static="false"
        :is-draggable="editMode"
        :is-resizable="editMode"
        @resize="handleResized"
      >
        <dashboard-grid-item :data="item" />
      </grid-item>
    </grid-layout>

    <div v-if="!charts.length" class="h-[500px] w-full flex items-center justify-center">
      <n-empty size="large" description="还没有图表">
        <template v-if="editMode" #extra>
          <chart-add-dialog />
        </template>
      </n-empty>
    </div>
  </div>
</template>
<script setup lang="ts">
import DashboardGridItem from './dashboard-grid-item.vue'
import ChartAddDialog from './chart-add-dialog.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import type { Layout } from '@/types/dashboard'

defineOptions({
  name: 'DashboardGrid'
})

const { charts, editMode, updateCharts } = useDashboardStore()

const handleResized = (i: string | number, newH: number, newW: number) => {
  const newCharts = charts.value.map((item) => {
    if (String(i) !== String(item.data.id)) return item

    return {
      ...item,
      h: newH,
      w: newW
    }
  })

  updateCharts(newCharts)
}

const updateLayout = (val: Layout) => {
  const newCharts = charts.value.map((item) => {
    const newPosition = val.find((v) => v.i === `${item.data.id}`)
    if (!newPosition) return item

    return {
      ...item,
      x: newPosition.x,
      y: newPosition.y,
      h: newPosition.h,
      w: newPosition.w
    }
  })

  updateCharts(newCharts)
}

const layout = computed({
  get: () =>
    charts.value.map((item) => ({
      i: `${item.data.id}`,
      x: item.x,
      y: item.y,
      h: item.h,
      w: item.w,
      static: false
    })),
  set: updateLayout
})
</script>
<style lang="scss" scoped>
.dashboard-grid {
  :deep(.vue-grid-item.vue-grid-placeholder) {
    @apply rounded-lg;
  }
}
</style>
