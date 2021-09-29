<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="84px" class="form">
        <el-form-item label="供应商名称" class="form-item">
          <el-input v-model="supplier"></el-input>
        </el-form-item>
        <el-form-item label="评分状态" class="form-item">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              已评价<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">已评价</el-dropdown-item>
                <el-dropdown-item command="b">未评价</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>

        <el-form-item label="" label-width="10px">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-search"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="check-table">
      <check-table></check-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import checkTable from './cpn/checkTable.vue'
export default defineComponent({
  name: '',
  setup() {
    const supplier = ref('')
    return {
      supplier
    }
  },
  components: {
    checkTable
  }
})
</script>
<style scoped lang="less">
.check {
  .check-block {
    background: white;
    border-radius: 0.3rem;
    .form {
      width: 45rem;
      display: flex;
      padding-top: 1rem;
      padding-left: 1rem;
    }
    .form-item {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
  .check-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    background: white;
    border-radius: 0.3rem;
  }
}
</style>
