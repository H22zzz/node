$(function () {

  // 1. 判断 localStorage 里面有没有 info 信息
  const info = JSON.parse(window.localStorage.getItem('info'))

  // 验证的是什么 ? 有没有 token
  if (!info) return window.location.href = '/views/login.html'

  // 2. 设置一些信息
  $('.nickname').html(info.nickname)

  // 3. 发送请求请求用户列表
  getUserList()
  async function getUserList() {
    const result = await instance.get('/users/list')

    bindHtml(result, '')
  }

  // 4. 注销登录
  $('.logout').click(function () {
    // 删除掉 localStorage 里面的 info
    // 刷新页面
    window.localStorage.removeItem('info')

    window.location.reload()
  })

  // 5. 渲染页面
  function bindHtml(result, text) {
    $('.content').html(template('usersTmp', { result: result, text }))
  }

  // 6. 添加用户
  $('.content').on('click', '.addUser', async function () {
    const email = $('input[name=email]').val()
    const password = $('input[name=password]').val()
    const nickname = $('input[name=nickname]').val()

    // 非空验证
    if (!email || !password || !nickname) return window.alert('请完整填写表单')

    // 提交
    const result = await instance.post('/users/add', { email, password, nickname })

    if (!result) return

    // 直接重新请求用户列表
    getUserList()
  })

  // 7. 修改用户状态
  $('.content').on('click', '.status', async function () {
    // 拿到两个信息
    const { status, id } = this.dataset

    // 发送请求修改数据
    const result = await instance.put('/users/status', { id, status: status - 0 ? true : false })

    if (!result) return

    // 更新列表
    getUserList()
  })

  // 8. 模糊查询
  $('.content').on('input', '.search', async function () {
    const text = $(this).val().trim()

    // 如果再不去掉空格的情况下一个内容都没有
    // 显示全部
    if ($(this).val().length === 0) getUserList()

    // 判断一下, 如果如掉空格以后时空字符串
    if (!text) return

    // 发送请求, 把关键字带过去
    const result = await instance.get('/users/search', { params: { text } })
    if (!result) return
    bindHtml(result, text)
  })

  // 9. 重置密码
  $('.content').on('click', '.resetPwd', async function () {
    // 拿到记录的自定义属性
    const id = this.dataset.id

    // 询问一下是否确定重置
    if (!window.confirm('您真的要重置该用户的密码吗 ?')) return

    // 发送请求重置密码
    const result = await instance.get('/users/resetPwd', { params: { id } })
    if (!result) return
    getUserList()
  })

  // 10. 删除用户
  $('.content').on('click', '.delUser', async function () {
    // 拿到 id
    const id = this.dataset.id

    // 做一个询问
    if (window.confirm('要删除 xxx 用户吗 ? ')) {
      if (!window.confirm('你真的要删除 xxx 用户吗 ? ')) return
    } else {
      return
    }

    const result = await instance.delete('/users/del', { params: { id } })
    if (!result) return
    getUserList()
  })

  // 11. 进入编辑状态
  $('.content').on('click', '.edit', async function () {
    // 拿到 id
    const id = this.dataset.id

    // 发送请求请求一条数据
    const result = await instance.get('/users/info', { params: { id } })
    if (!result) return

    // 先把编辑盒子渲染好
    $('.dialog')
      .html(template('infoTmp', { info: result.info }))
      .find('[name=rights]').val( result.info.isAdmin ? '超级管理员' : '普通管理员' )
      .end()
      .find('[name=gender]').val( result.info.gender )
      .end()
      .fadeIn()
  })

  // 12. 取消编辑
  $('.dialog').on('click', '.close', () => $('.dialog').fadeOut())

  // 13. 确认编辑
  $('.dialog').on('click', '.updateInfo', async function () {
    // 获取昵称
    const nickname = $('.dialog input[name=nickname]').val().trim()
    const phone = $('.dialog input[name=phone]').val().trim()
    const isAdmin = $('.dialog select[name=rights]').val() === '超级管理员' ? true : false
    const gender = $('.dialog select[name=gender]').val()

    // 拿到 id 信息
    const id = this.dataset.id

    // 发送请求
    const result = await instance.patch('/users/update', { id, nickname, phone, isAdmin, gender })
    if (!result) return

    // 修改成功以后
    getUserList()
    $('.dialog').fadeOut()
  })

})


/*
  进入编辑状态
    1. 点击编辑按钮
    2. 显示编辑盒子
    3. 编辑盒子里面应该添加数据
      => 我们本地有一个数组, 可以从数组里面挑一条显示, 自己写 demo 没有问题
      => 根据用户 id 去请求单一一条数据, 回来显示
*/
