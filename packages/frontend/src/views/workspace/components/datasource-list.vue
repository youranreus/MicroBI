<template>
  <n-list>
    <n-scrollbar :style="contentStyle">
      <n-spin :show="loading">
        <template v-if="data.length">
          <n-list-item v-for="item in data" :key="item.id">
            <template #prefix>
              <n-tag :bordered="false">#{{ item.id }}</n-tag>
            </template>
            <template #suffix>
              <slot :data="item">
                <n-button size="small" tertiary type="info" @click="emit('select', item)">
                  <template #icon>
                    <n-icon :component="CreateOutline"></n-icon>
                  </template>
                </n-button>
              </slot>
            </template>
            {{ item.name }}
          </n-list-item>
        </template>
        <template v-else>
          <n-empty class="mt-6 mb-4" description="没有找到数据源"></n-empty>
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
import { useDatasourceList } from '@/composables/useDatasourceList'
import type { DatasourceMeta } from '@/types/datasource'
import { CreateOutline } from '@vicons/ionicons5'

defineOptions({
  name: 'DatasourceList'
})

const props = withDefaults(
  defineProps<{
    height?: number
  }>(),
  {}
)

const emit = defineEmits<{
  (e: 'select', item: DatasourceMeta): void
}>()

const contentStyle = computed(() =>
  props.height
    ? {
        maxHeight: `${props.height - 52 - 59}px`,
        height: `${props.height - 52 - 59}px`
      }
    : {}
)

const { data, loading, pageBindings, searchBindings } = useDatasourceList()
</script>
