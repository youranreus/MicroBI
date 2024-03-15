<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">已创建数据源</div>

    <n-button type="info" secondary @click="createDatasource">创建</n-button>
  </div>
  <datasource-list>
    <template #default="{ data }">
      <n-flex>
        <n-button @click="editDatasource(data)">编辑</n-button>
      </n-flex>
    </template>
  </datasource-list>
</template>
<script setup lang="ts">
import type { DatasourceMeta } from '@/types/datasource'
import DatasourceList from '@/views/workspace/components/datasource-list.vue'

const router = useRouter()

const createDatasource = () => {
  router.push({ name: 'datasource-admin-create' })
}

const editDatasource = (data: DatasourceMeta) => {
  router.push({
    name: 'datasource-admin-edit',
    params: {
      sourceId: data.id
    },
    query: {
      name: data.name
    }
  })
}
</script>
