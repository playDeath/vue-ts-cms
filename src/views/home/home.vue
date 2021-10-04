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
        <h2>个人信息</h2>
      </template>
      <person-data></person-data>
    </el-drawer>
    <el-drawer v-model="drawerTwo" :size="400" style="background: #2d3446">
      <template #title>
        <h2>企业信息</h2>
      </template>
      <enterprise-data :enterpriseData="enterpriseData"></enterprise-data>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, reactive } from 'vue'
import { DataType } from '@/store/home/type'
import NavMenu from '@/baseUI/nav-menu/nav-menu.vue'
import NavHeader from '@/baseUI/nav-header/nav-header.vue'
import personData from '@/components/personData.vue'
import enterpriseData from '@/components/enterpriseData.vue'
import emitter from '@/utils/eventBus'
import { objectToArray } from '@/utils/data-transfer'
import { commonRequest } from '@/network/index'
export default defineComponent({
  name: '',
  setup() {
    const iscollapse = ref(false)
    const drawer = ref(false)
    const drawerTwo = ref(false)
    const personData = ref({})
    let enterpriseData = ref()
    provide('personData', personData)
    const foldNavMenu = (fold: boolean) => {
      iscollapse.value = fold
    }
    emitter.on('showBar', () => {
      drawer.value = true
      commonRequest
        .request<DataType>({
          url: '/tUser/getUserInformation'
        })
        .then((res) => {
          console.log(res)

          if (res.data.status === 200) {
            personData.value = objectToArray(res.data.data[0])
          }
        })
        .catch()
    })
    emitter.on('showBarTwo', () => {
      drawerTwo.value = true
      commonRequest
        .request<DataType>({
          url: '/tEnterprise/showEnterpriseInformation'
        })
        .then((res) => {
          if (res.data.status === 200) {
            enterpriseData.value = objectToArray(res.data.data[0])
            console.log(enterpriseData)
          }
        })
        .catch()
    })
    return {
      iscollapse,
      foldNavMenu,
      drawer,
      personData,
      drawerTwo,
      enterpriseData
    }
  },
  components: {
    NavMenu,
    NavHeader,
    personData,
    enterpriseData
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
