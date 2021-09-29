interface menuItemType {
  id: number
  type: number
  authority_name: string
  children?: []
}
interface loginInfoType {
  token: string
  userInfo: any
  userMenus: Array<any>
  MapTable?: Array<any>
}
export { menuItemType, loginInfoType }
