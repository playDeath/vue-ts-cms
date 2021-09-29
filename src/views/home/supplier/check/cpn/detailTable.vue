<template>
  <div>
    <el-descriptions title="基本情况" :column="2" border>
      <el-descriptions-item
        label="供应商名称"
        label-align="right"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="150px"
        >黑龙江经贸有限公司</el-descriptions-item
      >
      <el-descriptions-item
        label="组织机构代码"
        label-align="right"
        align="center"
        >supplier</el-descriptions-item
      >
      <el-descriptions-item label="法人代表" label-align="right" align="center">
        <el-tag size="small">赵某某</el-tag>
      </el-descriptions-item>
      <el-descriptions-item
        label="法人代表身份证"
        label-align="right"
        align="center"
        >1111111111111111111</el-descriptions-item
      >
      <el-descriptions-item label="法人代表" label-align="right" align="center">
        <el-tag size="small">注册资金(万元)</el-tag>
      </el-descriptions-item>
      <el-descriptions-item
        label="法人代表身份证"
        label-align="right"
        align="center"
        >200</el-descriptions-item
      >
      <el-descriptions-item
        label="税务登记代码"
        label-align="right"
        align="center"
      >
        <el-tag size="small">11111111</el-tag>
      </el-descriptions-item>
      <el-descriptions-item
        label="经营执照编号"
        label-align="right"
        align="center"
        >1111111111111111111</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less"></style>
