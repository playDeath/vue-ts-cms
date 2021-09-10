<template>
  <div>
    <!-- model是必传的，因为el-form不知道下面表单内容的变化情况 -->
    <el-form
      label-width="70px"
      :rules="rules"
      :model="account"
      class="form"
      ref="formRef"
      label-position="left"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="account.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="getcode">
          <el-input v-model="account.verifyCode"></el-input>
          <el-button type="primary" class="getbtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/login-config'
import { ElForm } from 'element-plus'
import CacheControl from '@/utils/cache'
export default defineComponent({
  name: '',
  setup() {
    const account = reactive({
      username: CacheControl.getCache('username') ?? '',
      password: CacheControl.getCache('password') ?? '',
      verifycode: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAccountAction = (keepPassword: boolean) => {
      formRef.value?.validate((flag) => {
        if (flag) {
          if (keepPassword) {
            CacheControl.setCache('username', account.username)
            CacheControl.setCache('password', account.password)
          } else {
            CacheControl.deleteCache('username')
            CacheControl.deleteCache('password')
          }
        }
      })
    }
    return {
      account,
      rules,
      loginAccountAction,
      formRef
    }
  }
})
</script>
<style scoped lang="less">
.form {
  text-align: center;
  box-shadow: none;
}
.getcode {
  display: flex;
}
.getbtn {
  margin-left: 1rem;
}
</style>
