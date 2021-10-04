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
  if (obj !== null) {
    for (const item in ele) {
      if (ele[item]) {
        const temp = [ele[item], obj[item]]
        res.push(temp)
      }
    }
  }
  console.log(res)

  return res
}
