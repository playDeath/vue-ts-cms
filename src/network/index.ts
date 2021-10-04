import LzwRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { ElLoading } from 'element-plus'
import CacheControl from '@/utils/cache'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
let loading: ILoadingInstance
let loadingTable: ILoadingInstance
const commonRequest = new LzwRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    Authorization: CacheControl.getCache('token') ?? ''
  },
  interceptors: {
    requestInterceptor(config) {
      loading = ElLoading.service({
        text: '正在加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.6)'
      })
      return config
    },
    responseInterceptor(res) {
      loading.close()
      return res
    },
    responseInterceptorCatch(res) {
      loading.close()
      return res
    }
  }
})
const tableRequest = new LzwRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    Authorization: CacheControl.getCache('token')
  },
  interceptors: {
    requestInterceptor(config) {
      loadingTable = ElLoading.service({
        text: '加载中',
        spinner: 'el-icon-loading',
        target: document.querySelector('.el-table-self') as HTMLElement
      })
      return config
    },
    responseInterceptor(res) {
      loadingTable.close()
      return res
    },
    responseInterceptorCatch(res) {
      loadingTable.close()
      return res
    }
  }
})
export { commonRequest, tableRequest }
