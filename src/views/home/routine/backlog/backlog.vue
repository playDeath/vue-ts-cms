<template>
  <div class="check">
    <div class="check-block">
      <h1 class="h1"><i class="el-icon-s-promotion"></i> 事务中心</h1>
      <!-- <el-form ref="form" label-width="95px" class="form" load>
        <el-form-item label="采购单号:" class="form-item">
          <el-input v-model="purchaseId"></el-input>
        </el-form-item>
        <el-form-item label="采购单状态:" class="form-item">
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
      </el-form> -->
    </div>
    <div class="check-table">
      <check-table></check-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import checkTable from './cpn/checkTable.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const searchByCondition = () => {
      store.commit('purchaseApply/setCurrent', 1)
      store.dispatch('purchaseApply/getPurchaseplanListToAudit')
    }
    searchByCondition()
    return {
      searchByCondition
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
