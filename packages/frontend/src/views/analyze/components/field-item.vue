<template>
  <div class="py-2 text-center rounded bg-slate-100 cursor-grab select-none">
    {{ field.name }}
  </div>
</template>
<script setup lang="ts">
import type { Field } from '@/types/field'

defineOptions({
  name: 'FieldItem'
})

defineProps<{
  field: Field
}>()
</script>
