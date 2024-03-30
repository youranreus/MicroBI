<template>
  <div class="text-lg font-bold flex items-center">
    {{ name }}
  </div>
</template>
<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyze'

defineOptions({
  name: 'AnalyzeTitle'
})

const { name } = useAnalyzeStore()
</script>
