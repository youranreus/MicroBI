<template>
  <n-layout class="h-screen">
    <n-layout-header bordered>
      <base-layout-header />
    </n-layout-header>
    <n-layout-content position="absolute" style="top: 65px; bottom: 65px">
      <slot />
    </n-layout-content>
    <n-layout-footer position="absolute" style="bottom: 0" bordered>
      <div class="h-16 text-center leading-[64px] opacity-80 text-base">
        MicroBI@2024 | Made with love by Youranreus
      </div>
    </n-layout-footer>
  </n-layout>
</template>
<script setup lang="ts">
import BaseLayoutHeader from './base-layout-header.vue'

defineOptions({
  name: 'BaseLayout'
})
</script>
