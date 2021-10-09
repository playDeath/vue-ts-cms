<template>
  <div class="found">
    <div class="el-form-back">
      <h2 class="title">
        <i class="el-icon-finished"></i>
        新闻发布
      </h2>
      <div class="line"></div>
      <table-part1></table-part1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TablePart1 from './cpn/TablePart1.vue'
import { useStore } from 'vuex'
import { newsListContent } from './config/data'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    store.commit('newsModule/setNewsList', newsListContent)

    return {}
  },
  components: {
    TablePart1
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
    margin-bottom: 1rem;
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
