<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="84px" class="form">
        <el-form-item label="供应商名称" class="form-item">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="" label-width="10px">
          <el-button type="primary" size="medium">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="check-table">
      <check-table></check-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import checkTable from './cpn/checkTable.vue'
export default defineComponent({
  name: '',
  setup() {
    return {}
  },
  components: {
    checkTable
  }
})
</script>
<style scoped lang="less">
.check {
  .check-block {
    background: white;
    border-radius: 0.3rem;
    .form {
      width: 45rem;
      display: flex;
      padding-top: 1rem;
      padding-left: 1rem;
    }
    .form-item {
      display: flex;
      align-items: center;
    }
  }
  .check-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    background: white;
    border-radius: 0.3rem;
  }
}
</style>
