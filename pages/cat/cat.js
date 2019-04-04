var call = require("../util/request.js")
// pages/class-list/class-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    selected:1,
    list:[],
    child: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  go_type:function(e){
    var type=e.currentTarget.dataset.index;
    var item=e.currentTarget.dataset.item;
    this.setData({
      type: type,
      child:item
    });
  },
  go_detail:function(e){
    var cat_id=e.currentTarget.dataset.item.parent_id;
    var name = e.currentTarget.dataset.item.name
    wx.navigateTo({
      url: '../puzzle/puzzle?&name='+name+'&cat_id='+cat_id,
    })
  },
  go_search:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onLoad: function (options) {
    call.getData('/index.php?store_id=1&r=api/default/cat-list&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token') });

  },
  success: function (data) {
    console.log(data.data.list)
    this.setData({
      list:data.data.list,
      child:data.data.list[0]
    })
  },
  fail: function () {
    console.log("接收失败")
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