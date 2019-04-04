// pages/address/address.js
var call = require("../util/request.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type:0,
      addr:[],
      obj:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  delete(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '是否删除该地址？',
      success: function (res) {
        if (res.confirm) {
          var item = e.currentTarget.dataset.item;
          call.getData('/index.php?store_id=1&r=api/user/address-delete&_version=2.8.9&_platform=wx', that.deleteAddr, that.fail, { address_id: item.id, 'access_token': wx.getStorageSync("access_token") });
        } else {
          wx.showToast({
            title: '取消',
            icon: 'none',
            duration: 1000
          })
        }

      }
    })
  },
  go_reset_address(e) {
    var item=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../address-edit/address-edit?navName=编辑地址'+'&item='+JSON.stringify(item),
    })
  },
  go_edit_address:function(){
    wx.navigateTo({
      url: '../address-edit/address-edit?navName=添加地址',
    })
  },
  choose_default(e) {
    var item = e.currentTarget.dataset.item;
    call.getData('/index.php?store_id=1&r=api/user/address-set-default&_version=2.8.9&_platform=wx', this.changeAddr, this.fail, { address_id: item.id, 'access_token': wx.getStorageSync("access_token")});
  },
  changeAddr(res) {
    if (res.code == 0) {
      call.getData('/index.php?store_id=1&r=api/user/address-list&_version=2.8.9&_platform=wx', this.success, this.fail, { 'access_token': wx.getStorageSync("access_token") });
      wx.showToast({
        title: '修改默认地址成功!',
        icon: 'none'
      })
    }
  },
  deleteAddr(res) {
    call.getData('/index.php?store_id=1&r=api/user/address-list&_version=2.8.9&_platform=wx', this.success, this.fail, { 'access_token': wx.getStorageSync("access_token")});
    wx.showToast({
      title: res.msg,
      icon: 'succes',
      duration: 1000
    })
  },
  item_list: function (e) {
    var item = e.currentTarget.dataset.item;
    var that=this;
    wx.request({
      url: call.host+'/index.php?store_id=1&r=api/user/address-set-default&_version=2.8.9&_platform=wx',
      method: 'GET', 
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        address_id:item.id,
        access_token: wx.getStorageSync("access_token")
      },
      success(res) {
        if (res.data.code == 0) {
          call.request('/index.php?store_id=1&r=api/order/new-submit-preview', that.data.obj, that.changeOrder, that.fail)
        }
      }
    })
  },
  onLoad: function (options) {
    if(typeof(options.id) == 'string'){
      var obj=JSON.parse(options.id)
      this.setData({addr:this.data.addr.concat(obj)})
    }
    if(options.obj){
      var obj=JSON.parse(options.obj)
      this.setData({
        obj:obj
      })
    }
  },
  changeOrder(res){
    console.log(res)
    if (res.code == 0) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      address: res.data.address,
      express_price:res.data.mch_list[0].express_price
    })
    wx.navigateBack({})
    }
  },
  success(data) {
    this.setData({
      addr: data.data.list
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
    var access_token = wx.getStorageSync("access_token");
    call.getData('/index.php?store_id=1&r=api/user/address-list&_version=2.8.9&_platform=wx', this.success, this.fail, { 'access_token': access_token });
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