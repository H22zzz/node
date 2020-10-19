const router = require('express').Router()

// 导入中间件
const { valiUpdate, valiLogin, valiList, valiAdd, valiStatus, valiSearch, valiReset } = require('../middleware/users')

// 导入控制器
const { login, list, add, status, search, reset, del, info, update } = require('../controllers/users')

// 登录的请求
router.post('/login', valiLogin, login)

// 获取用户列表
//   需要验证用户身份
//   能来到这里, 表示你的 token 是对的, 但是你不一定是超管
//   如果你不是超管, 不能给你用户列表
router.get('/list', valiList, list)

// 添加用户的请求
router.post('/add', valiList, valiAdd, add)

// 修改用户状态
router.put('/status', valiList, valiStatus, status)

// 模糊查询的请求
router.get('/search', valiList, valiSearch, search)

// 重置密码的请求
router.get('/resetPwd', valiList, valiReset, reset)

// 删除用户的请求
router.delete('/del', valiList, valiReset, del)

// 根据 id 获取用户信息的请求
router.get('/info', valiList, valiReset, info)

// 修改用户信息
router.patch('/update', valiList, valiReset, valiUpdate, update)


module.exports = router
