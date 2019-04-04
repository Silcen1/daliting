// pages/prize-list/prize-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prize:[
      { id: 1, name: 'iPhone8', unit:'台', url:'../../images/store-infos.png'}
    ]
  },
  prize_details(e){
    var item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../prize-info/prize-info?item='+item,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.award){
      if (options.award == '100M流量') {
        var obj = {};
        obj.name = options.award;
        obj.url = options.url;
        obj.unit = '张';
        this.setData({
          prize: this.data.prize.concat(obj)
        })
      } else {
        var obj = {};
        obj.name = options.award;
        obj.url = options.url;
        obj.unit = '台';
        this.setData({
          prize: this.data.prize.concat(obj)
        })
      }
    }
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