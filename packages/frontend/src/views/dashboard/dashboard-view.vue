<template>
  <div class="p-8">
    <dashboard-header></dashboard-header>
  </div>
</template>
<script setup lang="ts">
import DashboardHeader from './components/dashboard-header.vue'
import { useGetDashboard } from '@/composables/useGetDashboard'
import { useDashboardStore } from '@/stores/dashboard'

defineOptions({
  name: 'DashboardView'
})

const route = useRoute()

const { initDashbaord } = useDashboardStore()
const { resData, query } = useGetDashboard(() => {
  initDashbaord(resData.value.data)
})

onMounted(() => {
  if (route.params.pid) {
    query(Number(route.params.pid))
  }
})
</script>
