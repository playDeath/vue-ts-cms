<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span style="margin-left: 0.8rem">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="exit"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided @click="showPersonInfo"
            >个人信息</el-dropdown-item
          >
          <el-dropdown-item @click="showEnterPriseInfo"
            >企业信息</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import emitter from '@/utils/eventBus'
import CacheControl from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.loginModule.userInfo.username)
    const exit = () => {
      // 退出时清除localstorage中的数据
      CacheControl.deleteCache('username')
      CacheControl.deleteCache('password')
      CacheControl.deleteCache('token')
      CacheControl.deleteCache('userMenus')
      CacheControl.deleteCache('userInfo')
      router.push('/login')
      // window.location.reload()
    }
    const showPersonInfo = () => {
      emitter.emit('showBar')
    }
    const showEnterPriseInfo = () => {
      emitter.emit('showBarTwo')
    }
    return {
      name,
      exit,
      showPersonInfo,
      showEnterPriseInfo
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
