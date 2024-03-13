<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">已创建数据源</div>

    <n-button type="info" secondary>创建</n-button>
  </div>
  <datasource-list></datasource-list>
</template>
<script setup lang="ts">
import DatasourceList from '@/views/workspace/components/datasource-list.vue'
</script>
