<template>
  <div class="flex justify-between items-center h-12 p-8">
    <div class="flex gap-x-2 items-center">
      <n-spin v-if="loading" size="small" />
      <span class="text-2xl font-bold cursor-pointer" @click="redirectBack">
        {{ loading ? '加载中' : workspace.name || 'MicroBI' }}
      </span>
    </div>
    <n-flex align="center" :wrap="false">
      <n-menu
        :value="currentNav"
        mode="horizontal"
        :options="NAV_ITEMS"
        responsive
        @update:value="handleSelectNav"
      />
      <div v-if="hasLoggedIn">
        <user-meta :data="userData" show-logout />
      </div>
      <dark-mode-btn></dark-mode-btn>
    </n-flex>
  </div>
</template>
<script setup lang="ts">
import UserMeta from '@/components/user-meta.vue'
import DarkModeBtn from '@/components/darkmode-btn.vue'
import { NAV_ITEMS } from '@/utils/constants'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { useWorkspaceStore } from '@/stores/workspace'

defineOptions({
  name: 'BaseLayoutHeader'
})

const { hasLoggedIn, userData } = useUserStore()
const { currentNav } = useMenuStore()
const { data: workspace, loading } = useWorkspaceStore()
const route = useRoute()
const router = useRouter()

const redirectBack = () => {
  if (workspace.value.name) {
    router.push({ name: 'workspace-index' })
  } else {
    router.push('/')
  }
}

const handleSelectNav = (key: string) => {
  if (route.matched.some((r) => r.name === 'workspace-base-layout')) {
    router.push({
      name: key,
      query: route.query,
      params: route.params
    })
  }
}
</script>
