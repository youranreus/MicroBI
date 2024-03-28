<template>
  <n-tag :type="fieldColor" closable size="medium" @close="emit('del')">
    {{ field.name }}
  </n-tag>
</template>
<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyze'
import { AnalyzeType, type Field } from '@/types/field'

defineOptions({
  name: 'ConditionItem'
})

const props = withDefaults(
  defineProps<{
    type?: AnalyzeType
    field: Field
  }>(),
  {
    type: AnalyzeType.QUOTA
  }
)

const emit = defineEmits<{
  (e: 'del'): void
}>()

const { conditions, addFieldTo, updateField } = useAnalyzeStore()

const fieldColor = computed(() => {
  const map: Record<AnalyzeType, 'info' | 'warning' | 'error' | 'default'> = {
    [AnalyzeType.QUOTA]: 'info',
    [AnalyzeType.DIM]: 'warning',
    [AnalyzeType.FILTER]: 'error'
  }

  return map[props.type]
})
</script>
