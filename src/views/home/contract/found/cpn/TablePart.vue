<template>
  <el-form :model="contract" size="mini">
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="交易合同编号:">
          <el-input v-model="contract.contractnumber"></el-input> </el-form-item
      ></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="签署日期:">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="contract.signtime"
            value-format="YYYY-MM-DDTHH:MM:ss"
          >
          </el-date-picker> </el-form-item
      ></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="采购方名称(甲方):">
          <el-input v-model="contract.aparty"></el-input> </el-form-item
      ></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
        <el-form-item label="供应商名称（乙方）:">
          <el-input v-model="contract.bparty"></el-input> </el-form-item
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-form-item label="运输方式:">
          <el-select
            v-model="contract.transportMode"
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
        <el-form-item label="验收方式:">
          <el-select
            v-model="contract.acceptancemode"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in acceptance"
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
            v-model="contract.settlemode"
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
    <el-button
      type="primary"
      icon="el-icon-folder-add"
      size="small"
      @click="addLists"
    ></el-button>
    <div class="hr-distant"></div>
    <el-row
      :gutter="20"
      v-for="(item, index) in contract.tcitemList"
      :key="item"
    >
      <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <el-form-item label="煤种:">
          <el-select v-model="item.coaltype" clearable placeholder="请选择">
            <el-option
              v-for="item in coalTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> </el-form-item
      ></el-col>
      <!-- <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <el-form-item label="二级煤种:">
          <el-select v-model="item.coalclass" clearable placeholder="请选择">
            <el-option
              v-for="item in TwoLevelCoalClass"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> </el-form-item
      ></el-col> -->
      <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <el-form-item label="采购数量:">
          <el-input v-model="item.qty">
            <template #suffix>
              <span>(万吨)</span>
            </template>
          </el-input>
        </el-form-item></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <el-form-item label="热卡值:">
          <el-input v-model="item.calorievalue">
            <template #suffix>
              <span>(千卡)</span>
            </template>
          </el-input>
        </el-form-item></el-col
      >
      <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="deleteList(index)"
        ></el-button>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-upload
        class="upload-demo"
        action="http://47.111.14.150:8090/file/upload"
        :on-change="handleChange"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">只能上传 pdf 文件，且不超过 500kb</div>
        </template>
      </el-upload>
    </el-row> -->
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="footer">
      <el-button type="primary" @click="addContract('1')">提交</el-button>
      <el-button type="primary" @click="addContract('0')" class="el-btn-distant"
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
  settlement,
  acceptance
} from '../config/data'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const contract = computed(() => store.state.contractModule.contract)
    let doubleDatePicker = ref(['', ''])
    watch(
      doubleDatePicker,
      (newValue) => {
        store.commit('contractModule/setContractDoubleTime', newValue)
      },
      {
        deep: true
      }
    )
    const addLists = () => {
      store.state.contractModule.contract.tcitemList.push({
        calorievalue: '',
        citemid: '',
        coaltype: '',
        contractid: '',
        qty: ''
      })
    }
    const deleteList = (index: number) => {
      store.state.contractModule.contract.tcitemList.splice(index, 1)
    }
    const purchaseList = computed(() => store.state.purchaseApply.purchaseList)
    const addContract = (state: string): void => {
      store.dispatch('contractModule/addContract', { state })
    }
    // const handleChange = (file, fileList) => {
    //   this.fileList = fileList.slice(-3)
    // }
    return {
      coalTypes,
      TwoLevelCoalClass,
      transports,
      settlement,
      purchaseList,
      doubleDatePicker,
      addContract,
      addLists,
      deleteList,
      contract,
      acceptance
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.hr-distant {
  margin: 1rem 0;
  width: 95%;
  height: 0px;
  border-bottom: 1px dotted rgb(92, 89, 89);
}
</style>
