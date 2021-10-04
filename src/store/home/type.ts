export interface paramsType {
  current: number
  size: number
  bodyParams?: any
}
export interface DataType {
  data: any
  returnCode: string
  success: boolean
  headers?: any
  status?: number
}
export interface purchaseApplyDataType {
  purchaseLists: any
  total: number
  purchaseId: string
  selector: string
  purchaseList: any
}
export interface supplierDataType {
  suppliers: any
  total: number
  supplier: any
}
export interface depositDataType {
  deposits: any
  total: number
  deposit: any
}
export interface contractDataType {
  contracts: any
  total: number
  contract: any
}
export interface userDataType {
  users: any
  total: number
  user: any
}
