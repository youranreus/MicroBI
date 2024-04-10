<template>
  <n-spin :show="loading">
    <div class="p-8 h-full">
      <dashboard-header></dashboard-header>
      <dashboard-grid></dashboard-grid>
    </div>
  </n-spin>
</template>
<script setup lang="ts">
import DashboardHeader from './components/dashboard-header.vue'
import DashboardGrid from './components/dashboard-grid.vue'
import { useGetDashboard } from '@/composables/useGetDashboard'
import { useDashboardStore } from '@/stores/dashboard'

defineOptions({
  name: 'DashboardView'
})

const route = useRoute()

const { initDashbaord, reset, toggleEditMode } = useDashboardStore()
const { resData, query, loading } = useGetDashboard(() => {
  initDashbaord(resData.value.data)
})

onMounted(() => {
  if (route.params.pid) {
    query(Number(route.params.pid))
  } else {
    reset()
  }
})

onUnmounted(() => {
  reset()
  toggleEditMode(false)
})
</script>
