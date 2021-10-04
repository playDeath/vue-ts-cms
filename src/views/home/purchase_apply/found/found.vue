<template>
  <div class="found">
    <div class="el-form-back">
      <h2 class="title">
        <i class="el-icon-s-order"></i>
        采购清单
      </h2>
      <div class="line"></div>
      <el-tabs tab-position="right" v-model="chooseTab" class="positionAbs">
        <el-tab-pane label="基本情况" name="first">
          <table-part1 @TabToNext="TabToNext"></table-part1>
        </el-tab-pane>
        <el-tab-pane label="煤质情况" name="second">
          <table-part2 style="height: 460px"></table-part2>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TablePart1 from './cpn/TablePart1.vue'
import TablePart2 from './cpn/TablePart2.vue'
import { useStore } from 'vuex'
import { purchaseListContent } from './config/data'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    store.dispatch('purchaseApply/getData')
    store.commit('purchaseApply/setPurchaseList', purchaseListContent)
    const chooseTab = ref('first')
    const TabToNext = () => {
      chooseTab.value = 'second'
    }
    return {
      chooseTab,
      TabToNext
    }
  },
  components: {
    TablePart1,
    TablePart2
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
.found {
  width: 100%;
  height: 40rem;
  display: flex;
  justify-content: center;
}
.el-form-back {
  background: white;
  width: 98%;
  padding: 1rem;
  .title {
    color: #606266;
  }
  .line {
    margin-top: 1rem;
    width: 88%;
    border-bottom: 1px dotted rgb(92, 89, 89);
  }
  .positionAbs {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    .el-tabs__header {
      float: none;
    }
  }
}
</style>
