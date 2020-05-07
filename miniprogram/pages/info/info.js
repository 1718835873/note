const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"",
    noteId:"",
    sculpture:"",
    tagId:""
  },
  handlerInfo(e){
    wx.showModal({
      title: '获取个人信息',
      content: '小程序将获取您的信息',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#c0c0c0',
      confirmText: '确定',
      confirmColor: 'f80542',
      success: function(res) {
        if(res.confirm){
          const nickname = e.detail.userInfo.nickName
          const sculpture = e.detail.userInfo.avatarUrl
          wx.cloud.callFunction({
            name: "login",
            success: res => {
              console.log(res)
              const appId = res.result.appid
              const noteId = appId
              const tagId = appId
              const data = {
                nickname, noteId, sculpture, tagId
              }
              db.collection("notes").where({
                nickname
              }).get().then(res => {
                console.log(res)
                console.log(res.data)
                if (res.data.length == 1) {
                  console.log("1")
                  console.log(data)
                  wx.setStorage({
                    key: 'info',
                    data: data
                  })
                  wx.switchTab({
                    url: '../index/index',
                  })
                  return false;
                } else {
                  db.collection("notes").add({
                    data: {
                      nickname,
                      noteId,
                      sculpture,
                      tagId
                    }
                  })
                  wx.setStorage({
                    key: 'info',
                    data: data
                  })
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              }).catch(err => {
                console.log(err)
              })

            }
          })
          console.log(e)


        }

      },
      fail: function(res) {},
      complete: function(res) {},
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