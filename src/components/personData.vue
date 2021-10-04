<template>
  <transition name="test" mode="out-in" appear>
    <div v-if="status">
      <list-edit @changeStatus="changeStatus"></list-edit>
    </div>

    <div v-else>
      <list-show @changeStatus="changeStatus"></list-show>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ListEdit from './cpn/list-edit.vue'
import ListShow from './cpn/list-show.vue'
// import ElMessage from 'element-plus'
export default defineComponent({
  name: '',
  setup() {
    const status = ref(true)
    const changeStatus = () => {
      status.value = !status.value
      console.log(status.value)
    }
    return {
      status,
      changeStatus
    }
  },
  components: {
    ListEdit,
    ListShow
  }
})
</script>
<style scoped lang="less">
.test-enter-active {
  /* 这里的bounce使用了第三方的库 */
  animation: fadeInRight 700ms ease-in-out;
}
.test-leave-active {
  animation: fadeInRight 700ms ease-in-out reverse;
}
</style>
