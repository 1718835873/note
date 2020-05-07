const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toggleShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏
    hiden() {
      this.setData({
        isShow:false
      })
    }
  }
})
