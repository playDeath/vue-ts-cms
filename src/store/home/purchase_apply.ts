import { paramsType, DataType, purchaseApplyDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import emmiter from '@/utils/eventBus'
import { ElMessage } from 'element-plus'
const purchaseApply: any = {
  namespaced: true,
  state(): purchaseApplyDataType {
    return {
      purchaseLists: [],
      total: 0,
      purchaseId: '',
      selector: '',
      purchaseList: null,
      doubleDatePicker: ['', ''],
      current: 1,
      size: 6
    }
  },
  actions: {
    getPurchasePlanListByCondition(context: any): void {
      tableRequest
        .request<DataType>({
          url: `/tPurchaseplan/getPurchasePlanListByCondition/${context.state.current}/${context.state.size}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            purchaseId: context.state.purchaseId,
            state: context.state.selector
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setPurchaseLists', res.data.data.records)
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
          url: '/tPurchaseplan/getPurchasePlanWithAudit',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            purchapplyid: id
          }
        })
        .then((res) => {
          if (res.data.status === 200) {
            context.commit('setPurchaseList', res.data.data)
            context.commit('setPurchaseId', id)
            context.commit('setDoubleDatePicker', [
              res.data.data.jhtime,
              res.data.data.jhtimeEnd
            ])
            emmiter.emit('getDoubleDatePicker', [
              res.data.data.jhtime,
              res.data.data.jhtimeEnd
            ])
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          console.log(error)
          ElMessage.error('请检查网络')
        })
    },
    updatePurchaseplan(context: any) {
      context.commit('setPurchaseListApplyState', '提交')
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
          if (res.data.status === 200) {
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

          if (res.data.status === 200) {
            ElMessage.success('删除成功')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('网络异常')
          console.log(error)
        })
    },
    addPurchaseplan(context: any, payload: any) {
      console.log('jack lie')

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
          console.log(res)

          if (res.data.status === 200) {
            ElMessage.success(`${payload.msg}${payload.state}成功`)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
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
          if (res.data.status === 200) {
            console.log(res)

            context.commit('setpurchaseListUnitAndOperatorAndPurchapplyid', {
              operuser: res.data.data.operuser,
              unit: res.data.data.unit,
              purchapplyid: res.data.data.purchapplyid
            })
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('网络出现问题')
          console.log(error)
        })
    },
    getPurchaseplanListToAudit(context: any) {
      tableRequest
        .request<DataType>({
          url: `/tPurchaseplan/getPurchaseplanListToAudit/${context.state.current}/${context.state.size}`,
          method: 'POST'
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setPurchaseLists', res.data.data.records)
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
    addAuditRecords(context: any, params: paramsType) {
      commonRequest
        .request<DataType>({
          url: '/tAuditRecords/addAuditRecords',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params
        })
        .then((res) => {
          if (res.data.status === 200) {
            ElMessage.success(`成功`)
            context.dispatch('getPurchaseplanListToAudit')
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
    setPurchaseLists(state: any, lists: any) {
      state.purchaseLists = lists
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setCurrent(state: any, current: number) {
      state.current = current
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
    setpurchaseListUnitAndOperatorAndPurchapplyid(state: any, payload: any) {
      state.purchaseList.unit = payload.unit
      state.purchaseList.operuser = payload.operuser
      state.purchaseList.purchapplyid = payload.purchapplyid
    },
    setDoubleDatePicker(state: any, arr: string) {
      state.doubleDatePicker = arr
    }
  }
}
export default purchaseApply
