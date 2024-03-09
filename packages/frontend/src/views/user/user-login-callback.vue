<template>
  <n-card class="w-[500px] h-[500px]" content-class="flex justify-center items-center" embedded>
    <n-result
      :status="hasLoggedIn ? 'success' : '418'"
      title="登录"
      :description="hasLoggedIn ? '登录完成' : '登录以使用完整服务'"
    >
      <template #footer>
        <n-button v-if="hasLoggedIn" secondary type="info" @click="redirectHome">
          立即跳转
        </n-button>
        <n-button v-else strong secondary type="info" :loading="loading"> 登录中 </n-button>
      </template>
    </n-result>
  </n-card>
</template>
<script setup lang="ts">
import { useUserLogin } from '@/composables/useUserLogin'

defineOptions({
  name: 'UserLoginCallback'
})

const { hasLoggedIn, login, loading, redirectHome } = useUserLogin()

onMounted(() => {
  login()
})
</script>
