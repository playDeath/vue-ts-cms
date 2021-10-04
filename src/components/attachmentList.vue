<template>
  <div v-if="attachmentList">
    <el-table :data="attachmentList" style="width: 100%">
      <el-table-column prop="attachmentId" label="附件ID" width="100">
      </el-table-column>
      <el-table-column prop="attachmentName" label="附件名称" width="100">
      </el-table-column>
      <el-table-column prop="attachmentPath" label="附件路径" width="100">
      </el-table-column>
      <el-table-column prop="attachmentSize" label="附件大小" width="100">
      </el-table-column>
      <el-table-column prop="attachmentTime" label="上传时间" width="100">
      </el-table-column>
      <el-table-column prop="attachmentUser" label="上传人" width="100">
      </el-table-column>
      <el-table-column prop="filename" label="文件名" width="100">
      </el-table-column>
      <el-table-column prop="supplierId" label="供应商ID" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    attachmentList: {
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
