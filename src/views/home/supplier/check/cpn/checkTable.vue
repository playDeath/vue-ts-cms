<template>
  <el-table
    :data="tableData"
    style="width: 95%"
    class="el-table-self"
    stripe
    fit
    empty-text="没有数据"
  >
    <el-table-column prop="name" label="供应商名称"> </el-table-column>
    <el-table-column prop="corPhone" label="法人电话"> </el-table-column>
    <el-table-column prop="corporation" label="法人代表"> </el-table-column>

    <el-table-column prop="orgCode" label="组织机构代码"> </el-table-column>
    <el-table-column label="注册摘要信息">
      <template v-slot="scope">
        <span>通过了{{ scope.row.verifyCount }}家电厂审核</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
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
    class="pagination"
    @current-change="currentChange"
    :page-size="size"
  >
  </el-pagination>
  <el-dialog v-model="dialogTableVisible" title="供应商详细信息" width="75%">
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
    let current = ref(0)
    const store = useStore()
    const size = ref(6)
    const tableData = computed(() => store.state.supplier.suppliers)
    const total = computed(() => store.state.supplier.total)
    const dialogTableVisible = ref(false)
    const showDialog = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('supplier/getDetailSupplierById', rows[index].supplierid)
    }
    const currentChange = (currentPage: number) => {
      store.dispatch('supplier/getSuppliersByCondition', {
        current: currentPage,
        size: size.value,
        bodyParams: {}
      })
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
    }
    return {
      tableData,
      dialogTableVisible,
      total,
      size,
      current,
      currentChange,
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
  padding: 1rem;
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
