// pages/get-money/get-money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  wait:function(){
    wx.navigateTo({
      url: '../wait/wait',
    })
  },
  select_zfb:function(e){
    var type=e.currentTarget.dataset.id;
    this.setData({type:type})
    console.log(type)
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

  }
})