<template>
  <n-layout has-sider position="absolute" style="top: 0px; bottom: 0px">
    <n-layout-sider bordered>
      <analyze-sidebar></analyze-sidebar>
    </n-layout-sider>
    <n-layout-content>
      <div>aaa</div>
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import AnalyzeSidebar from './components/analyze-sidebar.vue'

defineOptions({
  name: 'AnalyzeEdit'
})
</script>
