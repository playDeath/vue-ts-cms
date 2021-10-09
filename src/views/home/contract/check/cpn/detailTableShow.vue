<template>
  <el-tabs>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-date"></i>基本信息</span>
      </template>
      <info-descriptions :info="info"></info-descriptions>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-goods"></i>货物列表</span>
      </template>
      <goods-lists :itemList="itemList"></goods-lists>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import goodsLists from '@/components/goodsLists.vue'
import infoDescriptions from '@/components/infoDescriptions.vue'
import { objectToArrayTwo } from '@/utils/data-transfer'
import { contractData } from '@/components/config/data'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const info = computed(() =>
      objectToArrayTwo(store.state.contractModule.contract, contractData)
    )
    const itemList = computed(
      () => store.state.contractModule.contract?.tcitemList
    )
    // const Lists = computed(() => store.state.supplier.supplier.Lists)
    return {
      itemList,
      info
    }
  },
  components: {
    infoDescriptions,
    goodsLists
  }
})
</script>
<style scoped lang="less"></style>
