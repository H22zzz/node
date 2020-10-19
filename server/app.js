const express = require('express')
const cors = require('cors')

const expressJWT = require('express-jwt')

const userRouter = require('./routes/users')
const goodsRouter = require('./routes/goods')
const bannerRouter = require('./routes/banner')

const errFn = require('./middleware/error')

const app = express()

// 挂载 cors
app.use(cors())

// 处理静态资源
app.use('/public', express.static('./public'))

// 配置验证 token
app.use(expressJWT({
  secret: 'guoxiang',
  algorithms: ['HS256']
}).unless({
  path: ['/admin/users/login']
}))

// 解析请求体
app.use(express.urlencoded())
app.use(express.json())

// 挂载路由
app.use('/admin/users', userRouter)
app.use('/admin/goods', goodsRouter)
app.use('/admin/banner', bannerRouter)

// 统一错误处理
app.use(errFn)

app.listen(8080, () => console.log('server running at port 8080 ! ^_^ '))
