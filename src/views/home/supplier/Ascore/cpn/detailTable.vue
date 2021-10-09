<template>
  <el-table :data="supplier.yearScore" style="width: 100%">
    <el-table-column prop="enterpriseId" label="电厂ID" sortable>
    </el-table-column>
    <el-table-column prop="supplierId" label="供应商ID"> </el-table-column>
    <el-table-column prop="year" label="年份"> </el-table-column>
  </el-table>
  <div class="footer">
    <div>
      <span style="font-weight: 600; color: #909399">总分:</span
      ><span style="color: red">{{ supplier.totalSc }}</span>
    </div>
    <div>
      <span style="font-weight: 600; color: #909399">年度等级:</span
      ><span style="color: red">{{ supplier.yearDeg }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const supplier = computed(() => store.state.supplier.supplier)

    return {
      supplier
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
}
</style>
