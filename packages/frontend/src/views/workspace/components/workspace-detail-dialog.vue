<template>
  <n-modal v-model:show="visible">
    <n-card
      class="w-[500px]"
      :title="data.name"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template v-if="data.logo" #cover>
        <img :src="data.logo" />
      </template>
      <template #header-extra> #{{ data.id }} </template>
      <n-spin :show="loading">
        <n-descriptions label-placement="top" :column="2">
          <n-descriptions-item label="创建于">
            {{ dayjs(data.created_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="更新于">
            {{ dayjs(data.updated_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="用户列表" :span="2">
            <n-avatar-group :options="userList" :size="40" :max="3">
              <template #avatar="{ option: { name, src } }">
                <n-tooltip>
                  <template #trigger>
                    <n-avatar :src="src">{{ name.slice(0, 2) }}</n-avatar>
                  </template>
                  {{ name }}
                </n-tooltip>
              </template>
              <template #rest="{ options: rest }">
                <n-avatar>+{{ rest }}</n-avatar>
              </template>
            </n-avatar-group>
          </n-descriptions-item>
        </n-descriptions>
      </n-spin>

      <template v-if="showAction" #action> 如果需要加入，请联系上述用户添加噢 </template>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import type { WorkspaceMeta } from '@/types/workspace'
import { getWorkspaceUsers } from '@/api/workspace'
import { useWatcher } from 'alova'
import dayjs from 'dayjs'

defineOptions({
  name: 'WorkspaceDetailDialog'
})

const props = withDefaults(
  defineProps<{
    data: WorkspaceMeta
    showAction?: boolean
  }>(),
  {
    showAction: true
  }
)

const visible = defineModel({ type: Boolean })

const {
  data: userListRes,
  loading,
  onError
} = useWatcher(() => getWorkspaceUsers(props.data.id), [() => props.data.id], {
  immediate: true
})

onError(() => {
  userListRes.value = {
    code: 0,
    msg: '',
    data: []
  }
})

const userList = computed(() =>
  userListRes.value ? userListRes.value.data.map((u) => ({ name: u.name, src: u.avatar })) : []
)
</script>
