$(function () {
  // 0. 全局准备一个变量保存文件信息
  let currentFile = null
  // 准备一个开关
  let flag = true // true 表示走添加, false 表示走 编辑

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

  // 4. 获取轮播图列表
  getBannerList()
  async function getBannerList() {
    // 发送请求
    const result = await instance.get('/banner/list')
    if (!result) return

    bindHtml(result.list)
  }

  // 5. 渲染页面
  function bindHtml(list) {
    $('.content tbody').html(template('bannerTmp', { list }))
  }

  // 6. 显示添加图片的弹出层
  $('.showAdd').click(() => $('.addDialog').addClass('active'))

  // 7. 取消添加轮播图
  $('.addDialog > span').click(() => dialogEnd())

  // 7-1. 关闭 dislog 的时候的函数
  function dialogEnd() {
    $('.addDialog')
      .removeClass('active')
      .find('.img img').prop('src', '../images/upload.jpg') // img 没有地址
      .end()
      .find('input[type=file]').val('') // input 框也置空
      .end()
      .find('input[name=title]').val('') // 把描述那里也置空
      .end()
      .find('p').text('添加轮播图') // 让里面的文字变成添加轮播图
      .end()
      .find('.upload').removeAttr('data-id') // 干掉 button 身上的 自定义属性


    // 把开关重置为 true
    // 下次如果点击添加, 依旧为 true
    // 如果点击编辑, 进入编辑的时候会被改为 false
    flag = true

    // cureentFile 也从新回归到 null
    currentFile = null
  }

  // 8. 本地图片预览
  $('.addDialog > input[type=file]').change(function (e) {
    const file = e.target.files[0]

    // 如果 file 没有内容, 直接返回
    if (!file) return

    if (file.type.search('image') === -1) return

    // 解析图片
    const fd = new FileReader()
    // 把你的 file 文件解析成 base64 编码
    fd.readAsDataURL(file)
    // 绑定一个 fd 的onload 事件
    fd.onload = function () {
      // 打印解析结果 fd.result
      // console.log(fd.result)

      // 把 base64 编码放到 img 的 src 位置
      $('.addDialog .img img').prop('src', fd.result)

      // 给全局变量赋值
      currentFile = file
    }

  })

  // 9. 确认上传
  $('.addDialog .upload').click(async function () {
    // 判断一下有没有图片信息, 如果没有提示

    // 要根据 flag 决定
    if (flag && !currentFile) return window.alert('请选择一张图片')

    // 拿到文本框信息
    const text = $('.addDialog input[name=title]').val()

    // 准备一个 FormData 形式, 上传文件
    const fd = new FormData()
    // 根据 flag 决定
    // flag 为 true (添加) 的时候必须加
    // flag 为 false (编辑) 的时候有就添加, 没有就不添加
    // flag  =>  true  =>  fd
    // flag  =>  false current => true  =>  fd
    // flag  => false  current => false => fd 没有
    // (falg || currentFile) && fd.append('banner', currentFile)
    if (flag) {
      fd.append('banner', currentFile)
    } else {
      currentFile && fd.append('banner', currentFile)
    }

    text && fd.append('text', text.trim())
    !flag && fd.append('id', $(this).data('id'))

    // 发送请求
    // 根据 flag 决定
    const result = await instance.post(`/banner/${ flag ? 'add' : 'update' }`, fd)
    if (!result) return

    // 关闭对话框
    dialogEnd()

    // 重新渲染轮播图列表
    getBannerList()
  })

  // 10. 打开编辑对话框
  $('.content tbody').on('click', '.editBanner', async function () {
    // 拿到 id
    const id = this.dataset.id

    // 根据 id 去请求数据回来渲染
    // 发送一个请求, 根据 id 请求当前轮播图数据
    const result = await instance.get('/banner/info', { params: { id } })
    if (!result) return

    $('.addDialog')
      .find('input[name=title]').val(result.info.img_title)
      .end().find('p').text('编辑轮播图')
      .end().find('.img img').prop('src', 'http://www.shadouyou.com:8080' + result.info.img_url)
      .end().find('.upload').attr('data-id', result.info._id)

    // // 将来提交事件走 编辑
    flag = false

    // // 把对话框打开
    $('.addDialog').addClass('active')
  })
})
