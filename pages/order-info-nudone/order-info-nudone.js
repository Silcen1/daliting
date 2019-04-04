// pages/order-info/order-info.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },  
  submit(e){
    var order_id=e.currentTarget.dataset.order_id;
    call.getData('/index.php?store_id=1&r=api/order/pay-data&parent_id=0&condition=2&pay_type=WECHAT_PAY', this.success, this.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id})
  },
  reject(e) {
    var order_id = e.currentTarget.dataset.order_id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否取消订单？',
      success: function (sm) {
        if (sm.confirm) {
          call.getData('/index.php?store_id=1&r=api/order/revoke', that.success3, that.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
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
    var order_id=options.order_id
    var that = this; 

    // 订单倒计时未支付以及地址
    call.getData('/index.php?store_id=1&r=api/order/detail&route=pages%2Forder%2Forder&_version=2.8.9&_platform=wx', this.success2, this.fail, { access_token: wx.getStorageSync('access_token'),order_id:order_id }) 
  }, 
  success(res) {
    if (res.code == 0) {
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success(res) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.reLaunch({
                  url: '../pay-done/pay-done',
                })
              }, 1000)
            }
          })
        }
      })
    }
  },
  success2(res) {
    console.log(res)
        this.setData({
          time: res.data,
          list:res.data
        })
  },
  success3(res){
    console.log(res)
    if (res.code == 0) {
      wx.showToast({
        title: '订单已取消',
        icon: 'none',
        duration: 2000,
        success() {
          setTimeout(() => {
            wx.navigateBack({})
          }, 500)
        }
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon:"none"
      })
    }
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