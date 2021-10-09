<template>
  <el-table
    :data="monthScore"
    height="350"
    style="width: 100%"
    default-sort="month"
    v-if="Array.isArray(monthScore)"
  >
    <el-table-column prop="month" label="月份" sortable> </el-table-column>
    <el-table-column prop="number" label="到货数量(万吨)">
      <template v-slot="scope">
        <span v-if="scope.row.state === false && scope.row.month !== month">{{
          scope.row.score
        }}</span>
        <el-input
          type="text"
          v-else-if="scope.row.state === false"
          v-model.number="scope.row.number"
        >
        </el-input>
        <span v-else>{{ scope.row.score }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="score" label="本月评分">
      <template v-slot="scope">
        <span v-if="scope.row.state === false && scope.row.month !== month">{{
          scope.row.score
        }}</span>
        <el-input
          type="text"
          v-else-if="scope.row.state === false"
          v-model.number="scope.row.score"
        >
        </el-input>
        <span v-else>{{ scope.row.score }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="year" label="年份"> </el-table-column>
    <el-table-column label="操作" width="120">
      <template v-slot="scope">
        <el-button type="text" size="small" v-if="scope.row.state === true">
          已评分</el-button
        >
        <el-button
          type="text"
          size="small"
          style="color: red"
          v-else-if="scope.row.state === false && scope.row.month !== month"
        >
          未评分</el-button
        >
        <el-button
          @click.prevent="submitMonthScore(scope.$index, monthScore)"
          type="primary"
          size="small"
          v-else
        >
          提交
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div class="footer">
      <el-button type="primary" @click="editTo">评分确认</el-button>
      <el-button type="primary" @click="deleteTo">返回</el-button>
    </div> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup(props, { emit }) {
    const store = useStore()
    const monthScore = computed(() => store.state.supplier.supplier)
    const month = new Date().getMonth() + 1

    const submitMonthScore = (index: number, target: any) => {
      store.dispatch('supplier/setScoreMonth', target[index])
      emit('closeDialog')
    }
    return {
      monthScore,
      submitMonthScore,
      month
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
</style>
