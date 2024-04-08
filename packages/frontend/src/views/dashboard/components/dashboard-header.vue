<template>
  <n-thing>
    <template #header>
      <n-popover trigger="hover" placement="bottom-start">
        <template #trigger>
          <span class="text-2xl">{{ metadata.name }}</span>
        </template>
        <n-descriptions :columns="1">
          <n-descriptions-item label="创建于">
            {{ dayjs(metadata.created_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="编辑于">
            {{ dayjs(metadata.updated_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="创建者">
            <user-meta :data="metadata.creator"></user-meta>
          </n-descriptions-item>
        </n-descriptions>
      </n-popover>
    </template>
    <template #header-extra>
      <n-flex>
        <n-button secondary circle>
          <template #icon>
            <n-icon :component="PencilOutline"></n-icon>
          </template>
        </n-button>
        <n-button secondary circle type="error">
          <template #icon>
            <n-icon :component="TrashOutline"></n-icon>
          </template>
        </n-button>
      </n-flex>
    </template>
  </n-thing>
</template>
<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { PencilOutline, TrashOutline } from '@vicons/ionicons5'
import dayjs from 'dayjs'

defineOptions({
  name: 'DashboardHeader'
})

const { metadata } = useDashboardStore()
</script>
