<template>
  <n-popover placement="right-start">
    <template #trigger>
      <div
        :ref="drag"
        class="py-2 px-3 rounded-lg flex cursor-grab select-none text-xs items-center gap-x-2"
        :style="{
          background: themeVars.codeColor
        }"
      >
        <n-icon :component="FieldIconMap[field.type]"></n-icon>
        <span class="text-ellipsis text-nowrap overflow-hidden">{{ field.name }}</span>
      </div>
    </template>

    <div class="w-[200px]">
      <n-descriptions :columns="2" size="small">
        <n-descriptions-item label="字段名">
          {{ field.fieldname }}
        </n-descriptions-item>
        <n-descriptions-item label="展示名">
          {{ field.name }}
        </n-descriptions-item>
        <n-descriptions-item label="ID">
          {{ field.id }}
        </n-descriptions-item>
        <n-descriptions-item label="类型">
          {{ field.type }}
        </n-descriptions-item>
      </n-descriptions>
    </div>
  </n-popover>
</template>
<script setup lang="ts">
import type { Field } from '@/types/field'
import { FieldIconMap } from '@/utils/constants'
import { useThemeVars } from 'naive-ui'
import { useDrag } from 'vue3-dnd'

defineOptions({
  name: 'FieldItem'
})

const props = defineProps<{
  field: Field
}>()

const themeVars = useThemeVars()

const [, drag] = useDrag(() => ({
  type: 'field',
  item: () => {
    return props.field
  },
  collect(monitor) {
    return {
      isDragging: monitor.isDragging()
    }
  }
}))
</script>
