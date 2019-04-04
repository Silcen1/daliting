// pages/bargain-admin/bargain-admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bargain:false,
    window:false,
    list:[],
    yuan:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  find_people:function(){
    this.setData({
      bargain:true
    })
  },
  help_to_bargain:function(){
    this.setData({window:true});
    var num = Math.floor(Math.random() * 50);
    this.setData({
      list: this.data.list.concat({name:'小李',money:num}),
      yuan:num
    })
  },
  know:function(){
    this.setData({ window: false });
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