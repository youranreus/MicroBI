<template>
  <n-layout>
    <n-layout-header>
      <base-layout-header />
    </n-layout-header>
    <n-layout-content content-style="padding: 16px;">
      <slot />
    </n-layout-content>
    <n-layout-footer>
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
