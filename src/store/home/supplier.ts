import { paramsType, DataType, supplierDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const supplier: any = {
  namespaced: true,
  state(): supplierDataType {
    return {
      suppliers: [],
      total: 0,
      supplier: {}
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
    getDetailSupplierById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          url: `/supplier/finSupByID/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit(
              'setSuppilerTfultbsupplier',
              res.data.data.tfultbsupplier
            )
            context.commit(
              'setSuppilerAttachmentList',
              res.data.data.attachmentList
            )
            context.commit('setSuppilerLists', res.data.data.list)
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
    getScoreMonthByID(context: any, payload: any) {
      commonRequest
        .request<DataType>({
          url: `/supplier/findScoreMonthByID`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: payload
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSuppiler', res.data.data)
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
    setSuppilers(state: any, suppliers: Array<any>) {
      state.suppliers = suppliers
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setSuppilerTfultbsupplier(state: any, tfultbsupplier: any) {
      state.supplier.tfultbsupplier = tfultbsupplier
    },
    setSuppilerAttachmentList(state: any, Lists: any) {
      state.supplier.attachmentList = [
        {
          attachmentId: '1',
          attachmentName: '',
          attachmentPath: '',
          attachmentSize: '',
          attachmentTime: '',
          attachmentUser: '',
          filename: '',
          supplierId: ''
        }
      ]
    },
    setSuppilerLists(state: any, Lists: any) {
      state.supplier.Lists = [
        {
          id: '1',
          orgCodeIn: '',
          orgCodeOut: '',
          supplierId: '',
          supplierType: '',
          verifyCode: '',
          verifyResult: '',
          verifyState: '',
          verifyTime: '',
          verifyUser: ''
        }
      ]
    },
    setSuppiler(state: any, lists: any) {
      state.supplier = lists
    }
  }
}
export default supplier
