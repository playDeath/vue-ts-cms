<template>
  <el-form :disabled="disabled" class="distant">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form-item label="审核意见:">
          <el-input type="textarea" v-model="advice"></el-input></el-form-item
      ></el-col>
    </el-row>
    <div class="footer">
      <el-button type="success" @click="actionTo('审核')">审核通过</el-button>
      <el-button type="danger" @click="actionTo('驳回')">驳回</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import emitter from '@/utils/eventBus'
import { getNowFormatDate } from '@/utils/data-transfer'
export default defineComponent({
  name: '',
  setup() {
    const disabled = ref(false)
    const advice = ref('')
    const store = useStore()
    const actionTo = (operate: string) => {
      store.dispatch('purchaseApply/addAuditRecords', {
        auditcontent: advice.value,
        auditdate: getNowFormatDate(),
        auditoperate: operate,
        audituser: '',
        purchapplyid: store.state.purchaseApply.purchaseList.purchapplyid
      })
      advice.value = ''
      emitter.emit('closePurchaseApplyReviewDialog')
    }
    return {
      disabled,
      actionTo,
      advice
    }
  }
})
</script>
<style scoped lang="less">
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
}
.distant {
  margin-top: 1rem;
}
</style>
