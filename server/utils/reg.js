// 正则
const email = /^[a-zA-Z0-9]\w{5,11}@qq\.com$/
const password = /^\w{6,12}$/
const code = /^\d{4}$/
const number = /^\d+$/
const cate = /^(电脑|家具|all)$/

exports.emailReg = (function (reg) {
  return function (val) {
    return reg.test(val)
  }
})(email)

exports.pwdReg = (function (reg) {
  return function (val) {
    return reg.test(val)
  }
})(password)

exports.codeReg = (function (reg) {
  return function (val) {
    return reg.test(val)
  }
})(code)


exports.numberReg = (function (reg) {
  return function (val) {
    return reg.test(val)
  }
})(number)

exports.cateReg = (function (reg) {
  return function (val) {
    return reg.test(val)
  }
})(cate)
