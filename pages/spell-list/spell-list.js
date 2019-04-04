// pages/spell-list/spell-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
  },
  order_item_btn:function(e){
    var type=e.currentTarget.dataset.id;
    this.setData({type:type})
  },
  nav_store:function(){
    wx.showToast({
      title: '放弃成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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

   listitems:function(evnet){ 

      
       let select = evnet.currentTarget.dataset.select;
       if (select == 0){
          wx.navigateTo({
              url: '../booking-loading/booking-loading',
          })
        }
       if (select == 1){
           wx.navigateTo({
               url: '../booking-close/booking-close',
           })
        }
       if (select == 2){
           wx.navigateTo({
               url: '../booking-ok/booking-ok',
           })
        }
   }
})