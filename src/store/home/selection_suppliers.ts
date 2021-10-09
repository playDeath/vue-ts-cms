import { DataType, selectionSupplierDateType } from './type'
import { tableRequest } from '@/network'
import { ElMessage } from 'element-plus'
const selectionSupplierModule: any = {
  namespaced: true,
  state(): selectionSupplierDateType {
    return {
      selectionSuppliers: [],
      total: 0,
      selectionSupplier: null,
      current: 1,
      size: 6
    }
  },
  actions: {
    getSelectionSuppliers(context: any) {
      tableRequest
        .request<DataType>({
          url: `/tFultbwinbidding/getListByPage/${context.state.current}/${context.state.size}`,
          method: 'POST'
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setSelectionSuppilers', res.data.data.records)
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
    changeToWinSupplier(context: any, supplier: any) {
      console.log(supplier)

      supplier.isBid = 1
      tableRequest
        .request<DataType>({
          url: `/tFultbwinbidding/updateBid`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: supplier
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage.success('确认成功！')
            context.dispatch('getSelectionSuppliers')
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
    setSelectionSuppilers(state: any, suppliers: Array<any>) {
      state.selectionSuppliers = suppliers
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setSuppilerTfultbsupplier(state: any, tfultbsupplier: any) {
      state.supplier.tfultbsupplier = tfultbsupplier
    },
    setSuppiler(state: any, lists: any) {
      state.supplier = lists
    }
  }
}
export default selectionSupplierModule
