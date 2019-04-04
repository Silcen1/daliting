// pages/bargain-err/bargain-err.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //  普通订单
    call.getData('/index.php?store_id=1&r=api/order/list&status=0&_version=2.8.9&_platform=wx', this.success1, this.fail, { access_token: wx.getStorageSync('access_token') }) 

    // 砍价订单
    call.getData('/index.php?store_id=1&r=api/bargain/default/goods&goods_id=6&page=1&_version=2.8.9&_platform=wx', this.success2, this.fail, { access_token: wx.getStorageSync('access_token') }) 
  },
  success1(res) {
    console.log(res)
    this.setData({
      list: res.data
    })
  },
  success(res) {
    console.log(res)
    this.setData({
      bargain: res.data
    })
  },
  fail() {
    consloe.log('接收失败')
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