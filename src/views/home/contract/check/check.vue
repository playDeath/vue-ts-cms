<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" class="form">
        <el-form-item label="合同状态:" class="form-item">
          <el-dropdown @command="changeSelector">
            <span class="el-dropdown-link">
              {{ selector }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in selectors"
                  :key="item"
                  :command="item"
                  >{{ item }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item class="form-item" label-width="30px">
          <el-button type="primary" size="small" @click="searchByCondition"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="check-table">
      <check-table></check-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { selectors } from './config/data'
import checkTable from './cpn/checkTable.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const selector = ref('全部')
    const contractid = ref('')
    const changeSelector = (item: string) => {
      selector.value = item
      switch (item) {
        case '全部':
          store.commit('contractModule/setSelector', '')
          break
        case '草稿':
          store.commit('contractModule/setSelector', 0)
          break
        case '生效':
          store.commit('contractModule/setSelector', 1)
          break
      }
    }
    const searchByCondition = () => {
      changeSelector(selector.value)
      store.dispatch('contractModule/getContractListsByCondition')
    }
    searchByCondition()
    return {
      contractid,
      searchByCondition,
      selectors,
      changeSelector,
      selector
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
        margin-left: 2rem;
        display: flex;
        align-items: center;
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
}
</style>
