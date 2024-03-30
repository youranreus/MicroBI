<template>
  <n-button quaternary circle @click="toggleDarkMode()">
    <template #icon>
      <n-icon :component="icon"></n-icon>
    </template>
  </n-button>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'

defineOptions({
  name: 'DarkModeBtn'
})

const { isDarkMode, toggleDarkMode } = useGlobalStore()

const icon = computed(() => (isDarkMode.value ? MoonOutline : SunnyOutline))
</script>
