<template>
  <n-modal v-model:show="visible">
    <n-card
      class="w-[500px]"
      :title="data.name"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      content-style="padding: 16px 20px;"
      header-style="padding: 16px 20px 0;"
    >
      <template v-if="data.logo" #cover>
        <img :src="data.logo" />
      </template>
      <template #header-extra>
        <n-tag type="info" :bordered="false" size="small">#{{ data.id }}</n-tag>
      </template>
      <n-spin :show="loading">
        <n-descriptions label-placement="top" :column="2">
          <n-descriptions-item label="创建于">
            {{ dayjs(data.created_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="更新于">
            {{ dayjs(data.updated_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="用户列表" :span="2">
            <user-list
              v-if="userListRes?.data && userListRes?.data?.length"
              :users="userListRes?.data"
            ></user-list>
            <n-p v-else>无用户</n-p>
          </n-descriptions-item>
        </n-descriptions>
      </n-spin>

      <template v-if="showAction" #action>
        <n-flex justify="end">
          <n-button :disabled="hasJoined" type="info" secondary @click="enter">{{
            hasJoined ? '已加入' : '加入'
          }}</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import type { WorkspaceMeta } from '@/types/workspace'
import UserList from '@/components/user-list.vue'
import { getWorkspaceUsers } from '@/api/workspace'
import { useUserStore } from '@/stores/user'
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

const msg = useMessage()
const { userData } = useUserStore()
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
  msg.error('获取用户列表失败')
})

const hasJoined = computed(() => userListRes.value?.data.some((u) => u.id === userData.value.id))

const enter = () => {
  msg.info('如果需要加入，请联系上述用户添加噢')
}
</script>
