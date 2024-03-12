<template>
  <n-tabs type="line" animated>
    <n-tab-pane name="basic" tab="基础">
      <n-form :model="editData">
        <n-form-item path="name" label="名称">
          <n-input v-bind="nameBindings" />
        </n-form-item>
        <n-form-item path="logo" label="Logo">
          <n-input v-bind="logoBindings" />
        </n-form-item>
        <n-button v-bind="commonBindings" block strong secondary type="info" @click="confirmUpdate">
          保存
        </n-button>
      </n-form>
    </n-tab-pane>
    <n-tab-pane name="user" tab="用户"> 用户 </n-tab-pane>
    <n-tab-pane name="other" tab="其他"> 其他 </n-tab-pane>
  </n-tabs>
</template>
<script setup lang="ts">
import { useEditWorkspace } from '@/composables/useEditWorkspace'

defineOptions({
  name: 'WorkspaceAdmin'
})

const { editData, nameBindings, logoBindings, commonBindings, confirmUpdate } = useEditWorkspace()
</script>
