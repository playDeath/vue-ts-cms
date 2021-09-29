<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="84px" class="form">
        <el-form-item label="供应商名称" class="form-item">
          <el-input v-model="supplier"></el-input>
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
import { defineComponent, ref } from 'vue'
import checkTable from './cpn/checkTable.vue'
import { commonRequest } from '@/network/index'
import { DataType } from './config/data'
export default defineComponent({
  name: '',
  setup() {
    const supplier = ref('')
    commonRequest
      .request<DataType>({
        url: '/supplier/findSupByPage/1/1',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      })
      .then((res) => {
        console.log(res)
      })
    return {
      supplier
    }
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
