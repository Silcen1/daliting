// pages/register-password/register-password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphones_0:'',
    userphones_1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  userphones_0:function(e){
    this.setData({ userphones_0:e.detail.value});
    console.log(this.data.userphones_0);
  },
  userphones_1: function (e) {
    this.setData({ userphones_1: e.detail.value});
    console.log(this.data.userphones_1);
  },
  onLoad: function (options) {

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

  },


  gotoindex:function(){
    if (this.data.userphones_0.length==0){
      wx.showToast({
        title: '请输入密码',
      })
      return false;
    }
    if (this.data.userphones_1.length == 0) {
      wx.showToast({
        title: '再次输入密码',
      })
      return false;
    }
    if (this.data.userphones_0 != this.data.userphones_1) {
      wx.showToast({
        title: '两次密码不一致',
      })
      return false;
    }

    wx.switchTab({
          url: '../index/index'
      })
  }
})