<template>
  <el-table :data="tableData" class="el-table-self">
    <el-table-column prop="idDeposit" label="保证金单号"> </el-table-column>
    <el-table-column prop="purchapplyid" label="采购单号"> </el-table-column>
    <el-table-column prop="supplier" label="供应商"> </el-table-column>
    <el-table-column prop="freezeAmount" label="冻结金额（元）">
    </el-table-column>
    <el-table-column
      prop="freezeStatus"
      label="冻结状态"
      :formatter="statusFormat"
    >
    </el-table-column>
    <el-table-column label="操作" width="120">
      <template v-slot="scope">
        <el-button
          @click.prevent="getDetailInfo(scope.$index, tableData)"
          type="text"
          size="small"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="total">
  </el-pagination>
  <el-dialog v-model="dialogTableVisible" title="详细信息">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import detailTable from '../../promise/cpn/detailTable.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const tableData = computed(() => store.state.depositModule.deposits)
    const total = computed(() => store.state.depositModule.total)
    const statusFormat = (row: any) => {
      if (row.freezeStatus === 1) {
        return '冻结中'
      }
      return '已解冻'
    }
    const dialogTableVisible = ref(false)
    const getDetailInfo = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('depositModule/getDepositById', rows[index].idDeposit)
    }
    return {
      tableData,
      dialogTableVisible,
      total,
      statusFormat,
      getDetailInfo
    }
  },
  components: {
    detailTable
  }
})
</script>
<style scoped lang="less">
.el-table-self {
  margin: 0.5rem;
  width: 95%;
  &::before {
    height: 0;
  }
  .el-table__fixed {
    &::before {
      height: 0 !important;
    }
  }
}
.pagination {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
</style>
