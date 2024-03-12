<template>
  <div class="w-[768px] mx-auto my-5">
    <n-spin :show="loading">
      <div class="flex h-[128px] p-5 gap-x-3">
        <n-avatar v-if="!data.logo" :size="88">{{ data.name.slice(0, 3) }}</n-avatar>
        <n-avatar v-else :size="88" :src="data.logo || ''"></n-avatar>
        <div class="flex flex-col justify-between">
          <div class="text-lg font-medium">{{ data.name }}</div>

          <div>
            <div>创建于: {{ dayjs(data.created_at).fromNow() }}</div>
            <div>修改于: {{ dayjs(data.updated_at).fromNow() }}</div>
          </div>
        </div>
        <div class="flex flex-1 justify-end items-end">
          <user-list :users="data.users"></user-list>
        </div>
      </div>
    </n-spin>
    <div class="mx-5 mb-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWorkspaceStore } from '@/stores/workspace'
import UserList from '@/components/user-list.vue'
import dayjs from 'dayjs'

defineOptions({
  name: 'WorkspaceAdminLayout'
})

const { data, loading } = useWorkspaceStore()
</script>
