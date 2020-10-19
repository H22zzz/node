// 轮播图相关的验证中间件

function valiId(req, res, next) {
  const id = req.query.id || req.body.id

  if (!id) return next({ message: '请携带 id', code: 0 })

  next()
}

module.exports = {
  valiId
}
