<template>
  <el-table
    :data="lists"
    class="el-table-self"
    stripe
    fit
    empty-text="没有数据"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column type="expand">
      <template #default="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="新闻标题:">
            <span>{{ props.row.newsTitle }}</span>
          </el-form-item>
          <el-form-item label="发布人ID:">
            <span>{{ props.row.createUserid }}</span>
          </el-form-item>
          <el-form-item label="发布人:">
            <span>{{ props.row.createUser }}</span>
          </el-form-item>
          <el-form-item label="所属单位ID:">
            <span>{{ props.row.organUuid }}</span>
          </el-form-item>
          <el-form-item label="发布日期:">
            <span>{{ dateFormatterInner(props.row) }}</span>
          </el-form-item>
          <el-form-item label="新闻内容:">
            <span>{{ props.row.newsContent }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="发布日期"
      prop="createDate"
      :formatter="dateFormatterInner"
    >
    </el-table-column>
    <el-table-column label="新闻标题" prop="newsTitle"> </el-table-column>
    <el-table-column label="发布人" prop="createUser"> </el-table-column>
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          @click.prevent="updateNews(scope.$index, lists)"
          type="text"
          size="small"
        >
          修改
        </el-button>
        <el-button
          @click.prevent="deleteNews(scope.$index, lists)"
          type="text"
          size="small"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="6"
    @current-change="currentChange"
    class="pagination"
  >
  </el-pagination>
  <el-dialog title="新闻修改" v-model="dialogTableVisible" width="70%">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import detailTable from './detailTable.vue'
import { dateFormatterCurrying } from '@/utils/data-transfer'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    // 决定弹窗是否展示
    const dialogTableVisible = ref(false)
    let total = computed(() => {
      return store.state.newsModule.total
    })
    let lists = computed(() => store.state.newsModule.newsLists)
    const currentChange = (currentpage: number) => {
      console.log(currentpage)

      store.commit('newsModule/setCurrent', currentpage)
      store.dispatch('newsModule/getNewsListsByCondition')
    }
    const updateNews = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('newsModule/getNewsListById', rows[index].newsId)
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
    }
    // const dateFormatter = (row: any, column: any, cellValue: string) => {
    //   return !cellValue ? '' : moment(cellValue).format('YYYY-MM-DD')
    // }
    const dateFormatterInner = dateFormatterCurrying('YYYY/MM/DD hh:mm:ss')
    const deleteNews = (index: number, rows: Array<any>) => {
      ElMessageBox.confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.dispatch('newsModule/deleteNewsListById', rows[index].newsId)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    return {
      total,
      lists,
      currentChange,
      detailTable,
      dialogTableVisible,
      updateNews,
      closeDialog,
      deleteNews,
      // dateFormatter,
      dateFormatterInner
      // loading
    }
  },
  components: {
    detailTable
  }
})
</script>
<style scoped lang="less">
.el-table-self {
  margin: 0.5rem;
  width: 95%;
  &::before {
    height: 0;
  }
  .el-table__fixed {
    &::before {
      height: 0 !important;
    }
  }
}
.pagination {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
