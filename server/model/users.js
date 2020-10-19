const { Users } = require('../utils/db')

// 根据用户名和密码查询用户
function findByEmailAndPwd(email, password) {
  return Users
    .findOne({ email, password })
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))
}

// 获取用户列表
function findList() {
  return Users
    .find()
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))
}

// 添加用户
function addUser(info) {
  return new Users(info)
    .save()
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

// 修改用户状态
function updateStatus(id, status) {
  return Users
    .findByIdAndUpdate(id, { status })
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

function findSearch(text) {
  return Users
    .find({ email: new RegExp(text) })
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))

}

function resetPwd(id) {
  return Users
    .findByIdAndUpdate(id, { password: '223322' })
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

function delUser(id) {
  return Users
    .findByIdAndDelete(id)
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

function userInfo(id) {
  return Users
    .findById(id)
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))
}

function updateInfo(id, info) {
  return Users
    .findByIdAndUpdate(id, info)
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

module.exports = {
  findByEmailAndPwd,
  findList,
  addUser,
  updateStatus,
  findSearch,
  resetPwd,
  delUser,
  userInfo,
  updateInfo
}


/*
  正则表达式
    /123/  表示字符串里面包含 123 这个字符片段就可以

  组装正则
    '/' + text + '/'  =>   '/123/'   不好使
    new RegExp(text)  =>   /123/    好使
*/
