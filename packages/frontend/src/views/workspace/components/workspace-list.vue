<template>
  <n-list>
    <n-scrollbar :style="contentStyle">
      <n-spin :show="loading">
        <template v-if="data.length">
          <n-list-item v-for="item in data" :key="item.id">
            <template #prefix>
              <div class="flex items-center">
                <n-avatar v-if="item.logo" :src="item.logo" size="small" />
                <n-avatar v-else size="small">{{ item.name.slice(0, 1) }}</n-avatar>
              </div>
            </template>
            <template #suffix>
              <slot :data="item">
                <n-button size="small" tertiary type="info" @click="emit('select', item)">
                  <template #icon>
                    <n-icon :component="Enter"></n-icon>
                  </template>
                </n-button>
              </slot>
            </template>
            {{ item.name }}
          </n-list-item>
        </template>
        <template v-else>
          <n-empty class="mt-6 mb-4" description="没有找到工作区"></n-empty>
        </template>
      </n-spin>
    </n-scrollbar>

    <template #footer>
      <div class="flex justify-end">
        <n-pagination v-bind="pageBindings"></n-pagination>
      </div>
    </template>
    <template #header>
      <n-input-group>
        <n-input v-bind="searchBindings" placeholder="搜索" />
      </n-input-group>
    </template>
  </n-list>
</template>
<script setup lang="ts">
import { useWorkspaceList } from '@/composables/useWorkspaceList'
import type { WorkspaceMeta } from '@/types/workspace'
import { Enter } from '@vicons/ionicons5'

defineOptions({
  name: 'WorkspaceList'
})

const props = withDefaults(
  defineProps<{
    type?: 'all' | 'user'
    height: number
  }>(),
  {
    type: 'all'
  }
)

const emit = defineEmits<{
  (e: 'select', item: WorkspaceMeta): void
}>()

const contentStyle = computed(() => ({
  maxHeight: `${props.height - 52 - 59}px`,
  height: `${props.height - 52 - 59}px`
}))

const { data, loading, pageBindings, searchBindings } = useWorkspaceList(props.type)
</script>
