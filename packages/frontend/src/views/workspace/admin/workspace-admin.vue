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
    <n-tab-pane name="user" tab="用户">
      <n-form-item label="当前用户">
        <n-flex>
          <n-tag
            v-for="user in editData.users"
            :key="user.email"
            :bordered="false"
            :closable="user.id !== userData.id"
            @close="removeUser(user.id)"
          >
            {{ user.name }}
            <template v-if="user.avatar" #avatar>
              <n-avatar :src="user.avatar" />
            </template>
          </n-tag>
        </n-flex>
      </n-form-item>
      <n-form-item label="添加用户">
        <n-input-group>
          <n-input v-model:value="newUser" v-bind="commonBindings" placeholder="新用户id" />
          <n-button type="primary" v-bind="commonBindings" ghost @click="handleClickAdd">
            添加
          </n-button>
        </n-input-group>
      </n-form-item>
    </n-tab-pane>
    <n-tab-pane name="other" tab="其他">
      <n-flex vertical>
        <n-button block strong secondary type="error" @click="quit"> 退出 </n-button>
        <n-button block strong secondary type="error" @click="del"> 删除 </n-button>
      </n-flex>
    </n-tab-pane>
  </n-tabs>
</template>
<script setup lang="ts">
import { useEditWorkspace } from '@/composables/useEditWorkspace'
import { useUserStore } from '@/stores/user'

defineOptions({
  name: 'WorkspaceAdmin'
})

const { userData } = useUserStore()
const {
  editData,
  nameBindings,
  logoBindings,
  commonBindings,
  confirmUpdate,
  removeUser,
  quit,
  del,
  addUser
} = useEditWorkspace()

const newUser = ref('')

const handleClickAdd = () => {
  addUser(Number(newUser.value))
}
</script>
