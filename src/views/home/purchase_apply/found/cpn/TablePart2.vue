<template>
  <el-form ref="form" :model="purchaseList" size="mini">
    <el-row :gutter="1">
      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
        <el-form-item label="收到基低位发热量Qnet,ar≥:">
          <el-input v-model="purchaseList.type1" type="text">
            <template #suffix>
              <span>(KCal/kg)</span>
            </template>
          </el-input></el-form-item
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="全水分M≤:">
          <el-input v-model="purchaseList.type2">
            <template #suffix>
              <span>(%)</span>
            </template></el-input
          ></el-form-item
        ></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="收到基全硫St,ar≤:">
          <el-input v-model="purchaseList.type3">
            <template #suffix>
              <span>(%)</span>
            </template>
          </el-input></el-form-item
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="空干基水分Mad≤:">
          <el-input v-model="purchaseList.kgj1">
            <template #suffix>
              <span>(%)</span>
            </template>
          </el-input></el-form-item
        ></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="空干基全硫St,ad≤:">
          <el-input v-model="purchaseList.kgj2">
            <template #suffix>
              <span>(%)</span>
            </template></el-input
          ></el-form-item
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="干基高位发热量Qgr,d≥:">
          <el-input v-model="purchaseList.type7">
            <template #suffix>
              <span>(KCal/kg)</span>
            </template></el-input
          ></el-form-item
        ></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="干基全硫St,d≤">
          <el-input v-model="purchaseList.type8">
            <template #suffix>
              <span>(%)</span>
            </template></el-input
          ></el-form-item
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="粒度:">
          <el-input v-model="purchaseList.type6">
            <template #suffix>
              <span>(mm)</span>
            </template>
          </el-input></el-form-item
        ></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="灰熔点ST≥:">
          <el-input v-model="purchaseList.type4">
            <template #suffix>
              <span>(℃)</span>
            </template>
          </el-input></el-form-item
        ></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="哈式可磨系数≥:">
          <el-input v-model="purchaseList.type5">
            <template #suffix>
              <span>(HGI)</span>
            </template>
          </el-input></el-form-item
        ></el-col
      >
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            v-model="purchaseList.remark"
          ></el-input> </el-form-item
      ></el-col>
    </el-row>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="footer">
      <el-button type="primary" @click="nextTo">提交</el-button>
      <el-button type="primary" @click="editTo" class="el-btn-distant"
        >保存</el-button
      >
    </el-col>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  purchaseListContent,
  coalTypes,
  TwoLevelCoalClass,
  transports,
  settlement
} from '../config/data'
export default defineComponent({
  name: '',
  setup() {
    const purchaseList = ref(purchaseListContent)
    return {
      purchaseList,
      coalTypes,
      TwoLevelCoalClass,
      transports,
      settlement
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
