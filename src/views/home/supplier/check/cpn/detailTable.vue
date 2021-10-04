<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-date"></i> 基本情况</span>
      </template>
      <info-descriptions :info="info"></info-descriptions>
    </el-tab-pane>
    <el-tab-pane label="附件信息">
      <attachment-list :attachmentList="attachmentList"></attachment-list>
    </el-tab-pane>
    <el-tab-pane label="审核记录">
      <lists :Lists="Lists"></lists>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import infoDescriptions from '@/components/infoDescriptions.vue'
import attachmentList from '@/components/attachmentList.vue'
import Lists from '@/components/Lists.vue'
import { objectToArrayTwo } from '@/utils/data-transfer'
import { supplierData } from '@/components/config/data'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const info = computed(() =>
      objectToArrayTwo(
        store.state.supplier.supplier.tfultbsupplier,
        supplierData
      )
    )
    // watch(
    //   store.state.supplier.supplier,
    //   () => {
    //     info = computed(() =>
    //       objectToArrayTwo(
    //         store.state.supplier.supplier.tfultbsupplier,
    //         supplierData
    //       )
    //     )
    //   },
    //   {
    //     immediate: true,
    //     deep: true
    //   }
    // )
    const attachmentList = computed(
      () => store.state.supplier.supplier.attachmentList
    )
    const Lists = computed(() => store.state.supplier.supplier.Lists)
    return {
      attachmentList,
      info,
      Lists
    }
  },
  components: {
    infoDescriptions,
    attachmentList,
    Lists
  }
})
</script>
<style scoped lang="less"></style>
