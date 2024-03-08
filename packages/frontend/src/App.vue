<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from '@/layout/base-layout.vue'
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <base-layout>
        <RouterView />
      </base-layout>
    </n-message-provider>
  </n-config-provider>
</template>