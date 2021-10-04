<template>
  <el-table
    :data="users"
    class="el-table-self"
    stripe
    fit
    empty-text="没有数据"
  >
    <el-table-column prop="idUser" label="用户编号" fixed="left">
    </el-table-column>
    <el-table-column prop="job" label="职位" width="200"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="phone" label="电话"> </el-table-column>
    <el-table-column prop="username" label="用户名"> </el-table-column>
    <el-table-column label="操作" fixed="right" width="250">
      <template v-slot="scope">
        <el-button
          @click.prevent="getUserDetailInfo(scope.$index, users)"
          size="mini"
          type="info"
        >
          查看
        </el-button>
        <el-button
          @click.prevent="editUserInfo(scope.$index, users)"
          size="mini"
          type="success"
        >
          修改
        </el-button>
        <el-button
          @click.prevent="deleteUserInfo(scope.$index, users)"
          size="mini"
          type="danger"
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
    :page-size="size"
    @current-change="currentChange"
    class="pagination"
  >
  </el-pagination>
  <el-dialog title="用户信息修改" v-model="dialogTableVisible" width="30%">
    <detail-table @closeDialog="closeDialog"></detail-table>
  </el-dialog>
  <el-dialog title="用户详细信息" v-model="dialogListVisible" width="30%">
    <info-descriptions
      :info="user"
      :column="1"
      size="samll"
    ></info-descriptions>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import detailTable from './detailTable.vue'
import infoDescriptions from '@/components/infoDescriptions.vue'
import { objectToArrayTwo } from '@/utils/data-transfer'
import { userData } from '@/components/config/data'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    // 决定弹窗是否展示
    const dialogTableVisible = ref(false)
    // 展示用户的列表
    const dialogListVisible = ref(false)
    let current = ref(0)
    let size = ref(6)
    // let loading = ref(true)
    let total = computed(() => {
      return store.state.userModule.total
    })
    let users = computed(() => store.state.userModule.users)
    const user = computed(() =>
      objectToArrayTwo(store.state.userModule.user, userData)
    )
    const currentChange = (currentpage: number) => {
      store.dispatch('userModule/getUserLists', {
        current: currentpage,
        size: size.value
      })
    }
    const loadingTableInfo = () => {
      store.dispatch('userModule/getUserLists', {
        current: current.value,
        size: size.value
      })
    }
    const closeDialog = () => {
      dialogTableVisible.value = false
      loadingTableInfo()
    }
    // 获取用户数据
    const getUserDetailInfo = (index: number, rows: Array<any>) => {
      dialogListVisible.value = true
      store.dispatch('userModule/getUserById', rows[index].idUser)
    }
    // 删除用户数据
    const deleteUserInfo = (index: number, rows: Array<any>) => {
      ElMessageBox.confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.dispatch('userModule/deleteUserInfo', rows[index].idUser)
          loadingTableInfo()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const editUserInfo = (index: number, rows: Array<any>) => {
      dialogTableVisible.value = true
      store.dispatch('userModule/getUserById', rows[index].idUser)
    }
    return {
      size,
      total,
      users,
      currentChange,
      detailTable,
      dialogTableVisible,
      editUserInfo,
      closeDialog,
      deleteUserInfo,
      getUserDetailInfo,
      dialogListVisible,
      user
    }
  },
  components: {
    detailTable,
    infoDescriptions
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
</style>
