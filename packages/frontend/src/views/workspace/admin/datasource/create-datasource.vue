<template>
  <div class="my-4 flex justify-between items-center">
    <div class="font-bold text-xl">已创建数据源</div>

    <n-button type="info" secondary @click="redirectBack">返回</n-button>
  </div>

  <n-form>
    <n-form-item label="名称">
      <n-input placeholder="新的数据源"></n-input>
    </n-form-item>
    <n-form-item label="类型">
      <n-radio-group name="type">
        <n-space>
          <n-radio :value="DatasourceType.MARIADB"> MariaDB </n-radio>
          <n-radio :value="DatasourceType.MYSQL"> MySQL </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="IP">
      <n-input placeholder="数据库IP地址"></n-input>
    </n-form-item>
    <n-form-item label="端口">
      <n-input-number></n-input-number>
    </n-form-item>
    <n-form-item label="用户名">
      <n-input placeholder="root"></n-input>
    </n-form-item>
    <n-form-item label="密码">
      <n-input type="password"></n-input>
    </n-form-item>
    <n-form-item label="数据库">
      <n-input placeholder="database"></n-input>
    </n-form-item>
  </n-form>
  <n-flex justify="space-between">
    <n-button type="primary" secondary>测试连接</n-button>
    <n-button type="info" secondary>创建</n-button>
  </n-flex>
</template>
<script setup lang="ts">
import { DatasourceType } from '@/types/datasource'

defineOptions({
  name: 'CreateDatasource'
})

const router = useRouter()
const redirectBack = () => {
  router.push({ name: 'datasource-admin-index' })
}
</script>
