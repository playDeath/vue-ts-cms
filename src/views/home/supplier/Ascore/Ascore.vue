<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="84px" class="form">
        <el-form-item label="供应商名称" class="form-item">
          <el-input v-model="supplierName"></el-input>
        </el-form-item>
        <el-form-item label="年度" class="form-item">
          <div class="block">
            <el-date-picker
              v-model="select_year"
              type="year"
              placeholder="选择年"
              value-format="YYYY"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="" label-width="10px">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="searchByConditions"
          ></el-button>
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
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const supplierName = ref('')
    const select_year = ref('')
    const store = useStore()
    const searchByConditions = () => {
      let bodyParams = {}
      if (supplierName.value !== '' && select_year.value === '') {
        bodyParams = { name: supplierName.value }
      } else if (supplierName.value === '' && select_year.value !== '') {
        bodyParams = { year: select_year.value }
      } else if (supplierName.value !== '' && select_year.value !== '') {
        bodyParams = { name: supplierName.value, year: select_year.value }
      }
      store.dispatch('supplier/getAnnualScoreByCondition', {
        current: 1,
        size: 5,
        bodyParams
      })
    }
    searchByConditions()
    return {
      supplierName,
      select_year,
      searchByConditions
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
      width: 45rem;
      display: flex;
      padding-top: 1rem;
      padding-left: 1rem;
    }
    .form-item {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
  .check-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    background: white;
    border-radius: 0.3rem;
  }
}
</style>
