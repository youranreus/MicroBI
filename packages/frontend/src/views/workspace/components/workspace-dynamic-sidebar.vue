<template>
  <n-menu :value="currentMenu" :options="currentMenuList" @update:value="handleSelectNav" />
</template>
<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
defineOptions({
  name: 'WorkspaceDynamicSidebar'
})

const { currentMenuList, currentMenu } = useMenuStore()

const route = useRoute()
const router = useRouter()

const handleSelectNav = (key: string) => {
  if (route.matched.some((r) => r.name === 'workspace-base-layout')) {
    router.push({ name: key })
  }
}
</script>
