// miniprogram/pages/edit/edit.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagName: "",
    title: "",
    content: "",
    love:"",
    _id:""
  },
  timer: -1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const _id=options.id
    db.collection("note").doc(_id).get().then(res=>{
      this.setData({
        _id:_id,
        tagName:res.data.tag,
        content:res.data.content,
        love: res.data.love,
        title: res.data.title
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },

  handlerFocus() {
    this.setData({
      place01: ""
    })
  },
  // 获取笔记标题
  getTitle(e) {
    this.setData({
      title: e.detail.value.trim()
    })
  },
  // 获取笔记内容
  getContent(e) {
    this.setData({
      content: e.detail.value.trim()
    })
  },
  // 搜藏
  love() {
    const _id = this.data._id
    db.collection('note').doc(_id).get().then(res => {
      var love = !(res.data.love)
      wx.cloud.callFunction({
        name: "updateLove",
        data: {
          _id: _id,
          love: love
        },
        success: res => {
          this.setData({
            love:love
          })
          console.log(res)
          // this.getNoteList();
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 删除
  del(){
    var _id=this.data._id;
    wx.showModal({
      title: '删除',
      content: '您确定要删除吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#ccc',
      confirmText: '删除',
      confirmColor: '#f05842',
      success: function (res) {
        if (res.confirm) {
          console.log(_id)

          wx.cloud.callFunction({
            name: "removeNote",
            data: {
              _id
            },
            success: res1 => {
              // that.getNoteList();
              wx.navigateBack({
                delta: 1,
              })
            },
            fail: err1 => {
              console.log(err1)
            }
          })

        }
      }

    })



  },
  // 更新
  edit(){
    const {_id,title,content,love}=this.data;
    console.log(_id)
    wx.cloud.callFunction({
      name:"updatenotes",
      data:{
        _id,
        title,
        content,
        love
      },
      success:res=>{
        wx.showToast({
          title: '更新成功',
          duration: 500,
          mask: true,
          success:res01=>{
            wx.navigateBack({
              delta: 1,
            })
          }
        })
        console.log(res)
      }

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