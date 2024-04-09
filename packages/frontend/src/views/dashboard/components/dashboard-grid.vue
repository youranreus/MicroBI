<template>
  <div
    :class="{
      'bg-slate-50': editMode
    }"
  >
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="40"
      :is-draggable="editMode"
      :is-resizable="editMode"
      :vertical-compact="true"
      :use-css-transforms="true"
      :margin="[16, 16]"
    >
      <grid-item
        v-for="item in layout"
        class="touch-none"
        :key="item.i"
        :i="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
      >
        <span class="text">{{ item.i }}</span>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script setup lang="ts">
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
