<template>
  <div class="notify">
    <h1 class="tip">通知公告</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="el-table-self"
      stripe
    >
      <el-table-column prop="number" label="序号" style="width: 30%">
      </el-table-column>
      <el-table-column prop="title" label="标题" style="width: 30%">
      </el-table-column>
      <el-table-column prop="time" label="时间" style="width: 30%">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { data } from './config/data'
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
.notify {
  .tip {
    display: inline-block;
    color: #909fc1;
    padding: 0.2rem;
    border-radius: 5px;
  }
  .el-table-self {
    border-top: 1px solid #409eff;
    &::before {
      height: 0;
    }
    .el-table__fixed {
      &::before {
        height: 0 !important;
      }
    }
  }
}
</style>
