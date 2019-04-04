// pages/puzzle-list/puzzle-list.js
var call = require("../util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showinfo: 'true',
    detail: 3,  //0代表拼团商品详情页     1代表砍价商品详情页    2代表秒杀购买   3正常购买爆款购买
    group:false,
    num:1,
    isSelect:'',
    tip:'',
    list:[],
    img:"",
    goods_size:[],
    say:[],
    goods_id:'',
    color:'',
    g_size:'',
    order:'',
    miaoshaid:'',
    mch_id:'',
    shop_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onMyEvent: function (e) {
    var color=e.detail.color;
    var g_size=e.detail.g_size;
    if(color){
      this.setData({
        color: color
      });
    }else if(g_size){
      this.setData({
        g_size:g_size
      })
    }
  },
  chat(){
    console.log('打开客服会话')
  },
  store_info: function () {
    this.setData({ tip: '确定' })
    this.store.showStore()
  },
  go_store:function(){
    wx.navigateTo({
      //此处跳转门店页面需要携带一个门店id，以便在门店页面获取数据
      url: '../store-admin/store-admin?mch_id='+this.data.shop_id,
    })
  },
  start_bargain:function(){
    if (this.data.color.length == 0 || this.data.g_size.length == 0) {
      this.setData({ tip: '选择规格' })
      this.store.showStore()
    }else{
    var obj={};
      obj.access_token =wx.getStorageSync('access_token');
    obj.goods_id=this.data.list.id;
    obj.min_price=this.data.list.min_price;
    obj.begin_time=this.data.list.begin_time;
    obj.end_time=this.data.list.end_time;
    obj.time='';
    obj.status='';
    obj.status_data='';
    obj.is_delete=this.data.list.pic_list[0].is_delete;
    obj.addtime='';
    call.request('/index.php?store_id=1&r=api/bargain/order/bargain-submit', obj,this.kanjiaorder,this.fail);
    }
  },
  kanjiaorder(res){
    wx.navigateTo({
      url: '../bargain-admin/bargain-admin?order_id=' + res.data.order_id + '&id=' + this.data.list.id + '&type=' + this.data.color + '&size=' + this.data.g_size + '&goods_num=' + this.data.goods_size.num,
    })
  },
  onLoad: function (options) {
    if (options.order || options.goods_id) {
      var goods_id = options.goods_id
      tihs.setData({ order: options.order, miaoshaid: goods_id})
    }
    var id = options.id;
    var detail = options.detail;
    this.setData({ detail: detail});
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
    if (options.detail==0){  //假如是拼团商品
      call.getData('/index.php?store_id=1&r=api/group/index/good-details&_version=2.8.9&_platform=wx', this.pintuan, this.fail, { 'gid': id, access_token: wx.getStorageSync('access_token')});
      call.getData('/index.php?store_id=1&r=api/group/index/goods-comment&_version=2.8.9&_platform=wx', this.pintuancomment, this.fail, { 'gid': id, access_token: wx.getStorageSync('access_token')});
      call.getData('/index.php?store_id=1&r=api/default/goods-attr-info&group_id=undefined&attr_list=%5B1%5D&type=&group_checked=0&_version=2.8.9&_platform=wx', this.size, this.fail, { 'goods_id': id, access_token: wx.getStorageSync('access_token')});
      
    } else if (options.detail == 1) { //假如是砍价商品
      call.getData('/index.php?store_id=1&r=api/bargain/default/goods&page=1&_version=2.8.9&_platform=wx', this.kanjia, this.fail, { 'goods_id': id, access_token: wx.getStorageSync('access_token') });
      call.getData('/index.php?store_id=1&r=api/default/comment-list&page=1&_version=2.8.9&_platform=wx', this.comment, this.fail, { 'goods_id': id, access_token: wx.getStorageSync('access_token') });
      call.getData('/index.php?store_id=1&r=api/default/goods-attr-info&group_id=undefined&attr_list=%5B1%5D&type=&group_checked=0&_version=2.8.9&_platform=wx', this.size, this.fail, { 'goods_id': id, access_token: wx.getStorageSync('access_token') });
    }else if(options.detail==2){//假如是秒杀商品
      call.getData('/index.php?store_id=1&r=api/miaosha/details&scene_type=0&_version=2.8.9&_platform=wx', this.success, this.fail, { 'id': id, access_token: wx.getStorageSync('access_token') });
      call.getData('/index.php?store_id=1&r=api/miaosha/comment-list&page=1&_version=2.8.9&_platform=wx', this.comment, this.fail, { 'goods_id': id, access_token: wx.getStorageSync('access_token') });
      call.getData('/index.php?store_id=1&r=api/default/goods-attr-info&group_id=undefined&attr_list=%5B1%5D&type=&group_checked=0&_version=2.8.9&_platform=wx', this.size, this.fail, { 'goods_id': goods_id, access_token: wx.getStorageSync('access_token') });
    }else{  //假如是其他商品
      call.getData('/index.php?store_id=1&r=api/default/goods&_version=2.8.9&_platform=wx', this.success, this.fail, { 'id': id, access_token: wx.getStorageSync('access_token') });
      call.getData('/index.php?store_id=1&r=api/default/comment-list&page=1&_version=2.8.9&_platform=wx', this.comment, this.fail, { 'goods_id': id, access_token: wx.getStorageSync('access_token') });
    }
  },
  kanjia(res) {
    console.log(res)
    this.setData({
      list:res.data.goods
    })
  },
  success: function (data) {
    console.log(data)
    if(data.code==0){
    var img = data.data.detail.replace(/\<img/gi, '< img style="max-width:100%;height:auto" ')
    this.setData({
      list:data.data,
      img:img,
      goods_id:data.data.id,
      mch_id:data.data.mch.id,
      goods_size: data.data.attr_group_list,
      shop_id:data.data.mch.id
      })
    }else{
      wx.showToast({
        title: '商品不存在或已下架',
        icon:'none'
      })
    }
  },
  comment(res) {
    console.log(res.data)
    this.setData({
      say:res.data.list
    })
  },
  pintuan(res){
    if(res.code==0){
      this.setData({
        goods_size: res.data.attr_group_list,
        list: res.data.info
      })
    }else{
      wx.showToast({
        title: '商品不存在或已下架',
        icon:'none'
      })
    }
  },
  pintuancomment(res){
    this.setData({
      say:res.data.comment
    })
  },
  fail: function () {
    console.log("接收失败")
  },
  sy_y:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  select_number_nuadd:function(){
    var number_1 = this.data.num-1;
    if(number_1>=0){
      this.setData({ num:number_1})
    }
  },
  select_number_add:function(){
    var number_2 = this.data.num+1;
    if (number_2 <= this.data.list.num){
      this.setData({num:number_2})
    }
  },
  addCre:function(e){
    this.store.showStore();
    this.setData({tip:'加入购物车'})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {
    this.store = this.selectComponent("#store");
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
  selectBtn: function (event) {
    var bool = event.target.dataset.select;
    this.setData({
      showinfo: bool
    });
  }
})