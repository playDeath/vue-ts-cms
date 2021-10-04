import { paramsType, DataType, userDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const userModule: any = {
  namespaced: true,
  state(): userDataType {
    return {
      users: [],
      total: 0,
      user: null
    }
  },
  actions: {
    getUserLists(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          method: 'GET',
          url: `/tUser/users/${params.current}/${params.size}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setUsers', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    updateUserPassword(context: any, passwords: any) {
      passwords.idUser = context.state.user.idUser

      commonRequest
        .request<DataType>({
          method: 'POST',
          url: `/tUser/mAlterPassword`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: passwords
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功!'
            })
          } else if (res.data.status === 10005) {
            ElMessage({
              type: 'error',
              message: res.data.msg
            })
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    updateUserInfo(context: any) {
      commonRequest
        .request<DataType>({
          method: 'POST',
          url: `/tUser/alterUser`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.user
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功!'
            })
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    deleteUserInfo(context: any, id: number): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tUser/delete/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    getUserById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          url: `/tUser/user/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setUser', res.data.data)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    }
  },
  mutations: {
    setUsers(state: any, users: Array<any>) {
      state.users = users
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setUser(state: any, user: any) {
      state.user = user
    }
  }
}
export default userModule
