<template>
  <div :ref="drag" class="py-2 text-center rounded bg-slate-100 cursor-grab select-none">
    {{ field.name }}
  </div>
</template>
<script setup lang="ts">
import type { Field } from '@/types/field'
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
