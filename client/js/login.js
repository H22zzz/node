$(function () {

  // 1. 表单验证
  $('#login').validate({
    // 表单验证的规则
    rules: {
      email: 'required',
      password: 'required',
      // code: 'required'
    },
    // 提示内容
    messages: {
      email: '请填写您的邮箱',
      password: '请输入密码',
      // code: '请填写验证码'
    },
    submitHandler () {
      const email = $('input[name=email]').val() + '@qq.com'
      const password = $('input[name=password]').val()
      // 2. 进行登录操作
      instance
        .post('/users/login', { email, password })
        .then(res => {
          // 判断一下 res 不是 undefined 继续操作
          if (!res) return

          // 登录成功
          // 把 token 存储起来
          // 把 nickname 页存储起来
          window.localStorage.setItem('info', JSON.stringify(res))

          // 跳转页面
          window.location.href = '/index.html'
        })
    }
  })

  // 2. 发送验证码 - 放在项目的最后

})
