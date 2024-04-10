<template>
  <div
    :class="{
      'bg-slate-50': editMode
    }"
  >
    <grid-layout
      :layout="layout"
      :col-num="6"
      :margin="[16, 16]"
      :row-height="200"
      :is-draggable="editMode"
      :is-resizable="editMode"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in charts"
        class="touch-none"
        :key="item.data.id"
        :i="`${item.data.id}`"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
      >
        <dashboard-grid-item :data="item" />
      </grid-item>
    </grid-layout>
  </div>
</template>
<script setup>
import DashboardGridItem from './dashboard-grid-item.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'

defineOptions({
  name: 'DashboardGrid'
})

const { charts, editMode } = useDashboardStore()

const layout = computed(() =>
  charts.value.map((item) => ({
    i: `${item.data.id}`,
    x: item.x,
    y: item.y,
    h: item.h,
    w: item.w
  }))
)
</script>
