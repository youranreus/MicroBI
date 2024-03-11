<template>
  <n-layout class="h-full w-full" has-sider>
    <n-layout-sider :native-scrollbar="false" bordered>
      <slot name="side" />
    </n-layout-sider>
    <n-layout :native-scrollbar="false">
      <slot />
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
defineOptions({
  name: 'SidebarLayout'
})
</script>
