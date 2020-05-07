Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagName:"",
    title:"",
    content:""
    
  },
  timer:-1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // tagname: "生活"
    const tagName=options.tagname;
    this.setData({
      tagName
    })
  },
  handlerFocus(){
    this.setData({
      place01:""
    })
  },
  // 获取笔记标题
  getTitle(e){
    
    this.setData({
      title: e.detail.value.trim()
    })
  },
  // 获取笔记内容
  getContent(e){
    this.setData({
      content:e.detail.value.trim()
    })
  },
  // 添加笔记
  addNote(){
    
    // 清除定时器
    clearTimeout(this.timer)
    var that=this
    const title = this.data.title;
    const content=this.data.content
    const tag = this.data.tagName
    if (title.length<1){
      wx.showToast({
        title: '标题不能为空',
        icon: 'warn',
        duration: 1000,
        mask: true,
        success:res=>{
          // 重新刷新
          this.setData({
            place01: "请输入标题"
          })
        }
      })
      return false
    }
    if (content.length<1){
      wx.showToast({
        title: '内容不能为空',
        icon: 'wran',
        duration: 1000,
        mask: true,
        success: res => {
          // 重新刷新
          this.setData({
            place02: "让记忆停留此刻"
          })
        }
      })
      return false
    }
    const date = new Date().getTime();
    //这里后续需要更改
    wx.getStorage({
      key: 'info',
      success: function(res) {
        console.log(res)
        const noteId=res.data.noteId;
        const db=wx.cloud.database();
        db.collection("note").add({
          data:{
            content,
            date,
            love:false,
            noteId,
            tag,
            title
          },
          success:res01=>{
            wx.switchTab({
              url: '../tag/tag'
            })
          }
        })
      },
    })
    
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})