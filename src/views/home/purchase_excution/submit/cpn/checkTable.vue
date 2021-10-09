<template>
  <el-table
    :data="selectionSuppliers"
    style="width: 95%"
    class="el-table-self"
    stripe
  >
    <el-table-column prop="supplierid" label="供应商ID" width="150">
    </el-table-column>
    <el-table-column prop="shortName" label="供应商简称" width="150">
    </el-table-column>
    <el-table-column
      prop="operdate"
      label="操作日期"
      width="190"
      :formatter="dateFormatter"
    >
    </el-table-column>
    <el-table-column prop="operuser" label="操作员" width="150">
    </el-table-column>
    <el-table-column prop="coaltype" label="煤种" width="150">
    </el-table-column>
    <el-table-column prop="qty" label="购买数量" width="150"> </el-table-column>
    <el-table-column prop="quoteprice" label="报价(万元)" width="150">
    </el-table-column>
    <el-table-column
      prop="qycalorie"
      label="热卡值(千卡)"
      fixed="right"
      width="150"
    >
      <template v-slot="scope">
        <span v-if="scope.row.isBid === 1">{{ scope.row.qycalorie }}</span>
        <el-input
          type="text"
          v-else
          v-model.number="scope.row.qycalorie"
          size="small"
        >
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      prop="qyprice"
      label="签约价格(万元)"
      width="150"
      fixed="right"
    >
      <template v-slot="scope">
        <span v-if="scope.row.isBid === 1">{{ scope.row.qyprice }}</span>
        <el-input
          type="text"
          v-else
          v-model.number="scope.row.qyprice"
          size="small"
        >
        </el-input>
      </template>
    </el-table-column>
    <el-table-column prop="qyqty" label="签约量" fixed="right">
      <template v-slot="scope">
        <span v-if="scope.row.isBid === 1">{{ scope.row.qyqty }}</span>
        <el-input
          type="text"
          v-else
          v-model.number="scope.row.qyqty"
          size="small"
        >
        </el-input>
      </template>
    </el-table-column>
    <el-table-column label="状态/操作" width="120" fixed="right">
      <template v-slot="scope">
        <span v-if="scope.row.isBid === 1">已确认</span>
        <el-button
          @click.prevent="confirmSupplier(scope.$index, selectionSuppliers)"
          type="text"
          size="small"
          v-else
        >
          确认为意向
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="total">
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const selectionSuppliers = computed(
      () => store.state.selectionSupplierModule.selectionSuppliers
    )
    const total = computed(() => store.state.selectionSupplierModule.total)
    const confirmSupplier = (index: number, rows: Array<any>) => {
      ElMessageBox.confirm('确认选中该供应商为意向供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.dispatch(
            'selectionSupplierModule/changeToWinSupplier',
            rows[index]
          )
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消确认'
          })
        })
    }
    const dateFormatter = (row: any, column: any, cellValue: string) => {
      return !cellValue ? '' : moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    }
    return {
      selectionSuppliers,
      total,
      confirmSupplier,
      dateFormatter
    }
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
