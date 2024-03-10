<template>
  <div class="h-[calc(100vh-64px-2px-64px-32px)] w-full flex items-center justify-center">
    <n-result title="欢迎使用MicroBI" status="404" size="large">
      <template #footer>
        <n-button @click="redirect">前往工作区</n-button>
      </template>
    </n-result>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()

const redirect = () => router.push({ name: 'workspace-index' })
</script>
