// 导入正则
const { numberReg, cateReg } = require('../utils/reg')

// 商品列表的验证中间件
function valiList(req, res, next) {
  // 接收参数
  const { pagesize, current, search, cate } = req.body

  // 验证
  if (!(
    cateReg(cate) ||
    numberReg(current) ||
    cate === undefined ||
    numberReg(pagesize) ||
    search === undefined ||
    current === undefined ||
    pagesize === undefined
    )) return next({ message: '请按照规则携带参数', code: 0 })

  // 把数据处理号再给到路由处理函数, 这样路由处理函数就可以直接用
  if (pagesize === undefined) req.body.pagesize = 12
  if (current === undefined) req.body.current = 1
  if (cate === 'all') req.body.cate = ''

  next()
}

module.exports = {
  valiList
}
