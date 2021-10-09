import { DataType, purchaseExcutionDataType } from './type'
import { tableRequest } from '@/network'
import { ElMessage } from 'element-plus'
const purchaseExcutionModule: any = {
  namespaced: true,
  state(): purchaseExcutionDataType {
    return {
      excutions: [],
      total: 0,
      excution: {},
      current: 1,
      size: 6,
      expressNumber: '',
      status: ''
    }
  },
  actions: {
    getPurchaseExcutionsByCondition(context: any): void {
      tableRequest
        .request<DataType>({
          url: `/tFultbpurchasingexecute/getExecuteByPage/${context.state.current}/${context.state.size}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            expressNumber: context.state.expressNumber,
            status: context.state.status
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setPurchaseExcutions', res.data.data.records)
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
    getPurchaseById(context: any, id: number) {
      tableRequest
        .request<DataType>({
          url: '/tPurchaseplan/getPurchaseplanByPurchapplyid',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            purchapplyid: id
          }
        })
        .then((res) => {
          context.commit('setPurchaseList', res.data)
          context.commit('setPurchaseId', id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mutations: {
    setPurchaseExcutions(state: any, excutions: any) {
      state.excutions = excutions
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setPurchaseExcution(state: any, excution: any) {
      state.excution = excution
    },
    setStatus(state: any, status: string) {
      state.status = status
    },
    setCurrent(state: any, current: number) {
      state.current = current
    },
    setExpressNumber(state: any, expressNumber: string) {
      state.expressNumber = expressNumber
    }
  }
}
export default purchaseExcutionModule
