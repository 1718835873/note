// components/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nav:{
      type:Array,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangeItem(event){
      this.triggerEvent("handleChangeF",event.currentTarget.dataset.index)
    }
  }
})
