// 引入 db 模块
const { Goods } = require('../utils/db')

// superagent cheerio
const superagent = require('superagent')
const cheerio = require('cheerio')

const url = 'https://coll.jd.com/list.html?sub=52363&ev=exbrand_3479&JL=3_%E5%93%81%E7%89%8C_%E5%AE%89%E8%80%8C%E5%BA%B7%EF%BC%88Elderjoy%EF%BC%89'

// 请求页面
superagent.get(url).end(function (err, res) {
  if (err) return console.log('获取页面失败')

  parseData(res.text)
})

function parseData(data) {

  // 使用 cheerio 解析数据
  const $ = cheerio.load(data)

  // 组装数据
  $('ul.gl-warp li.gl-item').each((index, item) => {
    // item 就是每一个 li
    const obj = {
      goods_name: $(item).find('.p-name em').text(),
      goods_desc: $(item).find('.p-name i').text() || '我是一段描述',
      goods_cate: '母婴',
      goods_number: parseInt(Math.random() * 11 + 90),
      goods_url: $(item).find('.p-img img').prop('src'),
      goods_price: $(item).find('.p-price i').text()
    }

    // 每一个 obj 需要存储起来
    console.log(obj)

    // new Goods(obj)
    //   .save()
    //   .then(res => console.log('存储成功'))
    //   .catch(err => console.log(err))
  })


}
