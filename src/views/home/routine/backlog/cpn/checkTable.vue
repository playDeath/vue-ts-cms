<template>
  <el-table
    :data="lists"
    class="el-table-self"
    stripe
    fit
    empty-text="没有数据"
  >
    <el-table-column prop="purchapplyid" label="单据编号"> </el-table-column>
    <el-table-column
      prop="operdate"
      label="操作日期"
      width="200"
      :formatter="dateFormatter"
    >
    </el-table-column>
    <el-table-column prop="coaltype" label="煤种"> </el-table-column>
    <el-table-column prop="jiesuanMode" label="结算方式"> </el-table-column>
    <el-table-column prop="operuser" label="操作员"> </el-table-column>
    <el-table-column prop="applystate" label="状态"> </el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          @click.prevent="showDialog(scope.$index, lists)"
          type="text"
          size="small"
        >
          审核
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="size"
    @current-change="currentChange"
    class="pagination"
  >
  </el-pagination>
  <el-dialog title="采购清单" v-model="dialogTableVisible">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import emitter from '@/utils/eventBus'
import { useStore } from 'vuex'
import { dateFormatterCurrying } from '@/utils/data-transfer'
import detailTable from '../../../purchase_apply/review/cpn/detailTable.vue'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    // 决定弹窗是否展示
    const dialogTableVisible = ref(false)
    const current = ref(0)
    const size = ref(6)
    // let loading = ref(true)
    let total = computed(() => {
      return store.state.purchaseApply.total
    })
    let lists = computed(() => store.state.purchaseApply.purchaseLists)
    const currentChange = (currentpage: number) => {
      current.value = currentpage
      store.commit('purchaseApply/setCurrent', current.value)
      store.dispatch('purchaseApply/getPurchaseplanListToAudit')
    }
    // loadingTableInfo()
    const showDialog = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('purchaseApply/getPurchaseById', rows[index].purchapplyid)
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
    }
    const dateFormatter = dateFormatterCurrying('YYYY/MM/DD')
    emitter.on('closePurchaseApplyReviewDialog', closeDialog)
    return {
      size,
      total,
      lists,
      currentChange,
      detailTable,
      dialogTableVisible,
      showDialog,
      closeDialog,
      dateFormatter
      // loading
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
