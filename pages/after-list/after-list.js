// pages/after-list/after-list.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据  
   */
  data: {
    type:0,
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
  wtite_logistics:function(){
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },
  select_btn:function(e){
    var type=e.currentTarget.dataset.id;
    this.setData({type:type})
  
  },
  nav_store:function(){
    wx.showToast({ 
      title: '撤销成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  go:function(){
    wx.navigateTo({
      url: '../../pages/after-loading/after-loading',
    })
  },
  load:function(){
    wx.navigateTo({
      url: '../after-agree/after-agree',
    })
  },
  succ:function(){
    wx.navigateTo({
      url: '../../pages/refund-start/refund-start',
    })
  },
  close:function(){
    wx.navigateTo({
      url: '../../pages/refund-end/refund-end',
    })
  },


  onLoad: function (options) {
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