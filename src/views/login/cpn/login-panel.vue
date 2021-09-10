<template>
  <div class="login-panel">
    <!-- <h1 class="title">国电煤炭交易系统</h1> -->
    <div class="keep">
      <el-tabs type="border-card" stretch class="el-tabs-append">
        <el-tab-pane class="el-tab-pane-append">
          <template #label>
            <span class="logo-font-size"
              ><i class="el-icon-user-solid"></i>中央认证</span
            >
          </template>
          <login-account ref="AccountRef"></login-account>
        </el-tab-pane>
      </el-tabs>
      <div class="account-control">
        <el-checkbox label="记住密码" v-model="keepPassword"></el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button class="elbtn" type="primary" @click="login"
        >确认提交</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import loginAccount from './login-account.vue'
export default defineComponent({
  name: 'login-panel',
  setup() {
    const keepPassword = ref(false)
    const router = useRouter()
    // 拿到loginAccount组件实例的类型
    const AccountRef = ref<InstanceType<typeof loginAccount>>()
    const login = () => {
      // AccountRef.value?.loginAccountAction(keepPassword.value)
      router.push('/home')
    }
    return {
      keepPassword,
      login,
      AccountRef
    }
  },
  components: {
    loginAccount
  }
})
</script>
<style scoped lang="less">
.login-panel {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 1);
  @media screen and (max-width: 768px) {
    .keep {
      width: 80%;
    }
  }
  .keep {
    width: 22rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-tabs-append {
      box-shadow: none;
      border: none;
      .el-tab-pane-append {
        background-color: white;
      }
    }
    .title {
      color: white;
    }
    .account-control {
      width: 90%;
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0 0.5rem 0;
    }
    .elbtn {
      width: 90%;
    }
    .logo-font-size {
      font-size: 1rem;
    }
  }
}
</style>
