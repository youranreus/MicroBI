<template>
  <n-thing>
    <template #header>
      <n-popover :disabled="editMode" trigger="hover" placement="bottom-start">
        <template #trigger>
          <span v-if="!editMode" class="text-2xl">{{ metadata.name }}</span>
          <n-input
            v-else
            v-model:value="editValue"
            :placeholder="metadata.name"
            :status="!editValue ? 'error' : undefined"
          ></n-input>
        </template>
        <n-descriptions :columns="1">
          <n-descriptions-item label="创建于">
            {{ dayjs(metadata.created_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="编辑于">
            {{ dayjs(metadata.updated_at).format('YYYY-MM-DD') }}
          </n-descriptions-item>
          <n-descriptions-item label="创建者">
            <user-meta :data="metadata.creator"></user-meta>
          </n-descriptions-item>
        </n-descriptions>
      </n-popover>
    </template>
    <template #header-extra>
      <n-flex>
        <n-button
          v-if="editMode"
          secondary
          round
          type="warning"
          @click="handleCancelEdit"
          :loading="loading"
        >
          <template #icon>
            <n-icon :component="CloseOutline"></n-icon>
          </template>
          取消编辑
        </n-button>
        <n-button secondary round @click="toggleEdit" :loading="loading">
          <template #icon>
            <n-icon :component="editMode ? SaveOutline : PencilOutline"></n-icon>
          </template>
          {{ editMode ? '保存' : '编辑' }}
        </n-button>

        <chart-add-dialog v-if="editMode" :loading="loading"></chart-add-dialog>
        <n-button v-if="!isCreate" secondary circle type="error" :loading="loading" @click="del()">
          <template #icon>
            <n-icon :component="TrashOutline"></n-icon>
          </template>
        </n-button>
      </n-flex>
    </template>
  </n-thing>
  <n-divider dashed />
</template>
<script setup lang="ts">
import { useEditDashbaord } from '@/composables/useEditDashboard'
import { useDashboardStore } from '@/stores/dashboard'
import ChartAddDialog from './chart-add-dialog.vue'
import { PencilOutline, TrashOutline, SaveOutline, CloseOutline } from '@vicons/ionicons5'
import dayjs from 'dayjs'

defineOptions({
  name: 'DashboardHeader'
})

const { editMode, metadata, isCreate, toggleEditMode, cancelEdit, updateOrigin } =
  useDashboardStore()
const { save, loading, del } = useEditDashbaord()
const editValue = ref(metadata.value.name)

watch(
  () => metadata.value.name,
  (val) => (editValue.value = val)
)

const toggleEdit = () => {
  if (!editValue.value) {
    editValue.value = metadata.value.name
  } else {
    metadata.value.name = editValue.value
  }

  if (!editMode.value) {
    toggleEditMode()
  } else {
    save(() => {
      toggleEditMode()
      updateOrigin()
    })
  }
}

const handleCancelEdit = () => {
  cancelEdit()
  toggleEditMode()
}
</script>
