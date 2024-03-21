<template>
  <div class="w-[768px] mx-auto my-10">
    <div class="mb-4 text-2xl font-bold">我的图表</div>

    <n-list>
      <n-spin :show="loading">
        <template v-if="data.length">
          <n-list-item v-for="item in data" :key="item.id">
            <template #prefix>
              <chart-type-tag :type="item.type"></chart-type-tag>
            </template>
            <template #suffix>
              <n-button size="small" tertiary type="info" @click="redirect(item.id)">
                <template #icon>
                  <n-icon :component="ArrowForward"></n-icon>
                </template>
              </n-button>
            </template>
            {{ item.name }}
          </n-list-item>
        </template>
        <template v-else>
          <n-empty class="mt-6 mb-4" description="没有找到图表"></n-empty>
        </template>
      </n-spin>

      <template #footer>
        <div class="flex justify-end">
          <n-pagination v-bind="pageBindings"></n-pagination>
        </div>
      </template>
      <template #header>
        <n-input-group>
          <n-input v-bind="searchBindings" placeholder="按名称搜索" />
        </n-input-group>
      </template>
    </n-list>
  </div>
</template>
<script setup lang="ts">
import ChartTypeTag from '@/components/chart-type-tag.vue'
import { ArrowForward } from '@vicons/ionicons5'
import { useChartList } from '@/composables/useChartList'

defineOptions({
  name: 'AnalyzeGallery'
})

const { pageBindings, searchBindings, loading, data } = useChartList()
const router = useRouter()

const redirect = (cid: number) => {
  router.push({ name: 'analyze-edit', params: { cid } })
}
</script>
