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
      <el-form-item label="验证码" prop="code">
        <div class="getcode">
          <el-input v-model="account.code"></el-input>
          <img
            :src="verify_code"
            alt="验证码"
            class="verify_code"
            @click="getImage"
          />
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
import { commonRequest } from '@/network/index'
import { ElMessage } from 'element-plus'
import type { DataType } from '../config/login-config'
import { useStore } from 'vuex'
import { setDynamicRouter } from '@/store/index'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '',
  props: {
    verify_code: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const store = useStore()
    const router = useRouter()
    const account = reactive({
      username: CacheControl.getCache('username') ?? '',
      password: CacheControl.getCache('password') ?? '',
      code: ''
    })
    const getImage = () => {
      ctx.emit('getVerifyCode')
    }
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 发起登录请求
    const loginAccountAction = (keepPassword: boolean) => {
      console.log(account.username)
      console.log(account.password)

      formRef.value?.validate((flag) => {
        if (flag) {
          commonRequest
            .request<DataType>({
              url: `/login?username=${account.username}&password=${account.password}&code=${account.code}&key=key`,
              method: 'POST'
            })
            .then((res) => {
              if (res.data.status === 200) {
                ElMessage.success('登录成功!')
                if (keepPassword) {
                  CacheControl.setCache('username', account.username)
                  CacheControl.setCache('token', res.headers.authorization)
                  CacheControl.setCache('userMenus', res.data.data)
                  CacheControl.setCache('userInfo', account.username)
                  store.commit(
                    'loginModule/setToken',
                    res.headers.authorization
                  )
                  store.commit('loginModule/setUserInfo', {
                    username: account.username
                  })
                  store.commit('loginModule/setUserMenus', res.data.data)
                  setDynamicRouter()
                  router.replace({
                    path: '/home'
                  })
                  window.location.reload()
                } else {
                  CacheControl.deleteCache('username')
                }
              } else {
                ElMessage.error(res.data.msg)
                ctx.emit('getNewImage')
              }
            })
            .catch((error) => {
              console.log(error)
              ElMessage.error('网络出了点问题')
            })
        }
      })
    }
    return {
      account,
      rules,
      loginAccountAction,
      formRef,
      getImage
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
.verify_code {
  margin-left: 10px;
  width: 100px;
  height: 40px;
  color: gray;
}
</style>
