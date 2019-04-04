// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  phone:function(e){
    var phone=e.detail.value;
    this.setData({ phone:phone});
  },
  success:function(){

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
  gotopage:function(){
    var re = /^1[34578]\d{9}$/;
    if (re.test(this.data.phone) == false) {
      wx.showToast({
        title: '请输正确手机号',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    wx.navigateTo({
        url: '../register-password/register-password'
    })
  }

})