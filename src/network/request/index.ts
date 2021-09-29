import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { LzwRequestConfig, LzwInterceptors } from './type'

class LzwRequest {
  instance: AxiosInstance
  interceptors?: LzwInterceptors
  constructor(config: LzwRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 对实例的请求拦截和响应拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // // 对整个类的请求响应拦截
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     return config
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
    // this.instance.interceptors.response.use(
    //   (res) => {
    //     return res
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
  }
  request<T>(config: LzwRequestConfig): Promise<T> {
    return new Promise((resovle, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          resovle(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default LzwRequest
