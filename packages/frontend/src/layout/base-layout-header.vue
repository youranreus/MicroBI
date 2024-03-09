<template>
  <div class="flex justify-between items-center border-b-2 border-gray-100 h-12 p-8">
    <div class="text-2xl font-bold">MicroBI</div>
    <div>
      <n-menu mode="horizontal" :options="userMenuOptions" responsive />
    </div>
  </div>
  <login-dialog v-model="visible"></login-dialog>
</template>
<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import LoginDialog from '@/components/layout/login-dialog.vue'

defineOptions({
  name: 'BaseLayoutHeader'
})

const visible = ref(true)

const userMenuOptions: MenuOption[] = [
  {
    label: '登录',
    key: 'login'
  }
]
</script>
