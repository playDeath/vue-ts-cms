<template>
  <el-table :data="tableData" class="el-table-self" stripe>
    <el-table-column prop="name" label="供应商"> </el-table-column>
    <el-table-column prop="month" label="月份"> </el-table-column>
    <el-table-column prop="comSc" label="本月综合评分"> </el-table-column>
    <el-table-column prop="year" label="年份"> </el-table-column>
    <el-table-column prop="totalSc" label="本年度评分"> </el-table-column>
    <el-table-column prop="yearDeg" label="本年度评级"> </el-table-column>
    <el-table-column prop="lastSc" label="上年度评分"> </el-table-column>
    <el-table-column prop="lastDeg" label="上年度评级"> </el-table-column>
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
  <el-pagination background layout="prev, pager, next" :total="total">
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const tableData = computed(() => store.state.supplier.suppliers)
    const total = computed(() => store.state.supplier.total)
    return {
      tableData,
      total
    }
  }
})
</script>
<style scoped lang="less">
.el-table-self {
  margin: 1rem;
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
