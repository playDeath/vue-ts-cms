import { paramsType, DataType, supplierDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const supplier: any = {
  namespaced: true,
  state(): supplierDataType {
    return {
      suppliers: [],
      total: 0,
      supplier: {},
      supplierId: ''
    }
  },
  actions: {
    getSuppliersByCondition(context: any, params: paramsType): void {
      tableRequest
        .request<DataType>({
          url: `/supplier/findSupByPage?current=${params.current}&limit=${params.size}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: params.bodyParams
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSuppliers', res.data.data.records)
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
    getDetailSupplierById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          url: `/supplier/finSupByID/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit(
              'setSupplierTfultbsupplier',
              res.data.data.tfultbsupplier
            )
            context.commit(
              'setSupplierAttachmentList',
              res.data.data.attachmentList
            )
            context.commit('setSupplierLists', res.data.data.list)
            context.commit('setSupplierId', id)
            context.commit('setSupplierStatus', res.data.data.statue)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
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
            context.commit('setSuppliers', res.data.data.records)
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
    getScoreMonthByID(context: any, payload: any) {
      commonRequest
        .request<DataType>({
          url: `/supplier/findScoreMonthByID`,
          method: 'POST',
          params: payload
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSupplier', res.data.data)
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
            context.commit('setSuppliers', res.data.data.records)
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
    getScoreYearByID(context: any, payload: any) {
      commonRequest
        .request<DataType>({
          url: `/supplier/findTotalScoreById`,
          method: 'POST',
          params: payload
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSupplier', res.data.data)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    },
    setScoreMonth(context: any, payload: any) {
      commonRequest
        .request<DataType>({
          url: `/supplier/setScoreMonth`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage.success('成功!')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    },
    verifySupplier(context: any) {
      commonRequest
        .request<DataType>({
          url: `/supplier/verifySup`,
          method: 'POST',
          params: {
            supId: context.state.supplierId
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage.success('审核成功')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch((error) => {
          ElMessage.error('请检查网络')
          console.log(error)
        })
    },
    rejectVerify(context: any) {
      commonRequest
        .request<DataType>({
          url: `/supplier/notVerify`,
          method: 'POST',
          params: {
            supId: context.state.supplierId
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage.success('已驳回')
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
    setSuppliers(state: any, suppliers: Array<any>) {
      state.suppliers = suppliers
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setSupplierTfultbsupplier(state: any, tfultbsupplier: any) {
      state.supplier.tfultbsupplier = tfultbsupplier
    },
    setSupplierId(state: any, id: number | string) {
      state.supplierId = id
    },
    setSupplierAttachmentList(state: any, Lists: any) {
      state.supplier.attachmentList = Lists
    },
    setSupplierLists(state: any, Lists: any) {
      state.supplier.Lists = Lists
    },
    setSupplier(state: any, lists: any) {
      state.supplier = lists
    },
    setSupplierStatus(state: any, status: string) {
      state.status = status
    }
  }
}
export default supplier
