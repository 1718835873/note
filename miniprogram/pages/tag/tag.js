const db=wx.cloud.database();
const app=getApp();
Page({

  data: {
    tags:[],
    isShow:false,
    num:"",
    picUrl:'',
    tagName:"",
    tagId:"t1",
    pics:[],
    _id:"",
    label:"",
    logoUrl:"",
    states:1,
    count:"",
    isOpen:false,
    type:''
  },

  // 获取所有标签
  getTags(){
    var that=this;
    // const tagId = this.data.tagId
    wx.getStorage({
      key: 'info',
      success: function(res) {
        const tagId=res.data.tagId
        db.collection("tags").where({
          tagId
        }).get().then(res => {
          console.log(res)
          that.setData({
            tags: res.data,
            count: res.data.length
          })
          const count = that.data.count
          wx.setNavigationBarTitle({
            title: `我的标签(${count})`,
          })
        }).catch(err => {
          console.log(err)
        })
        that.setData({
          tagId
        })


      },
    })

    
  },
  onLoad: function (options) {
    console.log(options)
    // 判断是否是我的收藏过来的
    if (options.type){
      this.setData({
        type:options.type
      })
    }
    console.log("type",this.data.type)

    this.getTags();
    // 获取标签列表  :当真正上线的时候将去掉id
    const tagId =this.data.tagId
    db.collection("tagpic").get().then(res => {
      const pics = res.data[0].tagpics
      console.log(pics)
      this.setData({
        pics:pics
      })
    }).catch(err => {
      console.log(err)
    })

    // console.log(this.data.tags)
    
  },
  // 编辑标签
  edtor(e){
    var that = this
    const _id = e.currentTarget.dataset.id
    this.setData({
      isShow: true,
      _id,
      states:2,
      isOpen:false
    })    
  },
  // 删除标签
  del(e){
    var that=this
    const _id=e.currentTarget.dataset.id
    this.setData({
      isOpen:false
    })
    wx.showModal({
      title: '删除标签',
      content: '你确定要删除此标签吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#ccc',
      confirmText: '删除',
      confirmColor: '#f05842',
      success: function(res) {
        if(res.confirm){
          wx.cloud.callFunction({
            name: "deleteTag",
            data: {
              _id
            },
            success: res1 => {
              that.getTags();
              that.setData({
                isOpen:false
              })
            }
          })
        }
      }
    })
    
  },
  // 添加标签
  addTag(){
    // 判断是不是新用户
    const res = wx.getStorage({ key: 'info' })
    console.log(res)
    if (!res) {
      wx.reLaunch({
        url: '../info/info'
      })
      return false;
    }
    this.setData({
      isShow: true,
      states:1
    })
  },
  // 隐藏对话框
  hiden(){
    this.setData({
      isShow: false
    })
  },
  // 获取标签名称
  getTagName(e){
    console.log(e)
    this.setData({
      tagName:e.detail.value
    })
  },
  // 获取图片
  chooseLog(e){
    this.setData({
      num:e.currentTarget.dataset.picitem,
      picUrl: e.currentTarget.dataset.url
    })
    // console.log(e)
  },
  // 确定按钮
  acertain(){
    const tagName = this.data.tagName
    const logoUrl = this.data.picUrl
    const tagId = this.data.tagId
    const _id=this.data._id
    console.log(tagId)
    const num = this.data.num
    console.log(this.data.states)
    // 修改
    if(this.data.states===2){
      // db.collection("tags").doc()



      console.log("修改了")
      wx.cloud.callFunction({
        name:"updateTag",
        data:{
          _id:_id,
         tagName,
         logoUrl,
         num 
        },
        success:res01=>{
          wx.showToast({
            title: '修改标签成功',
            duration: 500,
            mask: true
          })
          this.setData({
            num: "",
            tagName: "",
          })
          this.getTags()
          this.hiden();
          console.log(res01)
        },
        fail:err01=>{
          console.log(err01)
        }
      })
      return false;
    }
    // 添加
    if(this.data.states===1){
      console.log("添加了")
      wx.cloud.callFunction({
        name: "addTags",
        data: {
          tagId,
          tagName,
          logoUrl,
          num
        },
        success: res => {
          wx.showToast({
            title: '添加标签成功',
            duration: 500,
            mask: true
          })
          this.setData({
            num: "",
            tagName: "",
          })
          this.getTags()
          this.hiden();
        },
        fail: err => {
          console.log(err)
        }
      })
      return false;
    }
    
    this.hiden();
  },
  // 取消按钮
  cancel(){
    this.hiden();
    this.setData({
      num:""
    })
  },
  // 书写笔记
  writeNote(options){
    console.log(options)
    const tagName = options.currentTarget.dataset.name;
    if(this.data.type==1){
      wx.navigateTo({
        url: '../style/style?tagname=' + tagName,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.navigateTo({
        url: '../write/write?tagname=' + tagName,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
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