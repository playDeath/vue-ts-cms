import { paramsType, DataType, contractDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import { ElMessage } from 'element-plus'
const contractModule: any = {
  namespaced: true,
  state(): contractDataType {
    return {
      contracts: [],
      total: 0,
      contract: null
    }
  },
  actions: {
    getContractLists(context: any, params?: paramsType): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tContract/getList`,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setContracts', res.data.data)
            // context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    getContractById(context: any, id: number): void {
      tableRequest
        .request<DataType>({
          method: 'GET',
          url: `/tContract/getById/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setContract', res.data.data)
            // context.commit('setTotal', res.data.data.total)
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    addContract(context: any, { state }: any) {
      context.commit('setContractState', state)
      commonRequest
        .request<DataType>({
          method: 'POST',
          url: `/tContract/addContact`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.contract
        })
        .then((res) => {
          console.log(context.state.contract)

          console.log(res)
          if (res.data.status === 200) {
            if (state === '草稿') {
              ElMessage.success(`保存${state}草稿`)
            } else {
              ElMessage.success(`合同已生效${state}`)
            }

            // context.commit('setContract', res.data.data)
            // context.commit('setTotal', res.data.data.total)
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
    setContracts(state: any, contracts: Array<any>) {
      state.contracts = contracts
    },
    setTotal(state: any, total: number) {
      state.total = total
    },
    setContract(state: any, contract: any) {
      state.contract = contract
    },
    setContractState(state: any, applystate: string) {
      state.contract.applystatenum = applystate === '草稿' ? 0 : 1
    },
    setContractDoubleTime(state: any, times: Array<any>) {
      state.contract.deliverytime = times[0]
      state.contract.deliverytimeend = times[1]
    }
  }
}
export default contractModule
