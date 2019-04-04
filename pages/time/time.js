// pages/time/time.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownHour: 0, //倒计时 -时
    countDownMinute: 0,  //倒计时 -分
    countDownSecond: 0,  //倒计时-秒
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置倒计时时间，1s变换一次
    var interval = setInterval(function () {
      var d = new Date();   //获取系统日期和时间
      var nowHour = d.getHours(); //小时
      var nowMinutes = d.getMinutes(); //分
      var nowSeconds = d.getSeconds(); //秒

      // 显示在倒计时中的小时位
      var hour = 24 - nowHour;

      // 显示在倒计时中的分钟位
      var minutes = 60 - nowMinutes;

      // 显示在倒计时中的秒数
      var seconds = 60 - nowSeconds;


      //当小时、分钟、秒都为0时，活动结束，倒计时显示为00:00:00
                           if (hour == 0 && minutes == 0 && seconds == 0) {

        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        console.log(totalSecond);

        this.setData({
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }


      //当小时位、分钟位、秒位小于10时，用字符串拼接的方式显示，例如：06:08:02

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.setData({
        countDownHour: hour,
        countDownMinute: minutes,
        countDownSecond: seconds,
      });
    }.bind(this), 1000);
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