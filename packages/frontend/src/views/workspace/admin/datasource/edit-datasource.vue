<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">{{ isEdit ? '编辑' : '创建' }}数据源</div>

    <n-button v-bind="commonBindings" type="info" secondary @click="redirectBack">返回</n-button>
  </div>

  <n-form ref="formRef" v-bind="formBindings">
    <n-form-item path="name" label="名称">
      <n-input v-bind="bindings.name" placeholder="新的数据源"></n-input>
    </n-form-item>
    <n-form-item path="type" label="类型">
      <n-radio-group name="type" v-bind="bindings.type">
        <n-space>
          <n-radio :value="DatasourceType.MARIADB"> MariaDB </n-radio>
          <n-radio :value="DatasourceType.MYSQL"> MySQL </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item path="ip" label="IP">
      <n-input v-bind="bindings.ip" placeholder="数据库IP地址"></n-input>
    </n-form-item>
    <n-form-item path="port" label="端口">
      <n-input-number v-bind="bindings.port"></n-input-number>
    </n-form-item>
    <n-form-item path="user" label="用户名">
      <n-input v-bind="bindings.user" placeholder="root"></n-input>
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input v-bind="bindings.password" type="password"></n-input>
    </n-form-item>
    <n-form-item path="database" label="数据库">
      <n-input v-bind="bindings.database" placeholder="database"></n-input>
    </n-form-item>
  </n-form>
  <n-flex justify="space-between">
    <n-button v-bind="commonBindings" type="primary" secondary @click="test"> 测试连接 </n-button>
    <n-button
      v-bind="commonBindings"
      :disabled="!canSave || loading"
      type="info"
      secondary
      @click="send"
    >
      {{ isEdit ? '保存' : '创建' }}
    </n-button>
  </n-flex>
</template>
<script setup lang="ts">
import { DatasourceType } from '@/types/datasource'
import { useDatasource } from '@/composables/useDatasource'
import type { FormInst } from 'naive-ui'

defineOptions({
  name: 'EditDatasource'
})

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInst>()

const isEdit = computed(() => route.name === 'datasource-admin-edit')

const { formBindings, canSave, loading, bindings, commonBindings, test, send } = useDatasource(
  formRef,
  isEdit.value
    ? {
        name: route.query?.name as string,
        id: Number(route.params.sourceId)
      }
    : undefined
)

const redirectBack = () => {
  router.push({ name: 'datasource-admin-index' })
}
</script>
