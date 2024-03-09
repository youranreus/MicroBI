<template>
  <n-card class="w-[500px] h-[500px]" content-class="flex justify-center items-center" embedded>
    <n-result status="418" title="登录" description="登录以使用完整服务">
      <template #footer>
        <n-button strong secondary type="info" @click="redirectLogin"> 使用SSO登录 </n-button>
      </template>
    </n-result>
  </n-card>
</template>
<script setup lang="ts">
import { useUserLogin } from '@/composables/useUserLogin'

defineOptions({
  name: 'UserLogin'
})

const { redirectLogin } = useUserLogin()
</script>
