<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/main/logo.png" alt="logo" />
      <span class="title">{{ title }}</span>
    </div>
    <el-menu
      :default-active="defaultActive + ''"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      background-color="#2d3446"
      text-color="#fff"
      active-text-color="#40b982"
      :collapse="iscollapse"
      :collapse-transition="true"
    >
      <template v-for="item in navMenu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.authorityType === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-submenu :index="item.authorityId + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.authorityName }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template
              v-for="subitem in item.childrenRolePermissions"
              :key="subitem.authorityId"
            >
              <el-menu-item
                :index="subitem.authorityId + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.authorityName }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.authorityType === 2">
          <el-menu-item
            :index="item.authorityId + ''"
            @click="handleMenuItemClick(item)"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.authorityName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentMenuId } from '@/utils/map-menus'
export default defineComponent({
  name: '',
  props: {
    iscollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const title = ref('Power-Admin')
    const navMenu = store.state.loginModule.userMenus
    console.log(navMenu)

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.path ?? '/404'
      })
    }
    const defaultActive = getCurrentMenuId(navMenu, route.path)
    return {
      title,
      navMenu,
      handleMenuItemClick,
      defaultActive
    }
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #2d3446;
  .el-menu {
    border-right: none;
  }
  .logo {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 1rem 0;
    font-weight: 600;
    font-size: 1.1rem;
    img {
      width: 2rem;
      height: 2rem;
      margin-right: 0.8rem;
    }
  }
  .el-menu-vertical-demo {
    width: 100%;
    height: 100%;
  }
}
</style>
