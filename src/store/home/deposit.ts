import { paramsType, DataType, depositDataType } from './type'
import { tableRequest } from '@/network'
import { ElMessage } from 'element-plus'
const depositModule: any = {
  namespaced: true,
  state(): depositDataType {
    return {
      deposits: [],
      total: 0,
      deposit: null
    }
  },
  actions: {
    getQuoteDepositsByCondition(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tDeposit/qDepositsByCondition/${params.current}/${params.size}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: params.bodyParams
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setDeposits', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    getPromiseDepositsByCondition(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tDeposit/pDepositsByCondition/${params.current}/${params.size}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: params.bodyParams
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setDeposits', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    getfreezeDeposits(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          url: `/tDeposit/freezeDeposits/${params.current}/${params.size}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setDeposits', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    getMonthScoreByCondition(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          url: `/supplier/findMonthScore?current=${params.current}&limit=${params.size}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params.bodyParams
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSuppilers', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    },
    getAnnualScoreByCondition(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          url: `/supplier/findTotalScoreByPage?current=${params.current}&limit=${params.size}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params.bodyParams
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSuppilers', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    }
  },
  mutations: {
    setDeposits(state: any, deposits: Array<any>) {
      state.deposits = deposits
    },
    setTotal(state: any, total: number) {
      state.total = total
    }
  }
}
export default depositModule
