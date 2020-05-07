const db=wx.cloud.database();
const app = getApp()

Page({
  data: {
    openid:"",
    showData:false,
    notes:[],
    noteNum:0,
    nickname:""
  },
  // 去设置页面
  set() {
    wx.navigateTo({
      url: '../set/set'
    })
  },
  // 跳转到搜索页面
  // 去搜索页面
  Search(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 去编辑页面
  edit(e){
    console.log(e)
    const _id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../edit/edit?id='+_id
    })
  },
  getNoteList(){
    var that = this
    // 根据Nickname获取 id
    wx.getStorage({
      key: 'info',
      success: function (res) {
        const noteId = res.data.noteId;
        db.collection("note").where({
          noteId
        }).get().then(res => {
          console.log(res.data.length)
          if (res.data.length < 1) {
            that.setData({
              showData: true
            })
          } else {
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
            that.setData({
              notes: newNotes,
              showData: false,
              love: res.data.love,
              noteNum: res.data.length
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
    })
  },
  onLoad: function() {
    var that=this
    // 根据Nickname获取 id
    wx.getStorage({
      key: 'info',
      success: function(res) {
        const noteId=res.data.noteId;
        db.collection("note").where({
            noteId
          }).get().then(res => {
          console.log(res.data.length)
          if (res.data.length < 1) {
            that.setData({
              showData: true
            })
          } else {
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
            that.setData({
              notes: newNotes,
              showData: false,
              love: res.data.love,
              noteNum: res.data.length
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
    })


    
  },
  // 搜藏
  love(e){
    const _id=e.currentTarget.dataset.id;
    db.collection('note').doc(_id).get().then(res=>{
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
    }).catch(err=>{
      console.log(err)
    })
  },
  // 删除
  del(e){
    console.log(e)
    var that=this
    const _id = e.currentTarget.dataset.id
    console.log(_id)
    wx.showModal({
      title: '删除',
      content: '您确定要删除吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#ccc',
      confirmText: '删除',
      confirmColor: '#f05842',
      success: function(res) {
        if (res.confirm){
          console.log(_id)

          wx.cloud.callFunction({
            name: "removeNote",
            data: {
              _id
            },
            success: res1 => {
              that.getNoteList();
            },
            fail:err1=>{
              console.log(err1)
            }
          })

        }
      }
    })
  },
  onShow:function(){
    var that = this
    // 根据Nickname获取 id
    wx.getStorage({
      key: 'info',
      success: function (res) {
        const noteId = res.data.noteId;
        db.collection("note").where({
          noteId
        }).get().then(res => {
          console.log(res.data.length)
          if (res.data.length < 1) {
            that.setData({
              showData: true
            })
          } else {
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
            that.setData({
              notes: newNotes,
              showData: false,
              love: res.data.love,
              noteNum: res.data.length
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
    })
  }

})
