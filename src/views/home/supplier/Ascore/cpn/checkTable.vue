<template>
  <el-table :data="tableData" style="width: 100%" class="el-table-self" stripe>
    <el-table-column prop="number" label="序号"> </el-table-column>
    <el-table-column prop="name" label="供应商"> </el-table-column>
    <el-table-column prop="org_code" label="综合本月评分"> </el-table-column>
    <el-table-column prop="legal_person" label="上年度评分"> </el-table-column>
    <el-table-column prop="phone" label="上年度评级"> </el-table-column>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { data } from '../config/data'
export default defineComponent({
  name: '',
  setup() {
    const tableData = data
    return {
      tableData
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
