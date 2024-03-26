<template>
  <div class="pt-4 pb-2 px-6 flex flex-col gap-y-3 border-b border-gray-200">
    <div class="text-lg font-bold">分析条件</div>
    <analyze-condition :type="AnalyzeType.QUOTA"></analyze-condition>
    <analyze-condition :type="AnalyzeType.DIM"></analyze-condition>
    <analyze-condition :type="AnalyzeType.FILTER"></analyze-condition>
  </div>
</template>
<script setup lang="ts">
import AnalyzeCondition from './analyze-condition.vue'
import { AnalyzeType } from '@/types/field'
</script>
