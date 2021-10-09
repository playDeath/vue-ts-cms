<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="95px" class="form" load>
        <el-form-item label="供应商名称:" class="form-item">
          <el-input v-model="supplierName"></el-input>
        </el-form-item>
        <el-form-item label="单据编号:" class="form-item">
          <el-input v-model="purchaseId"></el-input>
        </el-form-item>
        <el-form-item label="通知状态:" class="form-item">
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

        <el-form-item class="form-item">
          <el-button type="primary" size="medium" @click="searchByCondition"
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
import checkTable from './cpn/checkTable.vue'
import { selectors } from './config/data'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const supplierName = ref('')
    const purchaseId = ref('')
    const selector = ref('全部')
    let freezeStatus = ''
    const changeSelector = (item: string) => {
      selector.value = item
      switch (selector.value) {
        case '全部':
          freezeStatus = ''
          break
        case '冻结中':
          freezeStatus = '1'
          break
        case '已解冻':
          freezeStatus = '0'
          break
      }
    }
    const searchByCondition = () => {
      store.commit('depositModule/setCurrent', 1)
      store.commit('depositModule/setFreezeStatus', freezeStatus)
      store.commit('depositModule/setSupplier', supplierName.value)
      store.commit('depositModule/setPurchapplyId', purchaseId.value)
      store.dispatch('depositModule/getQuoteDepositsByCondition')
    }
    searchByCondition()
    return {
      selector,
      changeSelector,
      selectors,
      purchaseId,
      searchByCondition,
      supplierName
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
}
</style>
