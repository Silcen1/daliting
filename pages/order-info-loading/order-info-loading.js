// pages/order-info-loading/order-info-loading.js
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
  go_logistics: function (e) {
    var order_id = this.data.order_id;
    wx.navigateTo({
      url: '../logistics/logistics?order_id='+order_id,
    })
  },
  confirm() {
    var order_id = this.data.order_id;
    var that=this;
    wx.showModal({
      title: '提示',
      content: '是否确认收货？',
      success: function (sm) {
        if (sm.confirm) {
          call.getData('/index.php?store_id=1&r=api/order/confirm', that.success3, that.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id;
    this.setData({
      order_id:order_id
    })
    //  待收货订单
    call.getData('/index.php?store_id=1&r=api/order/detail&route=pages%2Forder%2Forder', this.success, this.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
    call.getData('/index.php?store_id=1&r=api/order/list&status=1', this.success2, this.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
  },
  success(res) {
    console.log(res)
    this.setData({
      list: res.data
    })
  },
  success2(res) {
    console.log(res)
    this.setData({
      shop_info: res.data.list
    })
  },
  success3(res){
    if(res.code==0){
      wx.showToast({
        title: '确认收货！',
        icon:'success',
        duration:2000,
        success(){
          setTimeout(()=>{
            wx.navigateBack({})
          },1000)
        }
      })
    }
  },
  fail() {
    consloe.log('接收失败')
  }
})