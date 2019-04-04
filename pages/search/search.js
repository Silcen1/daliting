// pages/search/search.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'',
    inputShowed:true,
    searchRecord:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  select(e){
    this.setData({
      search:e.currentTarget.dataset.item
    });
    var that = this
    var inputVal = e.currentTarget.dataset.item
    var searchRecord = this.data.searchRecord
    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 5) {
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      else {
        searchRecord.pop()//删掉旧的时间最早的第一条
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
    this.search_detail();
  },
  search_detail: function () {
    var that=this;
    wx.request({
      url: call.host +'/index.php?store_id=1&r=api/default/search&page=1&_version=2.8.9&_platfor',
      header: {
        'content-type':'application/x-www-form-urlencoded'
        },
      method:"GET",
      data:{
        keyword: this.data.search
      },
      success(res) {
        if (res.data.data.list.length == 0) {
          wx.navigateTo({
            url: '../search-return/search-return?id='+that.data.search,
          })
        }else{
          wx.navigateTo({
            url: '../puzzle/puzzle?&name=' + JSON.stringify(that.data.search) + '&search_list=' + JSON.stringify(res.data.data.list),
          })
        }
      },
      fail(){
        console.log('接收失败')
      }
    });
    var inputVal = this.data.search
    var searchRecord = this.data.searchRecord
    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 5) {
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      else {
        searchRecord.pop()//删掉旧的时间最早的第一条
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
  },
  search_input:function(e){
    var search=e.detail.value;
    this.setData({ search: search});
  },
  delhistory(){
    wx.removeStorage({
      key: 'searchRecord'
    })
    this.setData({
      searchRecord: []
    })
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
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [],//若无储存则为空
    })
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