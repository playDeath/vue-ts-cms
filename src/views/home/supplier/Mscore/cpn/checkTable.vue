<template>
  <el-table :data="tableData" class="el-table-self" stripe>
    <el-table-column prop="name" label="供应商"> </el-table-column>
    <el-table-column prop="comSc" label="本月综合评分"> </el-table-column>
    <el-table-column prop="lastSc" label="上年度评分"> </el-table-column>
    <el-table-column prop="lastDeg" label="上年度评级"> </el-table-column>
    <el-table-column label="操作" width="120">
      <template v-slot="scope">
        <el-button
          @click.prevent="showDialog(scope.$index, tableData)"
          type="text"
          size="small"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :size="size"
    class="pagination"
  >
  </el-pagination>
  <el-dialog v-model="dialogTableVisible" title="本年度月评分">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import detailTable from './detailTable.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const size = ref(5)
    const dialogTableVisible = ref(false)
    const showDialog = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('supplier/getScoreMonthByID', {
        enId: rows[index].enterpriseId,
        supId: rows[index].supplierid
      })
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
    }
    const tableData = computed(() => store.state.supplier.suppliers)
    const total = computed(() => store.state.supplier.total)
    return {
      tableData,
      dialogTableVisible,
      total,
      size,
      showDialog,
      closeDialog
    }
  },
  components: {
    detailTable
  }
})
</script>
<style scoped lang="less">
.el-table-self {
  margin: 1rem;
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
