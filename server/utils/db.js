const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gp19')

// 创建结构
const user = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String, default: '管理员' },
  isAdmin: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now() },
  phone: { type: String },
  gender: { type: String, enum: ['男', '女', '保密'], default: '保密' },
  avatar: { type: String, default: '/public/images/default_avatar.jpg' }
})

// 创建模型
const Users = mongoose.model('users', user)

const banner = new mongoose.Schema({
  img_url: { type: String, required: true },
  img_title: { type: String, default: '一张图片' },
})

const Banner = mongoose.model('banners', banner)

const goods = new mongoose.Schema({
  goods_name: { type: String, required: true },
  goods_desc: { type: String, required: true },
  goods_cate: { type: String, required: true },
  goods_number: { type: Number, required: true },
  goods_url: { type: String, required: true },
  goods_price: { type: String, required: true }
})

const Goods = mongoose.model('goods', goods)


module.exports = {
  Users,
  Banner,
  Goods
}
