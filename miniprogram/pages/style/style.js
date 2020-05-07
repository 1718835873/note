const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagName:"",
    showData:true,
    notes:[],
    noteNum:""
  },
  getNoteList(){
    const tagName=this.data.tagName;
    db.collection("note").where({
      tag: tagName
    }).get().then(res => {
      console.log(res)
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
      this.setData({
        notes: newNotes,
        showData: false,
        noteNum: res.data.length
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const tagName=options.tagname;
    this.setData({
      tagName
    })
    db.collection("note").where({
      tag:tagName
    }).get().then(res=>{
      console.log(res)
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
      const count = res.data.length
      wx.setNavigationBarTitle({
        title: `${tagName}(${count})`,
      })
      if(count==0){
        this.setData({
          showData:true
        })
        return false
      }
      this.setData({
        notes: newNotes,
        showData: false,
        noteNum: count
      })
    })


  },
  // 搜藏
  love(e) {
    const _id = e.currentTarget.dataset.id;
    db.collection('note').doc(_id).get().then(res => {
      var love = !(res.data.love)
      wx.cloud.callFunction({
        name: "updateLove",
        data: {
          _id: _id,
          love: love
        },
        success: res => {
          console.log(res)
          this.getNoteList();
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 去编辑页面
  edit(e) {
    console.log(e)
    const _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../edit/edit?id=' + _id
    })
  },
  // 写Note
  write(){
    const tagname=this.data.tagName
    wx.redirectTo({
      url: '../write/write?tagname=' + tagname
    })
  },
  tag(){
    wx.reLaunch({
      url: '../tag/tag',
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
    this.getNoteList();
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