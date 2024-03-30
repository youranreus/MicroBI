<template>
  <div class="py-4 px-6 flex flex-col gap-y-4 border-b border-gray-200">
    <analyze-title />
    <div>
      <analyze-condition :type="AnalyzeType.QUOTA"></analyze-condition>
      <analyze-condition :type="AnalyzeType.DIM"></analyze-condition>
      <!-- <analyze-condition :type="AnalyzeType.FILTER"></analyze-condition> -->
    </div>
    <n-flex justify="space-between" align="center">
      <n-flex>
        <n-radio-group :value="type" :on-update:value="changeType" size="medium">
          <n-radio-button
            v-for="option in ChartTypeOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </n-radio-group>
      </n-flex>
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
  <div class="h-[calc(100%-262px)]">
    <analyze-result></analyze-result>
  </div>
</template>
<script setup lang="ts">
import AnalyzeCondition from './analyze-condition.vue'
import AnalyzeResult from './analyze-result.vue'
import AnalyzeTitle from './analyze-title.vue'
import { useQueryChart } from '@/composables/useQueryChart'
import { useAnalyzeStore } from '@/stores/analyze'
import { AnalyzeType } from '@/types/field'
import { ChartTypeOptions } from '@/utils/constants'

const { canQuery, loading, query } = useQueryChart()
const { type, changeType } = useAnalyzeStore()
</script>
