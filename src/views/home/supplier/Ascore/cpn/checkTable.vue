<template>
  <el-table :data="tableData" class="el-table-self" stripe>
    <el-table-column prop="name" label="供应商"> </el-table-column>
    <el-table-column prop="year" label="年份"> </el-table-column>
    <el-table-column prop="totalSc" label="本年度评分"> </el-table-column>
    <el-table-column prop="yearDeg" label="本年度评级"> </el-table-column>
    <el-table-column label="操作" width="120">
      <template v-slot="scope">
        <el-button
          @click.prevent="getDetailAnnualInfo(scope.$index, tableData)"
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
  <el-dialog v-model="dialogTableVisible" title="本年度评分">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import detailTable from './detailTable.vue'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const tableData = computed(() => store.state.supplier.suppliers)
    const total = computed(() => store.state.supplier.total)
    const dialogTableVisible = ref(false)
    const getDetailAnnualInfo = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('supplier/getScoreYearByID', {
        supId: rows[index].supplierid,
        year: rows[index].year
      })
    }
    return {
      tableData,
      total,
      getDetailAnnualInfo,
      dialogTableVisible
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
