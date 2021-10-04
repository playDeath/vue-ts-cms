<template>
  <el-form ref="form" v-if="user" :model="user" size="mini" label-width="35%">
    <el-tabs stretch v-model="chooseTab">
      <el-tab-pane label="基本资料修改" name="first">
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="地址:">
              <el-input v-model="user.address"></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="邮箱:">
              <el-input v-model="user.email"></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="用户编号:">
              <el-input v-model="user.idUser"> </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="职位:">
              <el-input v-model="user.job"> </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="姓名:">
              <el-input v-model="user.name"> </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="所属电厂:">
              <el-input v-model="user.powerPlants"> </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="角色类型:">
              <el-select v-model="user.roleId" clearable placeholder="请选择">
                <el-option
                  v-for="item in role"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-bind="response">
            <el-form-item label="用户名:">
              <el-input v-model="user.username"> </el-input> </el-form-item
          ></el-col>
        </el-row>
        <div class="submit">
          <el-button type="primary" size="small" @click="editUserInfo"
            >提交</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户密码修改" name="second">
        <el-form v-if="user" :model="passwords" size="mini" label-width="35%">
          <el-row :gutter="20">
            <el-col v-bind="response">
              <el-form-item label="旧密码:">
                <el-input
                  v-model="passwords.password"
                  show-password
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col v-bind="response">
              <el-form-item label="新密码:">
                <el-input
                  v-model="passwords.newPassword"
                  show-password
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col v-bind="response">
              <el-form-item label="确认密码:">
                <el-input
                  v-model="passwords.confirmPassword"
                  show-password
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
        <div class="submit">
          <el-button type="primary" size="small" @click="editUserPassword"
            >提交</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { role } from '../config/data'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  name: '',
  setup(props, ctx) {
    const chooseTab = ref('first')
    const store = useStore()
    const passwords = reactive({
      confirmPassword: '',
      idUser: '',
      newPassword: '',
      password: ''
    })
    const user = computed(() => store.state.userModule.user)
    const editUserPassword = () => {
      store.dispatch('userModule/updateUserPassword', passwords)
      ctx.emit('closeDialog')
    }
    const editUserInfo = () => {
      ElMessageBox.confirm('是否确定修改用户信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          store.dispatch('userModule/updateUserInfo')
          ctx.emit('closeDialog')
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消修改'
          })
        })
    }
    const response = {
      xs: 20,
      sm: 20,
      md: 20,
      lg: 20,
      xl: 20
    }
    return {
      user,
      chooseTab,
      role,
      response,
      editUserInfo,
      passwords,
      editUserPassword
    }
  }
})
</script>
<style scoped lang="less">
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
}
.submit {
  display: flex;
  justify-content: center;
}
</style>
