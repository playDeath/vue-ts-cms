<template>
  <div class="found">
    <div class="el-form-back">
      <h2 class="title">
        <i class="el-icon-document-copy"></i>
        长协合同
      </h2>
      <div class="line"></div>
      <div class="form-contain">
        <table-part @TabToNext="TabToNext" class="table-part"></table-part>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TablePart from './cpn/TablePart.vue'
import { useStore } from 'vuex'
import { contract } from './config/data'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    // store.dispatch('purchaseApply/getData')
    store.commit('contractModule/setContract', contract)
    return {}
  },
  components: {
    TablePart
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
  display: flex;
  flex-direction: column;
  background: white;
  width: 98%;
  padding: 1rem 2rem;
  .title {
    color: #606266;
  }
  .line {
    margin-top: 1rem;
    width: 95%;
    border-bottom: 1px dotted rgb(92, 89, 89);
  }
  .form-contain {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
