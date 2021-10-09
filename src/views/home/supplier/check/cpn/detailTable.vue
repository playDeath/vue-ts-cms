<template>
  <el-tabs>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-date"></i> 基本情况</span>
      </template>
      <info-descriptions :info="info"></info-descriptions>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-files"></i> 附件信息</span>
      </template>
      <attachment-list :attachmentList="attachmentList"></attachment-list>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-notebook-2"></i> 审核记录</span>
      </template>
      <lists :Lists="Lists"></lists>
      <div class="footer">
        <el-button
          type="primary"
          @click="passTo"
          v-if="
            isPass === '未审核' ||
            isPass === '已经驳回审核' ||
            isPass === '还没进行审核'
          "
          >审核通过</el-button
        >
        <el-button
          type="danger"
          @click="rejectTo"
          v-if="isPass === '已经审核通过'"
          >驳回</el-button
        >
      </div>
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
  setup(props, { emit }) {
    const store = useStore()
    const info = computed(() =>
      objectToArrayTwo(
        store.state.supplier.supplier.tfultbsupplier,
        supplierData
      )
    )
    const isPass = computed(() => store.state.supplier?.status)
    const attachmentList = computed(
      () => store.state.supplier.supplier.attachmentList
    )
    const Lists = computed(() => store.state.supplier.supplier.Lists)
    const passTo = () => {
      store.dispatch('supplier/verifySupplier')
      emit('closeDialog')
    }
    const rejectTo = () => {
      store.dispatch('supplier/rejectVerify')
      emit('closeDialog')
    }
    return {
      attachmentList,
      info,
      Lists,
      isPass,
      passTo,
      rejectTo
    }
  },
  components: {
    infoDescriptions,
    attachmentList,
    Lists
  }
})
</script>
<style scoped lang="less">
.footer {
  margin-top: 1rem;
}
</style>
