<template>
  <div v-if="Lists">
    <el-table :data="Lists" style="width: 100%">
      <el-table-column prop="id" label="审核ID" width="100"> </el-table-column>
      <el-table-column prop="orgCodeIn" label="供应商组织机构代码" width="100">
      </el-table-column>
      <el-table-column
        prop="orgCodeOut"
        label="申请注册的组织机构代码"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="supplierId" label="供应商Id" width="100">
      </el-table-column>
      <el-table-column prop="supplierType" label="供应商类型" width="100">
      </el-table-column>
      <el-table-column prop="attachmentUser" label="上传人" width="100">
      </el-table-column>
      <el-table-column prop="verifyCode" label="审核人所在单位编码" width="100">
      </el-table-column>
      <el-table-column prop="verifyState" label="审核状态" width="100">
      </el-table-column>
      <el-table-column prop="verifyTime" label="审核时间" width="100">
      </el-table-column>
      <el-table-column prop="verifyUser" label="审核人" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    return {}
  }
})
</script>
<style scoped lang="less"></style>
