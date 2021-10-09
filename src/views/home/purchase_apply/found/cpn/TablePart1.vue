<template>
  <el-form :model="purchaseList" size="mini">
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="申请单位:">
          <el-input
            v-model="purchaseList.unit"
            disabled
          ></el-input> </el-form-item
      ></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="操作员:">
          <el-input
            v-model="purchaseList.operuser"
            disabled
          ></el-input> </el-form-item
      ></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="采购数量:">
          <el-input v-model="purchaseList.qty">
            <template #suffix>
              <span>(万吨)</span>
            </template>
          </el-input>
        </el-form-item></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="运输方式:">
          <el-select
            v-model="purchaseList.yunshuMode"
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
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="结算方式:">
          <el-select
            v-model="purchaseList.jiesuanMode"
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
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="煤种:">
          <el-select
            v-model="purchaseList.coaltype"
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
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="二级煤种:">
          <el-select
            v-model="purchaseList.coalclass"
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
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="操作日期:">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="purchaseList.operdate"
            value-format="YYYY-MM-DDTHH:MM:ss"
          >
          </el-date-picker></el-form-item
      ></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="报价截止时间:">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="purchaseList.bjtimeEnd"
            value-format="YYYY-MM-DDTHH:MM:ss"
          >
          </el-date-picker> </el-form-item
      ></el-col>
    </el-row>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="交货时间:">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            value-format="YYYY-MM-DDTHH:MM:ss"
            v-model="doubleDatePicker"
          >
          </el-date-picker> </el-form-item
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
        <el-form-item label="最高限价:">
          <el-input v-model="purchaseList.maxlimitprice">
            <template #suffix>
              <span>(元/卡.吨)</span>
            </template>
          </el-input>
        </el-form-item></el-col
      >
    </el-row>
    <el-row>
      <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
        <el-form-item label="最高限价说明:">
          <el-input
            type="textarea"
            v-model="purchaseList.maxremark"
          ></el-input> </el-form-item
      ></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-line">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="报价保证金缴纳:">
          <el-radio-group v-model="purchaseList.isPerformbond">
            <el-radio label="0">不要求</el-radio>
            <el-radio label="1">要求</el-radio></el-radio-group
          >
          <el-input
            v-model="purchaseList.performbondnmber"
            :disabled="purchaseList.isPerformbond === '0'"
          >
            <template #suffix>
              <span>(元)</span>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="履约保证金缴纳:">
          <el-radio-group v-model="purchaseList.isQuotebond">
            <el-radio label="0">不要求</el-radio>
            <el-radio label="1">要求</el-radio></el-radio-group
          >
          <el-input
            v-model="purchaseList.quotebondnmber"
            :disabled="purchaseList.isQuotebond === '0'"
          >
            <template #suffix>
              <span>(元)</span>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="footer">
      <el-button type="primary" @click="nextTo">下一步</el-button>
      <el-button
        type="primary"
        @click="addPurchase('保存', '草稿')"
        class="el-btn-distant"
        >保存</el-button
      >
    </el-col>
  </el-form>
  <div class="footer"></div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import {
  coalTypes,
  TwoLevelCoalClass,
  transports,
  settlement
} from '../config/data'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup(props, { emit }) {
    const store = useStore()
    const doubleDatePicker = ref(['', ''])
    watch(
      doubleDatePicker,
      (newValue) => {
        store.commit('purchaseApply/setPurchaseListDoubleDate', newValue)
      },
      {
        deep: true
      }
    )
    const purchaseList = computed(() => store.state.purchaseApply.purchaseList)
    const addPurchase = (msg: string, state: string): void => {
      store.dispatch('purchaseApply/addPurchaseplan', { msg, state })
    }
    const nextTo = () => {
      emit('TabToNext')
    }
    return {
      coalTypes,
      TwoLevelCoalClass,
      transports,
      settlement,
      nextTo,
      purchaseList,
      doubleDatePicker,
      addPurchase
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
</style>
