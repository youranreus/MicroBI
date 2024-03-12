<template>
  <n-popover trigger="hover" style="padding: 0" :show-arrow="false">
    <template #trigger>
      <n-avatar v-if="!data.avatar" round :size="avatarSize" class="cursor-pointer">
        {{ displayName }}
      </n-avatar>
      <n-avatar
        v-else
        round
        :size="avatarSize"
        class="cursor-pointer"
        :src="data.avatar"
      ></n-avatar>
    </template>
    <div class="h-20 w-full bg-slate-300 flex justify-center items-center">
      <n-avatar v-if="!data.avatar" round size="large">
        {{ displayName }}
      </n-avatar>
      <n-avatar v-else round size="large" :src="data.avatar"></n-avatar>
    </div>
    <div class="px-3 py-2 w-[200px]">
      <n-flex vertical>
        <n-descriptions label-placement="top" :column="1">
          <n-descriptions-item label="用户名">
            {{ data.name }}
          </n-descriptions-item>
          <n-descriptions-item label="邮箱">
            {{ data.email }}
          </n-descriptions-item>
        </n-descriptions>
        <n-button
          v-if="showLogout && isCurrentUser"
          block
          strong
          secondary
          type="warning"
          size="small"
          @click="logout"
        >
          登出
        </n-button>
      </n-flex>
    </div>
  </n-popover>
</template>
<script setup lang="ts">
import type { Size as AvatarSize } from 'naive-ui/es/avatar/src/interface'
import type { UserData } from '@/types/user'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'UserMeta'
})

const props = withDefaults(
  defineProps<{
    avatarSize?: AvatarSize
    data: UserData
    showLogout?: boolean
  }>(),
  {
    showLogout: false,
    avatarSize: 'medium'
  }
)

const { userData, userLogout } = useUserStore()
const router = useRouter()

const displayName = computed(() => props.data.name.slice(0, 3))

const isCurrentUser = computed(() => userData.value.id === props.data.id)

const logout = () => {
  userLogout()
  router.push({ name: 'user-login' })
}
</script>
