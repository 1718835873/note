Page({

  /**
   * 页面的初始数据
   */
  data: {
    cont:"",
    notes:[] ,
    isShow:false                             
  },
  // 获取搜索内容
  searchValue(e){
    console.log(e)
    this.setData({
      cont:e.detail.value.trim()
    })
  },
  // 搜索
  search(){
    var cont=this.data.cont;
    if(cont.length<1){
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 500,
        mask: true
      })
      return false;
    }
    
    const db=wx.cloud.database();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // //重新给数组赋值为空
    // this.setData({
    //   'goodList': []
    // })
    // 数据库正则对象
    db.collection('note').where({
      content: db.RegExp({
        regexp: this.data.cont,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    })
      .get().then(res => {
        // console.log(res.data)
        var newNotes = res.data.map((item, index, arr) => {
          var date = new Date(item.date)
          // console.log(date)
          var hour = date.getHours();
          var minutes = date.getMinutes();
          var time = `${hour}:${minutes}`
          item.time = time
          item.date = new Date(item.date).toLocaleDateString().split("/").join("-")
          return item
        })
        this.setData({
          notes: newNotes,
          isShow:true
        })

          wx.hideLoading();

      }).catch(err => {
        console.error(err)
        wx.hideLoading();
      })
  },
  // 去首页
  index(){
    wx.navigateBack({
      delta: 1,
    })
    this.setData({
      isShow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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