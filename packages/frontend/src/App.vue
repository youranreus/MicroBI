<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>