<template>
  <el-table :data="tableData" style="width: 100%" class="el-table-self" stripe>
    <el-table-column prop="number" label="序号" width="150"> </el-table-column>
    <el-table-column prop="name" label="单据编号" width="150">
    </el-table-column>
    <el-table-column prop="org_code" label="创建日期" width="150">
    </el-table-column>
    <el-table-column prop="legal_person" label="煤种" width="150">
    </el-table-column>
    <el-table-column prop="phone" label="数量(万吨)" width="150">
    </el-table-column>
    <el-table-column prop="method" label="结算方式" width="150">
    </el-table-column>
    <el-table-column prop="person" label="发起人" width="150">
    </el-table-column>
    <el-table-column prop="status" label="状态" width="140"
      >已提交</el-table-column
    >
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
  &::before {
    height: 0;
  }
  .el-table__fixed {
    &::before {
      height: 0 !important;
    }
  }
}
</style>
