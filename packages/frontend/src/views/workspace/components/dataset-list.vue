<template>
  <n-list>
    <n-scrollbar :style="contentStyle">
      <n-spin :show="loading">
        <template v-if="data.length">
          <n-list-item v-for="item in data" :key="item.id">
            <template #prefix>
              <n-tag :bordered="false" type="info" size="small">#{{ item.id }}</n-tag>
            </template>
            <template #suffix>
              <slot :data="item" :func="{ refresh }">
                <n-button size="small" tertiary type="info" @click="emit('select', item)">
                  <template #icon>
                    <n-icon :component="CreateOutline"></n-icon>
                  </template>
                </n-button>
              </slot>
            </template>
            <n-popover trigger="hover" placement="right">
              <template #trigger>
                <span class="cursor-pointer">{{ item.name }}</span>
              </template>

              <div class="w-[300px]">
                <n-descriptions label-placement="top" title="详情">
                  <n-descriptions-item label="ID"> {{ item.id }} </n-descriptions-item>
                  <n-descriptions-item label="数据源ID">
                    {{ item.datasource }}
                  </n-descriptions-item>
                  <n-descriptions-item label="表名">
                    {{ item.tablename }}
                  </n-descriptions-item>
                  <n-descriptions-item label="创建于">
                    {{ dayjs(item.created_at).fromNow() }}
                  </n-descriptions-item>
                  <n-descriptions-item label="编辑于">
                    {{ dayjs(item.updated_at).fromNow() }}
                  </n-descriptions-item>
                </n-descriptions>
              </div>
            </n-popover>
          </n-list-item>
        </template>
        <template v-else>
          <n-empty class="mt-6 mb-4" description="没有找到数据集"></n-empty>
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
        <n-select
          v-bind="filterBindings"
          class="w-[300px]"
          :show-button="false"
          placeholder="数据源过滤"
          :options="dsOptions"
          :clearable="true"
          filterable
        ></n-select>
        <n-input v-bind="searchBindings" placeholder="搜索" />
      </n-input-group>
    </template>
  </n-list>
</template>
<script setup lang="ts">
import { useDatasetList } from '@/composables/useDatasetList'
import { useDatasourceList } from '@/composables/useDatasourceList'
import type { DatasetMeta } from '@/types/dataset'
import { CreateOutline } from '@vicons/ionicons5'
import dayjs from 'dayjs'

defineOptions({
  name: 'DatasetList'
})

const props = withDefaults(
  defineProps<{
    height?: number
  }>(),
  {}
)

const emit = defineEmits<{
  (e: 'select', item: DatasetMeta): void
}>()

const contentStyle = computed(() =>
  props.height
    ? {
        maxHeight: `${props.height - 52 - 59}px`,
        height: `${props.height - 52 - 59}px`
      }
    : {}
)

const { data, loading, pageBindings, searchBindings, filterBindings, refresh } = useDatasetList()
const { data: datasources } = useDatasourceList(100)

const dsOptions = computed(() =>
  datasources.value.map((ds) => ({
    label: ds.name,
    value: ds.id
  }))
)
</script>
