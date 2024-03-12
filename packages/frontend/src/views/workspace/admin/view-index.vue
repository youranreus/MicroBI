<template>
  <div class="w-[768px] mx-auto my-5">
    <n-spin :show="loading">
      <div class="flex h-[128px] p-5 gap-x-3">
        <n-avatar :size="88" :src="data.logo || ''">{{ data.name.slice(0, 3) }}</n-avatar>
        <div class="flex flex-col justify-between">
          <div class="text-lg font-medium">{{ data.name }}</div>

          <div>
            <div>创建于: {{ dayjs(data.created_at).fromNow() }}</div>
            <div>最后修改于: {{ dayjs(data.updated_at).fromNow() }}</div>
          </div>
        </div>
      </div>
    </n-spin>
    <div class="mx-5 my-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWorkspaceStore } from '@/stores/workspace'
import dayjs from 'dayjs'

defineOptions({
  name: 'WorkspaceAdminLayout'
})

const { data, loading } = useWorkspaceStore()
</script>
