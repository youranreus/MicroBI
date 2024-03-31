<template>
  <n-popselect
    :value="field.calc"
    :options="popupOptions"
    trigger="click"
    placement="bottom-start"
    :on-update:value="handleChangeCalc"
  >
    <n-tag
      class="cursor-pointer"
      :type="fieldColor"
      :bordered="false"
      closable
      size="medium"
      @close="emit('del')"
    >
      {{ `${prefix} | ${field.name}` }}
      <template #icon>
        <n-icon :component="FieldIconMap[field.type]" size="small"></n-icon>
      </template>
    </n-tag>
  </n-popselect>
</template>
<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyze'
import type { CalcType, Condition } from '@/types/chart'
import {
  CalcNameMap,
  FieldCalcOptions,
  FieldIconMap,
  FieldSortOptions,
  SortNameMap
} from '@/utils/constants'
import { AnalyzeType } from '@/types/field'
import { cloneDeep } from 'lodash-es'
import type { SortType } from '@/types/chart'

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

const handleChangeCalc = (val: CalcType | SortType) => {
  const newValue = cloneDeep(fields.value)
  const target = newValue.find((f) => f.id === props.field.id)
  if (target) {
    if (props.type === AnalyzeType.DIM) {
      target.sort = val as SortType
    } else {
      target.calc = val as CalcType
    }
  }

  updateField(props.type, newValue)
}

const popupOptions = computed(() => {
  if (props.type === AnalyzeType.QUOTA) {
    return FieldCalcOptions[props.field.type]
  }

  return FieldSortOptions
})

const prefix = computed(() => {
  if (props.type === AnalyzeType.QUOTA) {
    return CalcNameMap[props.field.calc]
  }

  return props.field.sort ? SortNameMap[props.field.sort] : ''
})
</script>
