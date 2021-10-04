<template>
  <el-table
    :data="lists"
    class="el-table-self"
    stripe
    fit
    empty-text="没有数据"
  >
    <el-table-column prop="contractid" label="长协ID"> </el-table-column>
    <el-table-column prop="contractnumber" label="合同编号" width="200">
    </el-table-column>
    <el-table-column prop="aparty" label="合同甲方"> </el-table-column>
    <el-table-column prop="bparty" label="合同乙方"> </el-table-column>
    <el-table-column prop="operuser" label="操作员"> </el-table-column>
    <el-table-column prop="transportMode" label="运输方式"> </el-table-column>
    <el-table-column prop="settlemode" label="结算方式"> </el-table-column>
    <el-table-column prop="deliverytime" label="交货开始时间">
    </el-table-column>
    <el-table-column prop="deliverytimeend" label="交货结束时间">
    </el-table-column>
    <el-table-column prop="signtime" label="签署日期"> </el-table-column>
    <!-- <el-table-column prop="attachment" label="合同链接"> </el-table-column> -->
    <el-table-column
      prop="applystatenum"
      label="合同状态"
      :formatter="statusFormatter"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          @click.prevent="showDialog(scope.$index, lists)"
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
    :total="6"
    :page-size="5"
    @current-change="currentChange"
    class="pagination"
  >
  </el-pagination>
  <el-dialog title="长协交易清单" v-model="dialogTableVisible">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import detailTable from './detailTable.vue'
export default defineComponent({
  name: '',
  setup() {
    let result = ''
    const store = useStore()
    // 决定弹窗是否展示
    const dialogTableVisible = ref(false)
    // let current = ref(0)
    // let size = ref(6)
    // let loading = ref(true)
    // let total = computed(() => {
    //   return store.state.purchaseApply.total
    // })
    let lists = computed(() => store.state.contractModule.contracts)
    // const currentChange = (currentpage: number) => {
    //   store.dispatch('purchaseApply/getPurchasePlanListByCondition', {
    //     current: currentpage,
    //     size: size.value,
    //     bodyParams: {}
    //   })
    // }
    const loadingTableInfo = () => {
      store.dispatch('contractModule/getContractLists')
    }
    const showDialog = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('contractModule/getContractById', rows[index].contractid)
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
      loadingTableInfo()
    }
    const statusFormatter = (value: number) => {
      return (result = value === 1 ? '生效' : '草稿')
    }
    return {
      // total,
      lists,
      detailTable,
      dialogTableVisible,
      showDialog,
      closeDialog,
      statusFormatter
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
