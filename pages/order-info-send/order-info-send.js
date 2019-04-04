// pages/order-info-send/order-info-send.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    shop_info:[],
    order_id:''
  }, 
  go_shop(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../store-admin/store-admin?mch_id=' + id,
    })
  },
  go_logistics: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../logistics/logistics?order_id='+id,
    })
  },
  quit(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否申请退款？',
      success: function (sm) {
        if (sm.confirm) {
          call.getData('/index.php?store_id=1&r=api/order/revoke', that.success3, that.fail, { access_token: wx.getStorageSync('access_token'), order_id: id })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (options) {
    var order_id = options.order_id;
    this.setData({ order_id: options.order_id})
    //  待发货订单
    call.getData('/index.php?store_id=1&r=api/order/detail&route=pages%2Forder%2Forder&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id }) 
    call.getData('/index.php?store_id=1&r=api/order/list&status=1&_version=2.8.9&_platform=wx', this.success2, this.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
  },
  success(res) {
    console.log(res)
    this.setData({
      list: res.data
    })
  },
  success2(res) {
    console.log(res)
    for(var key in res.data.list){
      if (res.data.list[key].order_id == this.data.order_id) {
          this.setData({
            shop_info: res.data.list[key]
          })
      }
    }
  },
  success3(res){
    wx.showToast({
      title: res.msg,
      icon:'none',
      duration:2000
    })
    call.getData('/index.php?store_id=1&r=api/order/list&status=1&_version=2.8.9&_platform=wx', this.success2, this.fail, { access_token: wx.getStorageSync('access_token'), order_id:this.data.order_id })
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