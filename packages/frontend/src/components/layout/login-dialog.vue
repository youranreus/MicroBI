<template>
  <n-modal :show="loginVisible" :mask-closable="false" :close-on-esc="false">
    <div class="w-[500px] h-[500px] rounded-2xl bg-slate-100 flex items-center justify-center">
      <n-result status="418" title="登录" description="登录以使用完整服务">
        <template #footer>
          <n-button strong secondary type="info" @click="redirectLogin"> 使用SSO登录 </n-button>
        </template>
      </n-result>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { useUserLogin } from '@/composables/useUserLogin'

defineOptions({
  name: 'LoginDialog'
})

const { loginVisible, redirectLogin } = useUserLogin()
</script>
