import { paramsType, DataType, purchaseApplyDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const purchaseApply: any = {
  namespaced: true,
  state(): purchaseApplyDataType {
    return {
      purchaseLists: [],
      total: 0,
      purchaseId: '',
      selector: '全部',
      purchaseList: null
    }
  },
  actions: {
    getPurchasePlanListByCondition(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          url: `/tPurchaseplan/getPurchasePlanListByCondition/${params.current}/${params.size}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params.bodyParams
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setPurchaseLists', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
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
    },
    updatePurchaseplan(context: any) {
      commonRequest
        .request<DataType>({
          url: '/tPurchaseplan/updatePurchaseplan',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.purchaseList
        })
        .then((res) => {
          if (res.status === 200) {
            ElMessage.success('修改成功')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
          console.log(error)
        })
    },
    deletePurchaseplan(context: any) {
      commonRequest
        .request<DataType>({
          url: '/tPurchaseplan/deletePurchaseById',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            purchapplyid: context.state.purchaseId
          }
        })
        .then((res) => {
          console.log(res)

          if (res.status === 200) {
            ElMessage.success('删除成功')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
          console.log(error)
        })
    },
    addPurchaseplan(context: any, payload: any) {
      context.commit('setPurchaseListApplyState', payload.state)
      commonRequest
        .request<DataType>({
          url: '/tPurchaseplan/addPurchaseplan',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.purchaseList
        })
        .then((res) => {
          if (res.status === 200) {
            ElMessage.success(`${payload.msg}${payload.state}成功`)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
          console.log(error)
        })
    },
    getData(context: any) {
      commonRequest
        .request<DataType>({
          url: '/tPurchaseplan/getData',
          method: 'POST'
        })
        .then((res) => {
          if (res.status === 200) {
            context.commit('setpurchaseListUnitAndOperator', {
              operuser: res.data.operuser,
              unit: res.data.unit
            })
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('出现一些错误')
          console.log(error)
        })
    }
  },
  mutations: {
    setPurchaseLists(state: any, lists: any) {
      state.purchaseLists = lists
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setSelector(state: any, item: string) {
      state.selector = item
    },
    setPurchaseId(state: any, id: string) {
      state.purchaseId = id
    },
    setPurchaseList(state: any, purchaseList: any) {
      state.purchaseList = purchaseList
    },
    setPurchaseListApplyState(state: any, applyState: string) {
      state.purchaseList.applystate = applyState
    },
    setPurchaseListDoubleDate(state: any, doubleDate: any) {
      state.purchaseList.jhtime = doubleDate[0]
      state.purchaseList.jhtimeEnd = doubleDate[1]
    },
    setpurchaseListUnitAndOperator(state: any, payload: any) {
      state.purchaseList.unit = payload.unit
      state.purchaseList.operuser = payload.operuser
    }
  }
}
export default purchaseApply
