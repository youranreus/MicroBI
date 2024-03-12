<template>
  <n-avatar-group v-if="userList.length" :options="userList" :size="size" :max="max">
    <template #avatar="{ option: { name, src } }">
      <n-tooltip>
        <template #trigger>
          <n-avatar v-if="src" :src="src"></n-avatar>
          <n-avatar v-else>{{ name.slice(0, 2) }}</n-avatar>
        </template>
        {{ name }}
      </n-tooltip>
    </template>
    <template #rest="{ options: rest }">
      <n-avatar>+{{ rest }}</n-avatar>
    </template>
  </n-avatar-group>
</template>
<script setup lang="ts">
import type { UserData } from '@/types/user'

defineOptions({
  name: 'UserList'
})

const props = withDefaults(
  defineProps<{
    users?: UserData[]
    size?: number
    max?: number
  }>(),
  {
    users: () => [],
    size: 40,
    max: 3
  }
)

const userList = computed(() => props.users.map((u) => ({ name: u.name, src: u.avatar })))
</script>
