<script setup lang="ts">
import BaseLayout from '@/layout/base-layout.vue'
</script>

<template>
  <n-config-provider>
    <n-modal-provider>
      <n-message-provider>
        <base-layout>
          <RouterView />
        </base-layout>
      </n-message-provider>
    </n-modal-provider>
  </n-config-provider>
</template>
