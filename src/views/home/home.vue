<template>
  <div>
    <el-container>
      <el-aside :width="iscollapse ? '60px' : '200px'" class="el-aside">
        <nav-menu :iscollapse="iscollapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header class="el-header">
          <nav-header @foldNavMenu="foldNavMenu"></nav-header>
        </el-header>
        <el-main class="el-main">
          <transition name="fade" mode="out-in">
            <keep-alive><router-view></router-view> </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer v-model="drawer" :size="400" style="background: #2d3446">
      <template #title>
        <h2>个人资料</h2>
      </template>
      <div class="list">
        <hr style="width: 90%; color: #72767b" />
        <header>
          <img
            src="~@/assets/img/avatar.png"
            style="width: 85px; height: 80px; border-radius: 50%"
            class="expand"
          />
        </header>
        <div><span>姓名:</span><span>林旭培</span></div>
        <div><span>用户名:</span><span>湛江彭于晏</span></div>
        <div><span>岗位:</span><span>电厂管理员</span></div>
        <div><span>联系电话:</span><span>110119120</span></div>
        <div><span>联系地址:</span><span>广东省湛江市</span></div>
        <div><span>电子邮件:</span><span>4543748349@qq.com</span></div>
        <footer>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="medium"
          ></el-button>
        </footer>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/baseUI/nav-menu/nav-menu.vue'
import NavHeader from '@/baseUI/nav-header/nav-header.vue'
import emitter from '@/utils/eventBus'
export default defineComponent({
  name: '',
  setup() {
    const iscollapse = ref(false)
    const drawer = ref(false)
    const foldNavMenu = (fold: boolean) => {
      iscollapse.value = fold
    }
    emitter.on('showBar', () => {
      drawer.value = true
    })
    return {
      iscollapse,
      foldNavMenu,
      drawer
    }
  },
  components: {
    NavMenu,
    NavHeader
  }
})
</script>
<style scoped lang="less">
.el-aside {
  height: 46.25rem;
  transition: width 300ms ease-in-out;
}
.el-header {
  height: 2.5rem;
}
.el-main {
  background: #f6f6f6;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 35rem;
  width: 100%;
  color: #91969b;
  div {
    display: flex;
    width: 80%;
    span:nth-child(1) {
      flex: 1;
      font-weight: 600;
    }
    span:nth-child(2) {
      flex: 3;
      border-bottom: 1px solid #72767b;
      font-weight: 500;
    }
  }
}
.expand {
  transition: all 100ms ease-in;
}
.expand:hover {
  transform: scale(1.1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
</style>
