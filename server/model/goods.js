// 商品模块的数据库操作
const { Goods } = require('../utils/db')

// 查询商品列表
function getList(pagesize, current, search, cate) {
  // 计算一个开始索引
  const start = (current - 1) * pagesize
  return Goods
    .find({ goods_name: new RegExp(search), goods_cate: new RegExp(cate) }).skip(start).limit(pagesize)
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))
}

module.exports = {
  getList
}
