<template>
  <el-form
    ref="form"
    v-if="sizeForm"
    :model="sizeForm"
    label-width="80px"
    size="mini"
    :disabled="disabled"
  >
    <el-tabs stretch v-model="chooseTab">
      <el-tab-pane label="基本情况" name="first">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="单据编号:">
              <el-input
                v-model="sizeForm.purchapplyid"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="报价截止时间:">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                v-model="sizeForm.bjtimeEnd"
                value-format="YYYY-MM-DDTHH:MM:ss"
              >
              </el-date-picker> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="申请单位:">
              <el-input v-model="sizeForm.unit"></el-input> </el-form-item
          ></el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="操作员:">
              <el-input
                v-model="sizeForm.operuser"
                disabled
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="操作日期:">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                v-model="sizeForm.operdate"
                value-format="YYYY-MM-DDTHH:MM:ss"
              >
              </el-date-picker></el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="15">
            <el-form-item label="交货时间:">
              <el-date-picker
                type="datetimerange"
                range-separator="至"
                v-model="doubleDatePicker"
                value-format="YYYY-MM-DDTHH:MM:ss"
              >
              </el-date-picker> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="采购数量:">
              <el-input v-model="sizeForm.qty">
                <template #suffix>
                  <span>(万吨)</span>
                </template>
              </el-input>
            </el-form-item></el-col
          >
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="运输方式:">
              <el-select
                v-model="sizeForm.yunshuMode"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in transports"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="结算方式:">
              <el-select
                v-model="sizeForm.jiesuanMode"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in settlement"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="煤种:">
              <el-select
                v-model="sizeForm.coaltype"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in coalTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="二级煤种:">
              <el-select
                v-model="sizeForm.coalclass"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in TwoLevelCoalClass"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="最高限价:">
              <el-input v-model="sizeForm.maxlimitprice">
                <template #suffix>
                  <span>(元/卡.吨)</span>
                </template>
              </el-input>
            </el-form-item></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-form-item label="最高限价说明:">
              <el-input
                type="textarea"
                v-model="sizeForm.maxremark"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-form-item label="结算付款方式:">
              <el-input type="textarea"></el-input></el-form-item
          ></el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="报价保证金缴纳:">
              <el-radio-group v-model="sizeForm.isPerformbond">
                <el-radio label="0">不要求</el-radio>
                <el-radio label="1">要求</el-radio></el-radio-group
              >
              <el-input v-model="sizeForm.performbondnmber">
                <template #suffix>
                  <span>(元)</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="履约保证金缴纳:">
              <el-radio-group v-model="sizeForm.isQuotebond">
                <el-radio label="0">不要求</el-radio>
                <el-radio label="1">要求</el-radio></el-radio-group
              >
              <el-input v-model="sizeForm.quotebondnmber">
                <template #suffix>
                  <span>(元)</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row></el-tab-pane
      >
      <el-tab-pane label="煤质要求" name="second">
        <el-row :gutter="1">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-form-item label="收到基低位发热量Qnet,ar≥:" :label-width="200">
              <el-input v-model="sizeForm.type1" type="text">
                <template #suffix>
                  <span>(KCal/kg)</span>
                </template>
              </el-input></el-form-item
            ></el-col
          >
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="全水分M≤:" :label-width="150">
              <el-input v-model="sizeForm.type2">
                <template #suffix>
                  <span>(%)</span>
                </template></el-input
              ></el-form-item
            ></el-col
          >
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="收到基全硫St,ar≤:" :label-width="150">
              <el-input v-model="sizeForm.type3">
                <template #suffix>
                  <span>(%)</span>
                </template>
              </el-input></el-form-item
            ></el-col
          >
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="空干基水分Mad≤:" :label-width="150">
              <el-input v-model="sizeForm.kgj1">
                <template #suffix>
                  <span>(%)</span>
                </template>
              </el-input></el-form-item
            ></el-col
          >
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="空干基全硫St,ad≤:" :label-width="150">
              <el-input v-model="sizeForm.kgj2">
                <template #suffix>
                  <span>(%)</span>
                </template></el-input
              ></el-form-item
            ></el-col
          >
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="干基高位发热量Qgr,d≥:" :label-width="150">
              <el-input v-model="sizeForm.type7">
                <template #suffix>
                  <span>(KCal/kg)</span>
                </template></el-input
              ></el-form-item
            ></el-col
          >
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="干基全硫St,d≤" :label-width="150">
              <el-input v-model="sizeForm.type8">
                <template #suffix>
                  <span>(%)</span>
                </template></el-input
              ></el-form-item
            ></el-col
          >
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="粒度:" :label-width="150">
              <el-input v-model="sizeForm.type6">
                <template #suffix>
                  <span>(mm)</span>
                </template>
              </el-input></el-form-item
            ></el-col
          >
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="灰熔点ST≥:" :label-width="150">
              <el-input v-model="sizeForm.type4">
                <template #suffix>
                  <span>(℃)</span>
                </template>
              </el-input></el-form-item
            ></el-col
          >
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="哈式可磨系数≥:" :label-width="150">
              <el-input v-model="sizeForm.type5">
                <template #suffix>
                  <span>(HGI)</span>
                </template>
              </el-input></el-form-item
            ></el-col
          >
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="备注:">
              <el-input
                type="textarea"
                v-model="sizeForm.remark"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="审批记录" name="third">
        <el-table
          :data="auditRecords"
          height="200"
          style="width: 100%"
          empty-text="无审批记录"
        >
          <el-table-column prop="audituser" label="审核人" />
          <el-table-column
            prop="auditdate"
            label="审核日期"
            :formatter="dateFormatter"
          />
          <el-table-column prop="auditoperate" label="操作" />
          <el-table-column prop="auditcontent" label="审核意见" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div
      class="footer"
      v-if="
        (listStatus === '草稿' && chooseTab !== 'third' && roleId == 3) ||
        (listStatus === '驳回' && chooseTab !== 'third' && roleId == 3)
      "
    >
      <el-button type="primary" @click="editTo">提交</el-button>
      <el-button type="danger" @click="deleteTo">删除</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import moment from 'moment'
import {
  coalTypes,
  TwoLevelCoalClass,
  transports,
  settlement
} from '../config/data'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import emmiter from '@/utils/eventBus'
export default defineComponent({
  name: '',
  setup(props, ctx) {
    const chooseTab = ref('first')
    const store = useStore()
    const disabled = ref(false)
    const roleId = computed(() => store.state.loginModule.userMenus[0].roleId)
    const listStatus = computed(
      () => store.state.purchaseApply.purchaseList?.applystate
    )
    watch(listStatus, (newValue) => {
      if (newValue !== '草稿' && newValue !== '驳回') {
        disabled.value = true
      } else {
        disabled.value = false
      }
    })
    const sizeForm = computed(() => store.state.purchaseApply.purchaseList)

    const doubleDatePicker = ref()
    emmiter.on('getDoubleDatePicker', (value) => {
      doubleDatePicker.value = value
    })
    watch(
      doubleDatePicker,
      (newValue) => {
        store.commit('purchaseApply/setPurchaseListDoubleDate', newValue)
      },
      {
        deep: true
      }
    )
    const auditRecords = computed(
      () => store.state.purchaseApply.purchaseList.auditRecords
    )
    const editTo = () => {
      // 发起修改请求
      store.dispatch('purchaseApply/updatePurchaseplan')
      // 关闭弹窗
      ctx.emit('closeDialog')
    }
    const deleteTo = () => {
      ElMessageBox.confirm('您当前正在进行删除操作，请确认后再继续', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.dispatch('purchaseApply/deletePurchaseplan')
          ctx.emit('closeDialog')
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '删除操作已取消'
          })
        })
    }
    const dateFormatter = (row: any, column: any, cellValue: string) => {
      return !cellValue ? '' : moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    }
    return {
      sizeForm,
      coalTypes,
      doubleDatePicker,
      listStatus,
      chooseTab,
      editTo,
      TwoLevelCoalClass,
      transports,
      settlement,
      deleteTo,
      auditRecords,
      disabled,
      roleId,
      dateFormatter
    }
  }
})
</script>
<style scoped lang="less">
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
}
</style>
