// miniprogram/pages/love/love.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    loveNotes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const db=wx.cloud.database();
    db.collection("note").where({
      love:true
    }).get().then(res=>{
      var newNotes = res.data.map((item, index, arr) => {
        var date = new Date(item.date)
        // console.log(date)
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var time = `${hour}:${minutes}`
        item.time = time
        // console.log(item)
        item.date = new Date(item.date).toLocaleDateString().split("/").join("-")
        return item
      })
      // this.setData({
      //   notes: newNotes,
      //   showData: false,
      //   love: res.data.love,
      //   noteNum: res.data.length
      // })
      this.setData({
        loveNotes: newNotes,
        isShow:true
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  // 编辑页面
  edit(e){
    console.log(e)
    const _id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../edit/edit?id='+_id
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