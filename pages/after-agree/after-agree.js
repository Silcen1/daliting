// pages/after-agree/after-agree.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: { 
     flag:true
  },
  show: function () {
    this.setData({
      flag: false
    }) 
  },
  hide: function () {
    this.setData({
      flag: true
    })
  },
  hide:function(event){
    console.log(event)
  },
  fan:function(){
    this.setData({
      flag:true
    })
  },
  sure:function(){
    this.setData({
      flag:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  售后 
    call.getData('/index.php?store_id=1&r=api/order/list&status=0&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token') }) 
  },
  success(res) {
    console.log(res)
    this.setData({
      list: res.data
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