<template>
  <div
    :ref="drag"
    class="py-2 px-3 rounded-lg bg-gray-100 flex cursor-grab select-none text-xs items-center gap-x-2"
  >
    <n-icon :component="FieldIconMap[field.type]"></n-icon>
    <span class="text-ellipsis text-nowrap overflow-hidden">{{ field.name }}</span>
  </div>
</template>
<script setup lang="ts">
import type { Field } from '@/types/field'
import { FieldIconMap } from '@/utils/constants'
import { useDrag } from 'vue3-dnd'

defineOptions({
  name: 'FieldItem'
})

const props = defineProps<{
  field: Field
}>()

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
