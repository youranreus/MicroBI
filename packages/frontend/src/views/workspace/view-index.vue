<template>
  <div
    class="bg-white shadow-xl rounded-2xl p-4 h-[500px] w-[968px] border-2 border-gray-100 flex gap-x-8"
  >
    <div class="w-[300px]">
      <div class="flex flex-col gap-y-4">
        <div class="h-[100px] flex flex-col gap-y-2">
          <n-h3>创建一个工作区</n-h3>
          <n-input-group>
            <n-input placeholder="workspace名称" />
            <n-button type="primary" ghost> 创建 </n-button>
          </n-input-group>
        </div>
        <div class="h-[352px]">
          <n-h3>加入一个工作区</n-h3>
          <workspace-list @select="handleSelectWorkspace" />
          <workspace-detail-dialog v-if="detailItem" v-model="detailVisible" :data="detailItem" />
        </div>
      </div>
    </div>
    <div class="flex-1">
      <n-h3>已加入的工作区</n-h3>
      <workspace-list type="user">
        <template #default="{ data }">
          <n-button size="small" @click="redirectWorkspace(data.id)">进入</n-button>
        </template>
      </workspace-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { WorkspaceMeta } from '@/types/workspace'
import WorkspaceList from './components/workspace-list.vue'
import WorkspaceDetailDialog from './components/workspace-detail-dialog.vue'

defineOptions({
  name: 'WorkspaceIndex'
})

const detailVisible = ref(false)
const detailItem = ref<WorkspaceMeta>()

const handleSelectWorkspace = (item: WorkspaceMeta) => {
  detailItem.value = item
  detailVisible.value = true
}

const redirectWorkspace = (id: number) => {
  console.log('🤔 id 是 ', id)
}
</script>
