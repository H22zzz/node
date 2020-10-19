// 商品列表的路由
const router = require('express').Router()

// 导入验证中间件
const { valiList } = require('../middleware/goods')

// 导入数据库操作函数
const { getList } = require('../model/goods')

// 获取商品列表
router.post('/list', valiList, async (req, res, next) => {
  const { pagesize, current, search, cate } = req.body

  console.log(cate)

  // 操作数据库去查询了
  const result = await getList(pagesize, current, search, cate)

  if (result.message === 'error') return next({ code: 405, err: result.info })


  // 计算一下一共多少页
  // 再次查询一次一共数据库里面多少条
  res.send({ message: '查询商品列表成功', code: 1, list: result.info})
})

module.exports = router
