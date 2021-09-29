<template>
  <el-table :data="tableData" style="width: 90%" class="el-table-self">
    <el-table-column prop="number" label="序号" width="150"> </el-table-column>
    <el-table-column prop="name" label="供应商" width="150"> </el-table-column>
    <el-table-column prop="org_code" label="组织代码" width="150">
    </el-table-column>
    <el-table-column prop="legal_person" label="法人" width="150">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="150"> </el-table-column>
    <el-table-column prop="tip" label="注册摘要信息" width="150">
    </el-table-column>
    <el-table-column label="操作" width="120">
      <el-button
        @click.prevent="deleteRow(scope.$index, tableData)"
        type="text"
        size="small"
      >
        审核
      </el-button>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="50">
  </el-pagination>
  <el-dialog v-model="dialogTableVisible" title="供应商详细信息">
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
    const dialogTableVisible = ref(true)
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
  height: 32rem;
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
