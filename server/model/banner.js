// 导入 db 模块中的 Banner
const { Banner } = require('../utils/db')

function findAll() {
  return Banner
    .find()
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))
}

function addBanner(img_url, img_title) {
  return new Banner({
    img_url,
    img_title
  })
    .save()
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

function findInfo(id) {
  return Banner
    .findById(id)
    .then(res => ({ message: 'success', info: res }))
    .catch(err => ({ message: 'error', info: err }))
}

function updateBanner(id, img_title, img_url) {
  const info = {}
  img_title && (info.img_title = img_title)
  img_url && (info.img_url = img_url)

  return Banner
    .updateOne({ _id: id }, info)
    .then(res => ({ message: 'success' }))
    .catch(err => ({ message: 'error' }))
}

module.exports = {
  findAll,
  addBanner,
  findInfo,
  updateBanner
}
