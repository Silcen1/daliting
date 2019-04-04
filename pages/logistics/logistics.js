// pages/logistics/logistics.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    time:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id=options.order_id;
    call.getData('/index.php?store_id=1&r=api/order/express-detail&type=mall', this.success, this.fail, { order_id: order_id, access_token: wx.getStorageSync('access_token') })
  },
  success(res) {
    var arr = []
    var obj = {}
    for (var key in res.data.list) {
      var dd = res.data.list[key].datetime
      obj.date = dd.substring(5, 10)
      obj.time = dd.substring(11, 16)
      obj.detail = res.data.list[key].detail;
      obj.memo = res.data.list[key].memo
      arr.push(obj)
    }
    this.setData({
      list:res.data,
      time:arr
    })
  },
  fail(){
    console.log('接收失败')
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