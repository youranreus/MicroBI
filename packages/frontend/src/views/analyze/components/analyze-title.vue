<template>
  <div v-if="!isEdit" class="flex items-center h-[34px]">
    <div class="text-lg font-bold mr-1">{{ name }}</div>
    <n-button quaternary size="small" circle @click="isEdit = true">
      <template #icon>
        <n-icon :component="Pencil"></n-icon>
      </template>
    </n-button>
  </div>
  <n-input-group v-else>
    <n-input
      v-model:value="tmpValue"
      autosize
      style="min-width: 200px"
      :placeholder="name"
    ></n-input>
    <n-button @click="handleEdit">完成</n-button>
  </n-input-group>
</template>
<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyze'
import { Pencil } from '@vicons/ionicons5'

defineOptions({
  name: 'AnalyzeTitle'
})

const { name, setName } = useAnalyzeStore()
const isEdit = ref(false)
const tmpValue = ref(name.value)

const handleEdit = () => {
  if (tmpValue.value) {
    setName(tmpValue.value)
  } else {
    tmpValue.value = name.value
  }

  isEdit.value = false
}

watch(
  () => name.value,
  (val) => (tmpValue.value = val)
)
</script>
