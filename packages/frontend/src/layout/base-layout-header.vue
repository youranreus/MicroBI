<template>
  <div class="flex justify-between items-center border-b-2 border-gray-100 h-12 p-8">
    <div class="text-2xl font-bold cursor-pointer" @click="redirectHome">MicroBI</div>
    <n-flex align="center" :wrap="false">
      <n-menu mode="horizontal" :options="userMenuOptions" responsive />
      <div v-if="hasLoggedIn">
        <user-meta :data="userData" show-logout />
      </div>
    </n-flex>
  </div>
</template>
<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import UserMeta from '@/components/user-meta.vue'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'BaseLayoutHeader'
})

const { hasLoggedIn, userData } = useUserStore()
const router = useRouter()

const userMenuOptions: MenuOption[] = [
  {
    label: '看板',
    key: 'board'
  },
  {
    label: '分析',
    key: 'analyze'
  },
  {
    label: '管理',
    key: 'config'
  }
]

const redirectHome = () => {
  router.push('/')
}
</script>
