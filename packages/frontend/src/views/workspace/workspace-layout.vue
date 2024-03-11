<template>
  <SidebarLayout>
    <router-view></router-view>
  </SidebarLayout>
</template>
<script setup lang="ts">
import SidebarLayout from '@/layout/sidebar-layout.vue'
defineOptions({
  name: 'WorkspaceLayout'
})
</script>
