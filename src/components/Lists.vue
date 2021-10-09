<template>
  <div v-if="Lists">
    <el-table :data="Lists" style="width: 100%">
      <el-table-column prop="supplierId" label="供应商Id" width="100">
      </el-table-column>
      <el-table-column prop="orgCodeIn" label="供应商组织机构代码" width="190">
      </el-table-column>

      <el-table-column
        prop="supplierType"
        label="供应商类型"
        width="100"
        :formatter="supplierType"
      >
      </el-table-column>
      <el-table-column prop="verifyUser" label="上传人" width="100">
      </el-table-column>
      <el-table-column prop="verifyCode" label="审核人所在单位编码" width="100">
      </el-table-column>
      <el-table-column prop="verifyResult" label="审核结果" width="100">
      </el-table-column>
      <el-table-column
        prop="verifyTime"
        label="审核时间"
        width="190"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column prop="verifyUser" label="审核人" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
export default defineComponent({
  name: '',
  props: {
    Lists: {
      type: Object,
      default() {
        return null
      }
    }
  },
  setup() {
    const supplierType = (row: any, column: any, cellValue: string) => {
      switch (cellValue) {
        case '0':
          return '临时供应商'
        case '1':
          return '一般供应商'
        case '2':
          return '重点供应商'
        case '3':
          return '内部供应商'
        default:
          return '未知'
      }
    }

    const dateFormatter = (row: any, column: any, cellValue: string) => {
      return !cellValue ? '' : moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    }

    return {
      supplierType,
      dateFormatter
    }
  }
})
</script>
<style scoped lang="less"></style>
