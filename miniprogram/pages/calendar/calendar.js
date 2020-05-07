// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:[],
    month:"",
    year:"",
    monthAndDay:"",
    rizi:"",
    current:""
  },
  lastMonth(){
    console.log("上一月")
    let year=this.data.year;
    let month=this.data.month;
    month=month-1
    if(month==0){
      year=year-1
      month=12
    }
    this.setData({
      month:month,
      year:year
    })
    console.log(month)
    console.log(year)
    const days=this.getDays(year,month)
    this.setData({
      day:days,
    })
  },
  nextMonth(){
    console.log("下一月")
    let year = this.data.year;
    let month = this.data.month;
    month = month +1
    if (month == 0) {
      year = year + 1
      month = 1
    }
    this.setData({
      month: month,
      year: year
    })
    console.log(month)
    console.log(year)
    const days = this.getDays(year, month)
    this.setData({
      day: days
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getDate=new Date();;
    var countArr=[]
    var year = getDate.getFullYear();
    console.log(year)
    var month = parseInt(getDate.getMonth())+1;
    console.log(month)
    var day = getDate.getDate()
    var countArr=this.getDays(year,month)
    var newArr = this.getDays(year, month)
    for(var i=0;i<newArr.length;i++){
      if(newArr[i]===day){
        this.setData({
          current: "currentday"
        })
      }else{
        this.setData({
          current: ""
        })
      }
    }
    console.log(countArr)
    this.setData({
      day: countArr,
      month:month,
      monthAndDay: `${month}月${day}日`,
      year: year
    })
  },
  getDays(year,month){
    var countArr = []
    var day_tep = 0;
    const currentDate=new Date().getDate();//获取当前天数
    console.log("日期",currentDate)
    var days = new Array();
    var time = new Date(year, month, 0);//当前月最后一天
    console.log("time", time)
    var dayInMonth = time.getDate();//一个月有多少天
    console.log("dayInMonth:", dayInMonth)
    var firstDay = new Date(year, month - 1, 1);
    var weekDay = firstDay.getDay(); //获取当月第一天是周几
    //一个月有几个星期,向上取整
    var weeks = Math.ceil((dayInMonth + weekDay) / 7);
    for (var i = 0; i < weeks; i++) {//i为一个月的第几周
      days[i] = new Array();
      for (var j = 0; j < 7; j++) {//j代表星期几
        if ((i == 0 & j >= weekDay) || (i > 0 & day_tep < dayInMonth)) {
          day_tep++;
          days[i][j] = day_tep;
          if (days[i][j] == currentDate){
            
          }
          console.log(days[i][j])
          countArr.push(days[i][j])
        } else {
          days[i][j] = "";  //添加空白
          console.log(days[i][j]);
          countArr.push(days[i][j])
        }
      }
    }
    return countArr;
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