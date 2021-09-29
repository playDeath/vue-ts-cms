<template>
  <el-table :data="tableData" style="width: 90%" class="el-table-self">
    <el-table-column prop="number" label="采购单号"> </el-table-column>
    <el-table-column prop="name" label="供应商"> </el-table-column>
    <el-table-column prop="money" label="冻结金额"> </el-table-column>
    <el-table-column prop="state" label="订单状态"> </el-table-column>
    <el-table-column label="操作" width="120">
      <el-button
        @click.prevent="deleteRow(scope.$index, tableData)"
        type="text"
        size="small"
      >
        查看
      </el-button>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="50">
  </el-pagination>
  <el-dialog v-model="dialogTableVisible" title="详细信息">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { data } from '../config/data'
import detailTable from './detailTable.vue'
export default defineComponent({
  name: '',
  setup() {
    const tableData = data
    const dialogTableVisible = ref(false)
    return {
      tableData,
      dialogTableVisible
    }
  },
  components: {
    detailTable
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
