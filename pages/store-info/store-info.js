// pages/store-info/store-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showinfo:'true',
      select:'',
      selects:'',
      num:'',
      sum:50,
      inventory:300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  create_order:function(){
    var num = this.data.num
    wx.navigateTo({
      url: '../create-order/create-order?num=' + num,
    })
  },
  go_detail:function(){
    wx.navigateTo({
      url: '../puzzle-list/puzzle-list?detail=4',
    })
  },
  select_btnst: function(e){
    // console.log(e.currentTarget.dataset.id);
    var select = e.currentTarget.dataset.id;
    this.setData({
      select: select
    })
  },
  select_btnsts:function(e){
    //console.log(e)
    var selects=e.currentTarget.dataset.id;
    this.setData({
      selects: selects
    })
  },
  count_number_nuadd:function(){
    var number_1 = this.data.num-1;
    if(number_1>=0){
      this.setData({ num:number_1})
    }
  },
  count_number_add:function(){
    var number_2 = this.data.num+1;
    if (number_2 <= this.data.inventory){
      this.setData({ num:number_2})
    }
    //console.log(number_2)
  },
  onLoad: function (options) {
    var num = JSON.parse(options.num)
    if (options.num == null) {
      wx.showToast({
        title: '数据为空',
      })
      return;
    }
    this.setData({
      num: num
    })
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
  selectBtn:function(event){
    console.log(event.target.dataset.select);
    let bool = event.target.dataset.select;
    this.setData({
      showinfo: bool
    })
  }
})