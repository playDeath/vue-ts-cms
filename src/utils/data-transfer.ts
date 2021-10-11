import moment from 'moment'
interface personDataType {
  address: string
  email: string
  idUser: string
  job: string
  name: string
  idEnterprise: string
  roleId: string
  username: string
  phone: string
}
export const objectToArray = (obj: any): Array<any> => {
  const res = []
  const ele: any = {
    address: '地址',
    email: '邮箱',
    idUser: '用户编号',
    job: '职位',
    name: '姓名',
    idEnterprise: '电厂编号',
    roleId: '角色ID',
    username: '用户名',
    phone: '电话号码',
    powerPlants: '电厂名称',
    responsiblePersonId: '负责人编号',
    superiorCompany: '所属分公司'
  }
  const editable: any = {
    address: true,
    email: true,
    username: false,
    phone: true,
    idUser: false,
    job: false,
    name: true,
    idEnterprise: false,
    roleId: false,
    powerPlants: false,
    responsiblePersonId: false,
    superiorCompany: false
  }
  for (const item in obj) {
    if (ele[item]) {
      const temp = [obj[item], ele[item], editable[item], item]
      res.push(temp)
    }
  }
  return res
}
export const arrayToObject = (arr: any): personDataType => {
  const res: any = {
    address: '',
    email: '',
    username: '',
    phone: '',
    idUser: '',
    job: '',
    name: '',
    idEnterprise: '',
    roleId: ''
  }
  for (let i = 0; i < arr.length; i++) {
    res[arr[i][3]] = arr[i][0]
  }
  return res
}
export const objectToArrayTwo = (obj: any, ele: any): Array<any> => {
  const res = []
  if (obj && obj.applystatenum) {
    obj.applystatenum = obj.applystatenum === 1 ? '已完成' : '草稿'
  }
  if (obj && obj.ptAudit) {
    obj.ptAudit = obj.ptAudit === 1 ? '是' : '否'
  }
  if (obj && obj.membertypeid) {
    switch (obj.membertypeid) {
      case '0':
        obj.membertypeid = '临时供应商'
        break
      case '1':
        obj.membertypeid = '一般供应商'
        break
      case '2':
        obj.membertypeid = '重点供应商'
        break
      case '3':
        obj.membertypeid = '内部供应商'
    }
  }
  if (obj) {
    if (Object.keys(obj).length !== 0) {
      for (const item in ele) {
        if (obj[item]) {
          const temp = [ele[item], obj[item]]
          res.push(temp)
        }
      }
    }
  }
  return res
}
function padLeftZero(str: string) {
  return ('00' + str).substr(str.length)
}
export function formatDate(date: Date, fmt: string): string {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }

  return fmt
}
export function getNowFormatDate(): string {
  const date = new Date()
  const seperator1 = '-'
  const seperator2 = ':'
  let month: string | number = date.getMonth() + 1
  let strDate: string | number = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  const currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    'T' +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds()
  return currentdate
}
export const dateFormatterCurrying = (dateType: string) => {
  return (row: any, column: any, cellValue: string): string => {
    return !cellValue ? '' : moment(cellValue).format(dateType)
  }
}
