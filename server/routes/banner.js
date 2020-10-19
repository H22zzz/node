// 轮播图模块的路由
const router = require('express').Router()

// 导入文件接收器
const { addBanner } = require('../utils/upload')

// 导入验证中间件
const { valiId } = require('../middleware/banner')

// 导入路由处理函数
const { list, add, info, update } = require('../controllers/banner')

// 请求轮播图列表的路由
router.get('/list', list)

// 添加轮播图的路由
router.post('/add', addBanner.single('banner'), add)

// 获取图片信息的路由
router.get('/info', valiId, info)

// 编辑图片的路由
router.post('/update', addBanner.single('banner'), valiId, update)

module.exports = router
