// 导入 multer 插件
const multer = require('multer')
const path = require('path')

// 生成一个仓库信息
const store = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images/'))
  },
  filename (req, file, cb) {
    cb(null, 'banner_' + Math.random().toString().slice(2) + path.extname(file.originalname))
  }
})

// 生成一个接收器
const addBanner = multer({ storage: store })

// 导出接收器
module.exports = {
  addBanner
}
