<template>
  <div class="check">
    <div class="check-block">
      <h1 class="h1"><i class="el-icon-s-check"></i> 用户信息处理</h1>
    </div>
    <div class="check-table">
      <check-table></check-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import checkTable from './cpn/checkTable.vue'
import { role } from './config/data'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const purchaseId = ref('')
    watch(
      purchaseId,
      (id) => {
        store.commit('purchaseApply/setPurchaseId', id)
      },
      {
        deep: true
      }
    )
    let selector = computed(() => store.state.purchaseApply.selector)
    const changeSelector = (item: string) => {
      store.commit('purchaseApply/setSelector', item)
    }
    const getUsers = () => {
      store.dispatch('userModule/getUserLists', {
        current: 0,
        size: 6
      })
    }
    getUsers()
    return {
      selector,
      changeSelector,
      role,
      purchaseId,
      getUsers
    }
  },
  components: {
    checkTable
  }
})
</script>
<style scoped lang="less">
.check {
  .check-block {
    background: white;
    border-radius: 0.3rem;
    .form {
      width: 70rem;
      display: flex;
      padding-top: 1rem;
      padding-left: 1rem;
      flex-wrap: nowrap;
      .form-item {
        display: flex;
        align-items: center;
        margin-left: 1rem;
        .el-dropdown-link {
          cursor: pointer;
          color: #409eff;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
  }
  .check-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    background: white;
    border-radius: 0.3rem;
  }
  .h1 {
    width: 100%;
    display: inline-block;
    padding: 1rem 0 1rem 2rem;
    color: #66686b;
  }
}
</style>
