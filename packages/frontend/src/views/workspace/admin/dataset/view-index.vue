<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">已创建数据集</div>

    <n-button type="info" secondary @click="createDataset">创建</n-button>
  </div>
  <dataset-list>
    <template #default="{ data }">
      <n-button-group size="small">
        <n-button secondary @click="editDataset(data)">
          <template #icon>
            <n-icon :component="Options"></n-icon>
          </template>
        </n-button>
        <n-button secondary type="error">
          <template #icon>
            <n-icon :component="TrashOutline"></n-icon>
          </template>
        </n-button>
      </n-button-group>
    </template>
  </dataset-list>
</template>
<script setup lang="ts">
import type { DatasetMeta } from '@/types/dataset'
import DatasetList from '@/views/workspace/components/dataset-list.vue'
import { Options, TrashOutline } from '@vicons/ionicons5'

const router = useRouter()

const createDataset = () => {
  router.push({ name: 'dataset-admin-create' })
}

const editDataset = (data: DatasetMeta) => {
  router.push({
    name: 'dataset-admin-edit',
    params: {
      setId: data.id
    },
    query: {
      name: data.name
    }
  })
}
</script>
