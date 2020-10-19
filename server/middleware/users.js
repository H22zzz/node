const jwt = require('jsonwebtoken')

// 导入正则
const { emailReg, pwdReg, codeReg } = require('../utils/reg')

// 登录的参数验证
function valiLogin(req, res, next) {
  // 接收参数
  const { email, password, code } = req.body

  // 把 code 放在最后
  // 正则验证
  if (!emailReg(email) || !pwdReg(password)) return next({ code: 0, message: '请按照规则携带参数' })

  next()
}

// 验证超管身份
function valiList(req, res, next) {
  // 拿到 token 去解析一下, 看看信息里面的是不是超管
  const { authorization: token } = req.headers

  // 解析 token
  jwt.verify(token.slice(7), 'guoxiang', (err, data) => {
    if (err) return console.log(err)

    // 判断 isAdmin
    if (!data.isAdmin) return next({ message: '您没有权限执行该操作', code: 0 })

    next()
  })
}

// 验证添加时候的参数
function valiAdd(req, res, next) {
  // 接收参数
  const { email, password, nickname } = req.body

  if (!emailReg(email) || !pwdReg(password) || !nickname) return next({ message: '请完整携带参数', code: 0 })

  next()
}

// 验证修改状态的参数
function valiStatus(req, res, next) {
  // 接收参数
  const { status, id } = req.body

  // 参数验证
  if (typeof status !== 'boolean' || !id) return next({ message: '请完整携带参数', code: 0 })

  next()
}

// 验证搜索参数
function valiSearch(req, res, next) {
  // 接收参数
  const { text } = req.query

  if (!text) return next({ message: '请完整携带参数', code: 0 })

  next()
}

function valiReset(req, res, next) {
  const id = req.query.id || req.body.id

  if (!id) return next({ message: '请完整携带参数', code: 0 })

  next()
}

function valiUpdate(req, res, next) {
  const { phone, gender, isAdmin, nickname } = req.body

  const updateInfo = {}
  if (phone) updateInfo.phone = phone
  if (gender) updateInfo.gender = gender
  if (typeof isAdmin === 'boolean') updateInfo.isAdmin = isAdmin
  if (nickname) updateInfo.nickname = nickname

  // 再这里向 req 这个对象中添加一个成员
  // 从此以后的中间件或者路由处理函数中, req 里面就会有一个 update 的成员
  req.update = updateInfo

  next()
}


module.exports = {
  valiLogin,
  valiList,
  valiAdd,
  valiStatus,
  valiSearch,
  valiReset,
  valiUpdate
}
