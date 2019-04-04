// pages/store-admin/store-admin.js
var call = require("../util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    list:[],
    search:''
  },
  select_item:function(e){
    var type = e.currentTarget.dataset.id
    this.setData({type:type})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  go_ecurities:function(){
    wx.navigateTo({
      url: '../ecurities/ecurities',
    })
  },
  search_input: function (e) {
    var search = e.detail.value;
    this.setData({ search: search });
  },
  search_detail(){
    var that = this;
    wx.request({
      url: call.host + '/index.php?store_id=1&r=api/default/search&page=1&_version=2.8.9&_platfor',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {
        mch_id:this.data.list.shop.id,
        keyword: this.data.search
      },
      success(res) {
        console.log(res)
        if (res.data.data.list.length == 0) {
          wx.navigateTo({
            url: '../search-return/search-return?id=' + that.data.search,
          })
        } else {
          wx.navigateTo({
            url: '../puzzle/puzzle?shop_name='+that.data.list.shop.name+'&name=' + JSON.stringify(that.data.search) + '&search_list=' + JSON.stringify(res.data.data.list),
          })
        }
      },
      fail() {
        console.log('接收失败')
      }
    });
  },
  detail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../puzzle-list/puzzle-list?detail=3&id='+id,
    })
  },
  onLoad: function (options) {
    var mch_id=options.mch_id
    call.getData('/index.php?store_id=1&r=api/mch/index/shop&tab=1&sort=1&page=1&cat_id=&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token'),'mch_id': mch_id});
  },
  success(res){
    console.log(res)
    this.setData({
      list:res.data
    })
  },
  fail(){
    console.log('接收失败')
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