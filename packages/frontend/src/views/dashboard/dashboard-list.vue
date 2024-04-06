<template>
  <div class="w-[768px] mx-auto my-10">
    <div class="mb-4 text-2xl font-bold">我的看板</div>

    <n-list>
      <n-spin :show="loading">
        <template v-if="data.length">
          <n-list-item v-for="item in data" :key="item.id">
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
          <n-empty class="mt-6 mb-4" description="没有找到看板"></n-empty>
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
import { ArrowForward } from '@vicons/ionicons5'
import { useDashboardList } from '@/composables/useDashboardList'

defineOptions({
  name: 'DashboardList'
})

const { pageBindings, searchBindings, loading, data } = useDashboardList()
const router = useRouter()

const redirect = (pid: number) => {
  router.push({ name: 'dashboard-view', params: { pid } })
}
</script>
