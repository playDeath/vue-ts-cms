<template>
  <div v-if="itemList">
    <el-table :data="itemList" style="width: 100%">
      <el-table-column prop="coaltype" label="煤种"> </el-table-column>
      <el-table-column prop="qty" label="采购数量"> </el-table-column>
      <el-table-column prop="coaltype" label="煤种"> </el-table-column>
      <el-table-column prop="calorievalue" label="热卡值"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    itemList: {
      type: Object,
      default() {
        return null
      }
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less"></style>
