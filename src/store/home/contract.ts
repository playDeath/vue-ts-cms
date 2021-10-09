import { DataType, contractDataType } from './type'
import { tableRequest, commonRequest } from '@/network'
import emmiter from '@/utils/eventBus'
import { ElMessage } from 'element-plus'
const contractModule: any = {
  namespaced: true,
  state(): contractDataType {
    return {
      contracts: [],
      total: 0,
      contract: null,
      selector: '',
      current: 1,
      size: 5
    }
  },
  actions: {
    getContractListsByCondition(context: any): void {
      tableRequest
        .request<DataType>({
          method: 'POST',
          url: `/tContract/getContractByPage/${context.state.current}/${context.state.size}`,
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            applystatenum: context.state.selector
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setContracts', res.data.data.records)
            context.commit('setTotal', res.data.data.total)
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
            emmiter.emit('getContractDoubleTime', [
              res.data.data.deliverytime,
              res.data.data.deliverytimeend
            ])
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
          console.log(res)
          if (res.data.status === 200) {
            if (state === '1') {
              ElMessage.success(`提交成功`)
              context.commit('setContract', {})
            } else {
              ElMessage.success(`保存草稿成功`)
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
    },
    deleteContractById(context: any, id: number) {
      commonRequest
        .request<DataType>({
          method: 'DELETE',
          url: `/tContract/removeContract/${id}`
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            context.commit('setContract', null)
            ElMessage.success('删除成功!')
            context.dispatch('getContractListsByCondition')
          } else {
            ElMessage.error('出现一些错误')
          }
        })
        .catch(() => {
          ElMessage.error('请检查网络')
        })
    },
    updateContract(context: any, status: string) {
      context.commit('setContractState', status)
      commonRequest
        .request<DataType>({
          method: 'POST',
          url: `/tContract/updateContract`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: context.state.contract
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            ElMessage.success('修改成功!')
            context.dispatch('getContractListsByCondition')
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
    setCurrent(state: any, current: number) {
      state.current = current
    },
    setContractState(state: any, applystate: string) {
      state.contract.applystatenum = applystate
    },
    setContractDoubleTime(state: any, times: Array<any>) {
      state.contract.deliverytime = times[0]
      state.contract.deliverytimeend = times[1]
    },
    setSelector(state: any, flag: number | string) {
      state.selector = flag
    }
  }
}
export default contractModule
