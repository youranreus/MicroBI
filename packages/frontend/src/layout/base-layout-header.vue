<template>
  <div class="flex justify-between items-center border-b-2 border-gray-100 h-12 p-8">
    <div class="text-2xl font-bold">MicroBI</div>
    <n-flex align="center" :wrap="false">
      <n-menu mode="horizontal" :options="userMenuOptions" responsive />
    </n-flex>
  </div>
</template>
<script setup lang="ts">
import { type MenuOption } from 'naive-ui'

defineOptions({
  name: 'BaseLayoutHeader'
})

const userMenuOptions: MenuOption[] = [
  {
    label: '看板',
    key: 'board'
  },
  {
    label: '分析',
    key: 'analyze'
  },
  {
    label: '管理',
    key: 'config'
  }
]
</script>
