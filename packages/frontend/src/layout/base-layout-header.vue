<template>
  <div class="flex justify-between items-center h-12 p-8">
    <div class="text-2xl font-bold cursor-pointer" @click="redirectHome">MicroBI</div>
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
    </n-flex>
  </div>
</template>
<script setup lang="ts">
import UserMeta from '@/components/user-meta.vue'
import { NAV_ITEMS } from '@/utils/constants'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'

defineOptions({
  name: 'BaseLayoutHeader'
})

const { hasLoggedIn, userData } = useUserStore()
const { currentNav } = useMenuStore()
const router = useRouter()

const redirectHome = () => {
  router.push('/')
}

const handleSelectNav = (key: string) => {
  router.push({ name: key })
}
</script>
