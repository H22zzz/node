$(function () {
  // 1. 判断 localStorage 里面有没有 info 信息
  const info = JSON.parse(window.localStorage.getItem('info'))

  // 验证的是什么 ? 有没有 token
  if (!info) return window.location.href = '/views/login.html'

  // 2. 设置一些信息
  $('.nickname').html(info.nickname)

  // 3. 注销登录
  $('.logout').click(function () {
    // 删除掉 localStorage 里面的 info
    // 刷新页面
    window.localStorage.removeItem('info')

    window.location.reload()
  })


  /*
    业务逻辑
      + 分析业务需求
      + 需要渲染表格
        => 数据需要根据其他内容来决定
        => 分类: 所有 电脑 家具
        => 模糊查询: 没有关键字 有关键字
        => 一页多少条: 12  18  20
        => 当前第几页: 1  ...
      + 请求列表数据
        => 需要携带这些参数的
        => 打开页面的时候, 参数: 所有 没有关键字 12 1
        => 当切换第几页, 参数: 所有 没有关键字 12 2
        => 当切换一页多少条, 参数: 所有 没有关键字 18 1
        => 当我切换分类, 参数: 电脑 没有关键字 18 1
        => ...

    代码实现
      1. 准备一个对象
        => cate: 'all', // '电脑', '家具'
        => current: 1, // 2 3 4 ...
        => pagesize: 12, // 18, 20
        => search: '', // 关键字
      2. 封装请求的函数 (getGoodsList)
        => 以这个对象作为参数携带到后端
      3. 各种操作
        => 当我切换第几页的时候, 把 对象 里面的 current 改变, 执行 getGoodsList
  */

  // 0. 准备一个请求对象
  const listInfo = {
    current: 1, // 当前第几页
    pagesize: 12, // 一页显示多少条
    search: '', // 模糊查询关键字
    cate: 'all', // 分类查询
    total: 9, // 总页数
  }

  // 1. 封装一个函数
  getGoodsList()
  async function getGoodsList() {
    // 根据 listInfo 发送请求
    const result = await instance.post('/goods/list', listInfo)
    if (!result) return

    console.log(result)
  }

  // 2. 给分类下拉列表绑定事件
  $('.content .filter select').change(function () {
    // 当分类下拉列表改变的时候
    // 拿到当前分类下拉列表改变成了什么
    // 给 listInfo 里面的 cate 成员赋值
    listInfo.cate = this.value

    // 当前页要回到第一页
    listInfo.current = 1

    // 再次去请求数据
    getGoodsList()
  })

  // 3. 给搜索框绑定事件
  $('.content .filter .search').on('input', function () {
    // 拿到文本框内输入的内容
    // 给 listInfo 里面的 search 赋值
    listInfo.search = this.value

    // 每次筛选都要回到第一页显示
    listInfo.current = 1

    // 再次去请求数据
    getGoodsList()
  })

  // 4. 给一页显示多少条的下拉列表绑定事件
  $('.content .pagination select').change(function () {
    // 拿到改变后的内容 赋值给 listInfo 里面的 pagesize
    listInfo.pagesize = this.value - 0

    // 每次切换都要回到第一页显示
    listInfo.current = 1

    // 重新请求数据
    getGoodsList()
  })

  // 5. 给首页按钮绑定事件
  $('.content .first').click(function () {
    // 回归到第一页
    // 当前不是第一页的时候回归
    if (listInfo.current === 1) return

    listInfo.current = 1
    // 从新请求
    getGoodsList()
  })

  // 6. 给上一页绑定事件
  $('.content .prev').click(function () {
    // 判断如果不是第一页, --
    if (listInfo.current === 1) return

    listInfo.current--

    // 从新请求数据
    getGoodsList()
  })

  // 7. 给下一页绑定事件
  $('.content .next').click(function () {
    // 判断一下当前页是不是最后一页
    if (listInfo.current === listInfo.total) return

    listInfo.current++

    // 从新请求数据
    getGoodsList()
  })

  // 8. 给最后一页绑定事件
  $('.content .last').click(function () {
    // 判断当前页是不是最后一页, 如果是什么页不做
    if (listInfo.current === listInfo.total) return

    listInfo.current = listInfo.total

    // 从新请求数据
    getGoodsList()
  })

  // 9. 跳转到某一个的事件
  $('.content .go').keydown(function (e) {
    if (e.keyCode !== 13) return

    // 拿到文本框里面的内容
    let num = this.value

    // 判断你输入的数字是不是再 1 和 total 之间
    if (num <= 1) num = 1
    if (num >= listInfo.total) num = listInfo.total

    // 修改 listInfo 里面的 current
    listInfo.current = num

    // 从新请求数据
    getGoodsList()
  })

  // 10. 点击某一页的事件
  $('.content .item_list').on('click', 'li', function () {
    // 如果 li 身上有 active 类名, 就什么也不执行了
    if ($(this).hasClass('active')) return

    // 拿到当前 li 表示第几页
    listInfo.current = this.dataset.index - 0

    // 从新请求页面
    getGoodsList()
  })

})
