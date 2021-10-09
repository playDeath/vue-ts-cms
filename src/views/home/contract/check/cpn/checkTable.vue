<template>
  <el-table
    v-if="Array.isArray(lists)"
    :data="lists"
    class="el-table-self"
    stripe
    fit
    empty-text="没有数据"
  >
    <el-table-column prop="contractnumber" label="合同编号" width="150">
    </el-table-column>
    <el-table-column prop="aparty" label="合同甲方" width="150">
    </el-table-column>
    <el-table-column prop="bparty" label="合同乙方" width="150">
    </el-table-column>
    <el-table-column prop="operuser" label="操作员" width="150">
    </el-table-column>
    <el-table-column prop="transportMode" label="运输方式" width="150">
    </el-table-column>
    <el-table-column prop="settlemode" label="结算方式" width="150">
    </el-table-column>
    <el-table-column
      prop="deliverytime"
      label="交货开始时间"
      width="190"
      :formatter="dateFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="deliverytimeend"
      label="交货结束时间"
      width="190"
      :formatter="dateFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="signtime"
      label="签署日期"
      width="190"
      :formatter="dateFormatter"
    >
    </el-table-column>
    <!-- <el-table-column prop="attachment" label="合同链接"> </el-table-column> -->
    <el-table-column
      prop="applystatenum"
      label="合同状态"
      :formatter="statusFormatter"
      width="150"
      fixed="right"
    >
    </el-table-column>
    <el-table-column label="操作" width="150" fixed="right">
      <template v-slot="scope">
        <el-button
          @click.prevent="showDialog(scope.$index, lists)"
          type="text"
          size="small"
          v-if="scope.row.applystatenum === '1'"
        >
          查看
        </el-button>
        <template v-else>
          <el-button
            @click.prevent="editContractById(scope.$index, lists)"
            type="text"
            size="small"
          >
            修改
          </el-button>
          <el-button
            @click.prevent="deleteContractById(scope.$index, lists)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="5"
    @current-change="currentChange"
    class="pagination"
  >
  </el-pagination>
  <el-dialog title="长协交易清单" v-model="dialogTableVisible">
    <detail-table-show @closeDialog="closeDialog"></detail-table-show>
  </el-dialog>
  <el-dialog title="长协交易修改" v-model="dialogContractVisible" width="80%">
    <detail-table-edit @closeDialog="closeDialog"></detail-table-edit>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import detailTableShow from './detailTableShow.vue'
import detailTableEdit from './detailTableEdit.vue'
import moment from 'moment'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    // 决定弹窗是否展示
    const dialogTableVisible = ref(false)
    const dialogContractVisible = ref(false)
    let current = ref(0)
    // let loading = ref(true)
    const total = computed(() => {
      return store.state.contractModule.total
    })
    const lists = computed(() => store.state.contractModule.contracts)

    const currentChange = (currentpage: number) => {
      current.value = currentpage
      store.commit('contractModule/setCurrent', current.value)
      store.dispatch('contractModule/getContractListsByCondition')
    }
    const showDialog = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('contractModule/getContractById', rows[index].contractid)
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
      dialogContractVisible.value = false
      store.dispatch('contractModule/getContractListsByCondition')
    }
    const statusFormatter = (row: any) => {
      if (row.applystatenum === '1') return '生效'
      return '草稿'
    }
    const dateFormatter = (
      row: any,
      column: any,
      cellValue: string,
      index: number
    ) => {
      return !cellValue ? '' : moment(cellValue).format('YYYY/MM/DD hh:mm:ss')
    }
    const editContractById = (index: number, rows: Array<any>) => {
      dialogContractVisible.value = true
      store.dispatch('contractModule/getContractById', rows[index].contractid)
    }
    const deleteContractById = (index: number, rows: Array<any>) => {
      ElMessageBox.confirm(
        '此操作将永久删除该长协合同信息, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          store.dispatch(
            'contractModule/deleteContractById',
            rows[index].contractid
          )
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    return {
      total,
      lists,
      dialogTableVisible,
      showDialog,
      closeDialog,
      statusFormatter,
      currentChange,
      deleteContractById,
      dialogContractVisible,
      editContractById,
      dateFormatter
      // loading
    }
  },
  components: {
    detailTableShow,
    detailTableEdit
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
