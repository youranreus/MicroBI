<template>
  <n-tag :size="size" :type="TYPE_MAP[type]">{{ type }}</n-tag>
</template>
<script setup lang="ts">
import { DatasourceType } from '@/types/datasource'

withDefaults(
  defineProps<{
    type: DatasourceType
    size?: 'large' | 'medium' | 'small' | 'tiny'
    bordered?: boolean
  }>(),
  {
    size: 'small',
    bordered: false
  }
)

const TYPE_MAP: Record<
  DatasourceType,
  'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
> = {
  [DatasourceType.MYSQL]: 'success',
  [DatasourceType.MARIADB]: 'info'
}
</script>
