import LzwRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
let loading: ILoadingInstance
const request1 = new LzwRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      loading = ElLoading.service({
        text: '正在加载中',
        spinner: 'el-icon-view',
        background: 'rgba(0,0,0,0.6)'
      })
      return config
    },
    responseInterceptor(res) {
      loading.close()
      return res
    }
  }
})
export { request1 }
