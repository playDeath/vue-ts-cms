import type { AxiosRequestConfig } from 'axios'
// 对实例传过来的基础config做了封装，使得你可以对整个实例做请求拦截和响应拦截
export interface LzwInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}
export interface LzwRequestConfig extends AxiosRequestConfig {
  interceptors?: LzwInterceptors
}
