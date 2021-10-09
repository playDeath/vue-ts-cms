import { paramsType, DataType, depositDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const depositModule: any = {
  namespaced: true,
  state(): depositDataType {
    return {
      deposits: [],
      total: 0,
      deposit: {},
      depositId: -100,
      freezeStatus: '',
      supplier: '',
      purchapplyid: '',
      current: 1,
      size: 6
    }
  },
  actions: {
    getQuoteDepositsByCondition(context: any): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tDeposit/qDepositsByCondition/${context.state.current}/${context.state.size}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            freezeStatus: context.state.freezeStatus,
            supplier: context.state.supplier,
            purchapplyid: context.state.purchapplyid
          }
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
    getPromiseDepositsByCondition(context: any): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tDeposit/pDepositsByCondition/${context.state.current}/${context.state.size}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            freezeStatus: context.state.freezeStatus,
            supplier: context.state.supplier,
            purchapplyid: context.state.purchapplyid
          }
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
    getDepositById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          url: `/tDeposit/detailedDeposit/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setDeposit', res.data.data)
            context.commit('setDepositId', id)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    unFreezeDeposit(context: any) {
      const id = context.state.depositId
      commonRequest
        .request<DataType>({
          url: `/tDeposit/unfreeze/${id}`,
          method: 'POST'
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage.success('解冻成功!')
            context.dispatch('getPromiseDepositsByCondition')
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
    setDeposits(state: any, deposits: Array<any>) {
      state.deposits = deposits
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setDeposit(state: any, deposit: Array<any>) {
      state.deposit = deposit
    },
    setDepositId(state: any, depositId: number) {
      state.depositId = depositId
    },
    setFreezeStatus(state: any, freezeStatus: string) {
      state.freezeStatus = freezeStatus
    },
    setSupplier(state: any, supplier: string) {
      state.supplier = supplier
    },
    setPurchapplyId(state: any, purchapplyId: string) {
      state.purchapplyid = purchapplyId
    },
    setCurrent(state: any, current: number) {
      state.current = current
    }
  }
}
export default depositModule
