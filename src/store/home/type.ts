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
  doubleDatePicker: Array<string>
  current: number
  size: number
}
export interface supplierDataType {
  suppliers: any
  total: number
  supplier: any
  supplierId: number | string
}
export interface depositDataType {
  deposits: any
  total: number
  deposit: any
  depositId: any
  freezeStatus: string | number
  supplier: string
  purchapplyid: string
  current: number
  size: number
}
export interface contractDataType {
  contracts: any
  total: number
  contract: any
  selector: number | string
  current: number
  size: number
}
export interface userDataType {
  users: any
  total: number
  user: any
}
export interface purchaseExcutionDataType {
  excutions: any
  total: number
  excution: any
  current: number
  size: number
  expressNumber: string
  status: string
}
export interface newsDataType {
  newsLists: any
  total: number
  newsList: any
  createUser?: string
  newsColumn?: string
  newsTitle: string
  newsType: string
  current: number
  size: number
}
export interface selectionSupplierDateType {
  selectionSuppliers: any
  total: number
  selectionSupplier: any
  current: number
  size: number
}
