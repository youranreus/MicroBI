<script setup lang="ts">
import BaseLayout from '@/layout/base-layout.vue'
import { theme_overrides } from './utils/constants'
import { useGlobalStore } from '@/stores/global'

const { currentTheme } = useGlobalStore()
</script>

<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="theme_overrides">
    <n-modal-provider>
      <n-dialog-provider>
        <n-message-provider>
          <base-layout>
            <RouterView />
          </base-layout>
        </n-message-provider>
      </n-dialog-provider>
    </n-modal-provider>
  </n-config-provider>
</template>
