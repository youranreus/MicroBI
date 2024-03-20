<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">数据预览</div>

    <n-button type="info" secondary @click="back">返回</n-button>
  </div>

  <n-data-table v-bind="tableBindings" :bordered="true"></n-data-table>
</template>
<script setup lang="ts">
import { usePreviewDataset } from '@/composables/usePreviewDataset'

defineOptions({
  name: 'PreviewData'
})

const router = useRouter()
const route = useRoute()

const { tableBindings } = usePreviewDataset(Number(route.params.setId))

const back = () => {
  router.push({ name: 'dataset-admin-index' })
}
</script>
