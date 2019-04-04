// pages/admin/admin.js
var call = require("../../pages/util/request.js")
const app = getApp();
Page({

  /** 
   * 页面的初始数据
   */ 
  data: { 
    flag: true,
    flag1:true,
    name:'',
    avatar:'',
    detail:''
    
  },
  show: function () {
    this.setData({
      flag: false
    })
  },
  hide: function () {
    this.setData({
      flag:true
    })
  },
  hide: function (event) {
    console.log(event)
  },
  know:function(){
   this.setData({
     flag:true
   })
  },

  // 关于我们
  about: function () {
    this.setData({
      flag1: false
    })
  },
  hide: function () {
    this.setData({
      flag1: true
    })
  },
  hide: function (event) {
    console.log(event)
  },
  liaojie: function () {
    this.setData({
      flag1: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  go_address:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },

  onLoad: function (options) {
    var access_token = wx.getStorageSync("access_token");
    console.log(access_token)
    var that=this;
      wx.request({
        url: 'https://i.daliting.com/web/index.php?store_id=1&r=api/user/index&_version=2.8.9&_platform=wx',
        method:'GET',
        header: {
          'content-type': 'application/json' 
        }, 
        data:{
          access_token: access_token,
        },
        success(res) {
          console.log(res)
          var userInfo = res.data.data.user_info
          that.setData({
            name: userInfo.nickname,
            avatar: userInfo.avatar_url
          })
        }
      })
    // 关于我们接口
    call.getData('/index.php?&r=api/default/article-detail&id=about_us&_version=2.8.9&_platform=wx', this.success4, this.fail, { access_token: wx.getStorageSync('access_token') }) 
  },

  success4: function (res) {
    console.log(res)
    this.setData({
      about: res.data
    })
    console.log(this.data.about)
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

    username:function(){
        wx.navigateTo({
            url: '../user-self/user-self'
        })
    },
})