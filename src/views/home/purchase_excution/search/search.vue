<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="95px" class="form">
        <el-form-item label="供应商名称:" class="form-item">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="采购单号:" class="form-item">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="采购单状态:" class="form-item">
          <el-dropdown>
            <span class="el-dropdown-link">
              全部<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">全部</el-dropdown-item>
                <el-dropdown-item command="b">草稿</el-dropdown-item>
                <el-dropdown-item command="c">审核中</el-dropdown-item>
                <el-dropdown-item command="c">已驳回</el-dropdown-item>
                <el-dropdown-item command="c">已发布</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button type="primary" size="medium">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="check-table">
      <check-table></check-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import checkTable from './cpn/checkTable.vue'
export default defineComponent({
  name: '',
  setup() {
    return {}
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
      width: 70rem;
      display: flex;
      padding-top: 1rem;
      padding-left: 1rem;
      .form-item {
        display: flex;
        align-items: center;
        margin-left: 1rem;
        .el-dropdown-link {
          cursor: pointer;
          color: #409eff;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
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
