module.exports = function (err, req, res, next) {
  if (err.code === 0) {
    res.send({ message: err.message, code: 0 })
  }

  if (err.status === 401) {
    res.send({ message: '无效 token', code: 401 })
  }
}
