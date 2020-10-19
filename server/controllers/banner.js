// 轮播图模块的路由处理函数
// 导入轮播图数据库操作模块
const { findAll, addBanner, findInfo, updateBanner } = require('../model/banner')

async function list(req, res, next) {
  // 操作数据库查询
  const result = await findAll()

  if (result.message === 'error') return next({ err: result.info, code: 405 })

  // 返回前端结果
  res.send({ message: '获取轮播图列表成功', code: 1, list: result.info })
}

async function add(req, res, next) {
  const { text } = req.body
  const { file } = req

  // 组装一个路径信息
  const img_url = '/public/images/' + file.filename

  // 存储到数据库
  const result = await addBanner(img_url, text)

  if (result.message === 'error') return next({ message: '添加图片失败', code: 0 })

  res.send({ message: '添加图片成功', code: 1 })
}

// 获取图片信息的 路由
async function info(req, res, next) {
  const { id } = req.query

  // 操作数据库
  const result = await findInfo(id)

  if (result.message === 'error') return next({ code: 405, err: result.info })

  res.send({ message: '获取图片信息成功', code: 1, info: result.info })
}

async function update(req, res, next) {
  // 拿到文件和 id 和 text
  const { id, text } = req.body
  const { file } = req

  const img_url = file ? '/public/images/' + file.filename : undefined

  // 操作数据库去编辑
  const result = await updateBanner(id, text, img_url)

  if (result.message === 'error') return next({ message: '修改轮播图失败', code: 0 })

  res.send({ message: '修改轮播图成功', code: 1 })
}

module.exports = {
  list,
  add,
  info,
  update
}
