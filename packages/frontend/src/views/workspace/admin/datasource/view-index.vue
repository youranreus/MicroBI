<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">已创建数据源</div>

    <n-button type="info" secondary @click="createDatasource">创建</n-button>
  </div>
  <datasource-list>
    <template #default="{ data, func }">
      <n-button-group size="small">
        <n-button secondary @click="editDatasource(data)">
          <template #icon>
            <n-icon :component="Options"></n-icon>
          </template>
        </n-button>
        <n-button secondary type="error" @click="del(data, func.refresh)">
          <template #icon>
            <n-icon :component="TrashOutline"></n-icon>
          </template>
        </n-button>
      </n-button-group>
    </template>
  </datasource-list>
</template>
<script setup lang="ts">
import type { DatasourceMeta } from '@/types/datasource'
import DatasourceList from '@/views/workspace/components/datasource-list.vue'
import { useDeleteDatasource } from '@/composables/useDeleteDatasource'
import { Options, TrashOutline } from '@vicons/ionicons5'

const router = useRouter()
const { del } = useDeleteDatasource()

const createDatasource = () => {
  router.push({ name: 'datasource-admin-create' })
}

const editDatasource = (data: DatasourceMeta) => {
  router.push({
    name: 'datasource-admin-edit',
    params: {
      sourceId: data.id
    }
  })
}
</script>
