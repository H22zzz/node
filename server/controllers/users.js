// 导入操作数据库的方法
const { updateInfo, userInfo, delUser, findByEmailAndPwd, findList, addUser, updateStatus, findSearch, resetPwd } = require('../model/users')
const jwt = require('jsonwebtoken')

// 登录的路由处理函数
async function login(req, res, next) {
  // 接收参数
  const { email, password } = req.body

  // 去数据库比对
  const result = await findByEmailAndPwd(email, password)
  if (result.message === 'error') return next({ code: 405, info: result.info })

  // 判断没有数据
  if (!result.info) return next({ code: 0, message: '用户名密码错误!' })

  // 判断你的 status 是不是允许登录
  if (!result.info.status) return next({ code: 0, message: '账号已被注销, 请联系管理员' })

  // 准备一些生成 token 的信息
  const info = {
    id: result.info._id,
    isAdmin: result.info.isAdmin,
    email: result.info.email
  }

  // 生成 token
  const token = 'Bearer ' + jwt.sign(info, 'guoxiang', { expiresIn: 60 * 60 * 24 * 4 })

  // 返回结果给前端
  res.send(200, {
    id: result.info._id,
    token,
    nickname: result.info.nickname
  })
}

// 获取用户列表的路由处理函数
async function list(req, res, next) {
  // 获取用户列表
  // 返回给前端
  const result = await findList()

  if (result.info.message === 'error') return next({ code: 405, err: result.info })

  // 用户列表返回
  res.send({ message: '获取用户列表成功', code: 1, list: result.info })
}

// 添加用户的路由处理函数
async function add(req, res, next) {
  // 接收参数
  const { email, password, nickname } = req.body

  // 组装用户信息
  const info = {
    email,
    password,
    nickname,
  }

  // 存储到数据库里面
  const result = await addUser(info)

  if (result.message === 'error') return next({ message: '添加用户失败', code: 0 })

  res.send({ message: '添加用户成功', code: 1 })
}

// 修改用户状态的路由处理函数
async function status(req, res, next) {
  // 接收参数
  const { status, id } = req.body

  // 操作数据库修改
  const result = await updateStatus(id, status)

  if (result.message === 'error') return next({ message: '修改用户状态失败', code: 0 })

  // 返回信息
  res.send({ message: '修改用户状态成功', code: 1 })
}

// 模糊搜索的路由处理函数
async function search(req, res, next) {
  // 接收参数
  const { text } = req.query

  // 操作数据库
  const result = await findSearch(text)

  if (result.message === 'error') return next({ code: 405, err: result.info })

  // 返回给前端
  res.send({ message: '查询用户列表成功', code: 1, list: result.info })
}

// 重置密码的路由处理函数
async function reset(req, res, next) {
  const { id } = req.query

  // 操作数据库
  const result = await resetPwd(id)

  if (result.message === 'error') return next({ message: '重置密码失败', code: 0 })

  // 返回结果
  res.send({ message: '重置密码成功', code: 1 })
}

async function del(req, res, next) {
  // 接收参数
  const { id } = req.query

  // 操作数据库
  const result = await delUser(id)

  if (result.message === 'error') return next({ message: '删除用户失败', code: 0 })

  // 返回结果
  res.send({ message: '删除用户成功', code: 1 })
}

// 根据 id 获取用户信息的路由处理函数
async function info(req, res, next) {
  const { id } = req.query

  // 操作数据库查询
  const result = await userInfo(id)

  if (result.message === 'error') return next({ message: '查询用户信息失败', code: 405 })

  // 返回结果
  res.send({ message: '查询用户信息成功', code: 1, info: result.info })
}

async function update(req, res, next) {
  // 接收要修改的对象信息
  const { update } = req
  const { id } = req.body

  // 操作数据库修改
  const result = await updateInfo(id, update)

  if (result.message === 'error') return next({ message: '修改用户信息失败', code: 0 })

  res.send({ message: '修改用户信息成功', code: 1 })
}

module.exports = {
  login,
  list,
  add,
  status,
  search,
  reset,
  del,
  info,
  update
}
