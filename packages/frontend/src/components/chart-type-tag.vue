<template>
  <n-tag :size="size" :type="TYPE_MAP[type]">{{ type }}</n-tag>
</template>
<script setup lang="ts">
import { ChartType } from '@/types/chart'

defineOptions({
  name: 'ChartTypeTag'
})

withDefaults(
  defineProps<{
    type: ChartType
    size?: 'large' | 'medium' | 'small' | 'tiny'
    bordered?: boolean
  }>(),
  {
    size: 'small',
    bordered: false
  }
)

const TYPE_MAP: Record<
  ChartType,
  'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
> = {
  [ChartType.TABLE]: 'success',
  [ChartType.LINE]: 'info',
  [ChartType.BAR]: 'warning'
}
</script>
