<template>
  <el-table :data="excutions" style="width: 95%" class="el-table-self" stripe>
    <el-table-column prop="purchexecuteid" fixed label="采购执行ID" width="150">
    </el-table-column>
    <el-table-column prop="expressNumber" fixed label="单据编号" width="150">
    </el-table-column>
    <el-table-column
      prop="userUuid"
      label="用户ID"
      width="140"
    ></el-table-column>
    <el-table-column prop="coaltype" label="煤种" width="150">
    </el-table-column>
    <el-table-column prop="operuser" label="操作员" width="150">
    </el-table-column>
    <el-table-column
      prop="operdate"
      label="操作日期"
      width="190"
      :formatter="dateFormatter"
    >
    </el-table-column>
    <el-table-column prop="transportMode" label="运算方式" width="150">
    </el-table-column>
    <el-table-column prop="qty" label="采购数量(万吨)" width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="订单状态"
      width="140"
      fixed="right"
    ></el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="6"
    @current-change="currentChange"
  >
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const excutions = computed(
      () => store.state.purchaseExcutionModule.excutions
    )
    const total = computed(() => store.state.purchaseExcutionModule.total)
    const currentChange = (item: number) => {
      store.commit('purchaseExcutionModule/setCurrent', item)
      store.dispatch('purchaseExcutionModule/getPurchaseExcutionsByCondition')
    }
    const dateFormatter = (row: any, column: any, cellValue: string) => {
      return !cellValue ? '' : moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    }
    return {
      excutions,
      total,
      currentChange,
      dateFormatter
    }
  }
})
</script>
<style scoped lang="less">
.el-table-self {
  margin: 0.5rem;
  width: 95%;
  &::before {
    height: 0;
  }
  .el-table__fixed {
    &::before {
      height: 0 !important;
    }
  }
}
.pagination {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
</style>
