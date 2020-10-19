// 准备一个 axios 实例用于发送请求
const instance = axios.create({
  baseURL: 'http://localhost:8080/admin/'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  if (config.url === '/users/login') {
    return config
  } else {
    // 获取到 token ,添加到请求头里面
    const info = JSON.parse(window.localStorage.getItem('info'))

    if (!info) window.location.href = '/views/login.html'
    config.headers.authorization = info.token

    return config
  }
})

// 添加一个响应拦截器
instance.interceptors.response.use(function (response) {
  // 所有请求的响应都会回到响应拦截器
  // 可以再这里统一处理错误
  const { data } = response

  // data 里面得到一个 code === 0 表示本次请求是成功, 但是结果是失败
  if (data.code === 0) return window.alert(data.message)

  // 如果 code === 401. 直接跳转回登录页
  if (data.code === 401) return window.location.href = '/views/login.html'

  // 代码能执行到这里, 表示结果是成功的
  else return data
})
