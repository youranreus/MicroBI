<template>
  <div :ref="Drop" class="min-h-7 flex items-center gap-x-4">
    <span class="font-bold">{{ displayType }}</span>
    <div class="flex-1 flex gap-x-2">
      <span v-if="!fields.length && !isActive">暂无字段</span>
      <template v-else>
        <condition-item
          v-for="field in fields"
          :key="field.id"
          :field="field"
          :type="type"
          @del="handleDelField(field)"
        ></condition-item>
      </template>
      <n-tag v-if="isActive" size="medium">
        添加「 {{ collect.item.name }} 」至{{ displayType }}
      </n-tag>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyze'
import { AnalyzeType, type Field } from '@/types/field'
import ConditionItem from './condition-item.vue'
import { useDrop } from 'vue3-dnd'

defineOptions({
  name: 'AnalyzeCondition'
})

const props = withDefaults(
  defineProps<{
    type?: AnalyzeType
  }>(),
  {
    type: AnalyzeType.QUOTA
  }
)

const { conditions, addFieldTo, updateField } = useAnalyzeStore()

const msg = useMessage()

const fields = computed(() => conditions.value[props.type].value)

const displayType = computed(() => {
  const map: Record<AnalyzeType, string> = {
    [AnalyzeType.QUOTA]: '指标',
    [AnalyzeType.DIM]: '维度',
    [AnalyzeType.FILTER]: '过滤'
  }

  return map[props.type]
})

const handleDrop = (item: Field) => {
  const allFields = [
    ...conditions.value[AnalyzeType.QUOTA].value,
    ...conditions.value[AnalyzeType.DIM].value,
    ...conditions.value[AnalyzeType.FILTER].value
  ]
  if (allFields.some((f) => f.id === item.id)) {
    msg.warning('字段重复')
    return
  }
  addFieldTo(props.type, item)
}

const handleDelField = (item: Field) => {
  const newList = fields.value.filter((f) => f.id !== item.id)
  updateField(props.type, newList)
}

const [collect, Drop] = useDrop(() => ({
  accept: 'field',
  drop: handleDrop,
  collect(monitor) {
    return {
      isOver: monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop()
    }
  }
}))

const isActive = computed(() => collect.value.isOver && collect.value.canDrop)
</script>
