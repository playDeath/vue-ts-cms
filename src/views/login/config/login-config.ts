export const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'change'
    },
    {
      pattern: /^[a-z0-9\u4E00-\u9FFF]{1,15}$/,
      message: '用户名必须在1-15个字符之间',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是不能为空',
      trigger: 'change'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字',
      trigger: 'change'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^\d{5}$/,
      message: '验证码必须是5位的有效数字',
      trigger: 'blur'
    }
  ]
}
export interface DataType {
  data: any
  returnCode: string
  success: boolean
  headers?: any
}
