<template>
  <div class="nav-header">
    <div class="left">
      <div class="icon">
        <i
          class="fold-menu"
          :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="handleFoldClick"
        ></i>
      </div>
      <div></div>
    </div>

    <div class="icon" title="通知">
      <!-- SVG icon 自身不带任何属性，你需要额外提供属性。-->

      <bell-filled style="width: 1em; height: 1em; margin-right: 8px" />
    </div>

    <div class="user-info">
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
import { BellFilled } from '@element-plus/icons'
export default defineComponent({
  name: '',
  setup(props, { emit }) {
    let isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldNavMenu', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  },
  components: {
    userInfo,
    BellFilled
  }
})
</script>
<style scoped lang="less">
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .left {
    flex: 21;
    .icon {
      .fold-menu {
        font-size: 1.5rem;
      }
    }
  }
  .icon {
    font-size: 1.2rem;
    flex: 1;
    cursor: pointer;
  }
  .user-info {
    flex: 2;
  }
}
</style>
