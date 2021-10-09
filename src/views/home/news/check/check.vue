<template>
  <div class="check">
    <div class="check-block">
      <el-form ref="form" label-width="95px" class="form" load>
        <!-- <el-form-item label="供应商名称:" class="form-item">
          <el-input disabled></el-input>
        </el-form-item> -->
        <el-form-item label="发布人:" class="form-item">
          <el-input v-model="createUser"></el-input>
        </el-form-item>
        <el-form-item label="新闻标题:" class="form-item">
          <el-input v-model="newsTitle"></el-input>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button type="primary" size="medium" @click="searchByCondition"
            >查询</el-button
          >
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
import { useStore } from 'vuex'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    const createUser = ref('')
    const newsTitle = ref('')

    const searchByCondition = () => {
      store.commit('newsModule/setNewsTitle', newsTitle.value)
      store.commit('newsModule/setCreateUser', createUser.value)
      store.dispatch('newsModule/getNewsListsByCondition')
    }
    searchByCondition()
    return {
      createUser,
      newsTitle,
      searchByCondition
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
      width: 70rem;
      display: flex;
      padding-top: 1rem;
      padding-left: 1rem;
      flex-wrap: nowrap;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    background: white;
    border-radius: 0.3rem;
  }
}
</style>
