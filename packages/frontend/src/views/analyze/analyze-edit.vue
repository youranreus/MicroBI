<template>
  <n-layout has-sider position="absolute" style="top: 0px; bottom: 0px">
    <dnd-provider :backend="HTML5Backend">
      <n-layout-sider bordered>
        <analyze-sidebar></analyze-sidebar>
      </n-layout-sider>
      <n-layout-content>
        <analyze-body></analyze-body>
      </n-layout-content>
    </dnd-provider>
  </n-layout>
</template>
<script setup lang="ts">
import AnalyzeSidebar from './components/analyze-sidebar.vue'
import AnalyzeBody from './components/analyze-body.vue'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

defineOptions({
  name: 'AnalyzeEdit'
})
</script>
