<template>
  <div>
    <el-descriptions title="详细信息">
      <el-descriptions-item label="供应商名称"
        >重庆贸易有限公司</el-descriptions-item
      >
      <el-descriptions-item label="申请通过日期"
        >2014-06-20 08:4248</el-descriptions-item
      >
      <el-descriptions-item label="法人代表">黄建华</el-descriptions-item>
      <el-descriptions-item label="注册地区">
        重庆市吴中区吴中大道1188 号
      </el-descriptions-item>
      <el-descriptions-item label="联系电话"
        >1582392382388</el-descriptions-item
      >
      <el-descriptions-item label="传真">83643498</el-descriptions-item>
      <el-descriptions-item label="邮政编码">4500052</el-descriptions-item>
      <el-descriptions-item label="注册资金(万元)"
        >4500052</el-descriptions-item
      >
    </el-descriptions>
    <h3>本月月评分</h3>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="num1" label="1" />
      <el-table-column prop="num2" label="2" />
      <el-table-column prop="num3" label="3" />
      <el-table-column prop="num4" label="4" />
      <el-table-column prop="num5" label="5" />
      <el-table-column prop="num6" label="6" />
      <el-table-column prop="num7" label="7" />
      <el-table-column prop="num8" label="8" />
      <el-table-column prop="num9" label="9" />
      <el-table-column prop="num10" label="10" />
      <el-table-column prop="num11" label="11" />
      <el-table-column prop="num12" label="12" />
    </el-table>
    <div class="footer">
      <el-button type="primary" @click="editTo">评分确认</el-button>
      <el-button type="primary" @click="deleteTo">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    return {
      tableData: [
        {
          name: '到货数量(万吨)',
          num1: '3',
          num2: '3',
          num3: '3',
          num4: '3',
          num5: '3',
          num6: '3',
          num7: '3',
          num8: '3',
          num9: '3',
          num10: '3',
          num11: '3',
          num12: '3'
        },
        {
          name: '综合评分',
          num1: '95',
          num2: '0',
          num3: '0',
          num4: '0',
          num5: '0',
          num6: '0',
          num7: '0',
          num8: '0',
          num9: '0',
          num10: '0',
          num11: '0',
          num12: '0'
        }
      ]
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
}
</style>
