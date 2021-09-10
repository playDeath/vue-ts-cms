export const rules = {
  username: [
    {
      required: true,
      message: '用户名是必填项',
      trigger: 'change'
    },
    {
      pattern: /^[a-z0-9]{1,10}$/,
      message: '用户名必须在1-10个字符之间',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'change'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字',
      trigger: 'change'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码必须是6位的有效数字',
      trigger: 'blur'
    }
  ]
}
