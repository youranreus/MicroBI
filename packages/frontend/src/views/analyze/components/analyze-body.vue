<template>
  <div class="pt-4 pb-2 px-6 flex flex-col gap-y-3 border-b border-gray-200">
    <div class="text-lg font-bold">分析条件</div>
    <analyze-condition :type="AnalyzeType.QUOTA"></analyze-condition>
    <analyze-condition :type="AnalyzeType.DIM"></analyze-condition>
    <analyze-condition :type="AnalyzeType.FILTER"></analyze-condition>
    <n-flex justify="end">
      <n-button
        :loading="loading"
        :disabled="loading || !canQuery"
        type="primary"
        ghost
        @click="query"
      >
        查询
      </n-button>
    </n-flex>
  </div>
</template>
<script setup lang="ts">
import AnalyzeCondition from './analyze-condition.vue'
import { useQueryChart } from '@/composables/useQueryChart'
import { AnalyzeType } from '@/types/field'

const { canQuery, loading, query } = useQueryChart()
</script>
