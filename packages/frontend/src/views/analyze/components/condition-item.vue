<template>
  <n-popselect
    v-if="type === AnalyzeType.QUOTA"
    :value="field.calc"
    :options="FieldCalcOptions[field.type]"
    trigger="click"
    placement="bottom-start"
    :on-update:value="handleChangeCalc"
  >
    <n-tag class="cursor-pointer" :type="fieldColor" closable size="medium" @close="emit('del')">
      {{ `${CalcNameMap[field.calc]} | ${field.name}` }}
    </n-tag>
  </n-popselect>
  <n-tag v-else :type="fieldColor" closable size="medium" @close="emit('del')">
    {{ field.name }}
  </n-tag>
</template>
<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyze'
import type { CalcType, Condition } from '@/types/chart'
import { CalcNameMap, FieldCalcOptions } from '@/utils/constants'
import { AnalyzeType } from '@/types/field'
import { cloneDeep } from 'lodash-es'

defineOptions({
  name: 'ConditionItem'
})

const props = withDefaults(
  defineProps<{
    type?: AnalyzeType
    field: Condition
  }>(),
  {
    type: AnalyzeType.QUOTA
  }
)

const emit = defineEmits<{
  (e: 'del'): void
}>()

const { conditions, updateField } = useAnalyzeStore()

const fields = computed(() => conditions.value[props.type].value)

const fieldColor = computed(() => {
  const map: Record<AnalyzeType, 'info' | 'warning' | 'error' | 'default'> = {
    [AnalyzeType.QUOTA]: 'info',
    [AnalyzeType.DIM]: 'warning',
    [AnalyzeType.FILTER]: 'error'
  }

  return map[props.type]
})

const handleChangeCalc = (val: CalcType) => {
  const newValue = cloneDeep(fields.value)
  const target = newValue.find((f) => f.id === props.field.id)
  if (target) {
    target.calc = val
  }

  updateField(props.type, newValue)
}
</script>
