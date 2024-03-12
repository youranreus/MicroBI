<template>
  <sidebar-layout>
    <router-view></router-view>
    <template #side>
      <workspace-dynamic-sidebar />
    </template>
  </sidebar-layout>
</template>
<script setup lang="ts">
import SidebarLayout from '@/layout/sidebar-layout.vue'
import WorkspaceDynamicSidebar from './components/workspace-dynamic-sidebar.vue'
defineOptions({
  name: 'WorkspaceLayout'
})
</script>
