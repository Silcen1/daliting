// pages/index/index.js
var call = require("../util/request.js")
var timer = ''
var strH = ''
var strM = ''
var strS = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownHour: 0, //倒计时 -时
    countDownMinute: 0,  //倒计时 -分
    countDownSecond: 0,  //倒计时-秒
    selected:0,
    list:[],
    navlist:[
      { name: '拼团', pic_url: '../../images/index4.png' },
      { name: '砍价', pic_url: '../../images/index0.png' },
      { name: '秒杀', pic_url: '../../images/index3.png' },
      { name: '大转盘', pic_url: '../../images/index7.png' },
      { name: '领券中心', pic_url: '../../images/index5.png' },
      { name: '爆款', pic_url: '../../images/index1.png' },
      { name: '敬请期待', pic_url: '../../images/index6.png' },
      { name: '敬请期待', pic_url: '../../images/index6.png' }
    ],
    pintuan_list:[],
    kanjia_list:[],
    miaosha_list:[],
    total:0,
    miaoshaing:[],
    banner_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onGotUserInfo:function(e){
    console.log(e);
  },
  go_search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  nav(e){
    var tip=e.currentTarget.dataset.item.name;
    if (tip == '拼团') {
      wx.navigateTo({
        url: '../puzzle/puzzle?type=0'+'&keyword='+tip,
      })
    }else if(tip=='砍价'){
      wx.navigateTo({
        url: '../puzzle/puzzle?type=1' + '&keyword=' + tip,
      })
    }else if(tip=='秒杀'){
      wx.navigateTo({
        url: '../puzzle/puzzle?type=2' + '&keyword=' + tip,
      })
    }else if(tip=='爆款'){
      wx.navigateTo({
        url: '../puzzle/puzzle?type=3' + '&keyword=' + tip,
      })
    }else if(tip=='领券中心'){
      wx.navigateTo({
        url: '../securities/securities',
      })
    }else if(tip=='大转盘'){
      wx.navigateTo({
        url: '../prize-admin/prize-admin',
      })
    }
  },
  coupon_redemption(){
    // wx.navigateTo({
    //   url: '../securities/securities',
    // })
  },
  go_more:function(){
    wx.navigateTo({
      url: '../puzzle/puzzle?type=0&keyword='+'拼团',
    })
  },
  go_detail: function (e) {
    var id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../puzzle-list/puzzle-list?detail=0'+'&id='+id,
    })
  },
  go_bargain: function () {
   wx.navigateTo({
     url: '../puzzle/puzzle?type=1&keyword='+'砍价',
   }) 
  },
  go_bargain_detail: function (e) {
    var id = e.currentTarget.dataset.item.goods_id
    wx.navigateTo({
      url: '../puzzle-list/puzzle-list?detail=1' + '&id=' + id,
    })
  },
  go_seckill:function(){
    wx.navigateTo({
      url: '../puzzle/puzzle?type=2&keyword='+'秒杀',
    })
  },
  go_seckill_detail: function (e) {
    var id = e.currentTarget.dataset.item.id
    var goods_id = e.currentTarget.dataset.goods_id;
    wx.navigateTo({
      url: '../puzzle-list/puzzle-list?detail=2&id=' + id+'&goods_id='+goods_id+'&order='+'秒杀',
    })
  },
  go_faddish:function(){
    wx.navigateTo({
      url: '../puzzle/puzzle?type=3&keyword='+'爆款',
    })
  },
  go_faddish_detail: function (e) {
    var id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../puzzle-list/puzzle-list?detail=3' + '&id=' + id,
    })    
  },
  onLoad() {
    call.getData('/index.php?store_id=1&r=api/default/index&page_id=-1&_version=2.8.9&_platform=wx', this.banner, this.fail, { access_token: wx.getStorageSync('access_token') });//轮播
    call.getData('/index.php?store_id=1&r=api/default/goods-list&cat_id=&page=1&sort=0&sort_type=-1&goods_id=&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token') });//普通订单
    call.getData('/index.php?store_id=1&r=api/group/index/good-list&cid=1&_version=2.8.9&_platform=wx', this.goods_list, this.fail, { access_token: wx.getStorageSync('access_token') }); //拼团列表
    call.getData('/index.php?store_id=1&r=api/bargain/default/index&_version=2.8.9&_platform=wx', this.kanjia_list, this.fail, { access_token: wx.getStorageSync('access_token') });//砍价列表
    call.getData('/index.php?store_id=1&r=api/miaosha/list&_version=2.8.9&_platform=wx', this.miaosha_list, this.fail, { access_token: wx.getStorageSync('access_token') });//秒杀列表
    this.move();
    timer = setInterval(this.move, 1000);
  },
  banner(res){
    this.setData({
      banner_list:res.data.banner_list
    })
  },
  success(data){
    this.setData({
      list:data.data
    })
    console.log(this.data.list)
  },
  goods_list(data) {
    // this.setData({
    //   pintuan_list: data.data.list
    // })
  },
  kanjia_list(data) {
    // this.setData({
    //   kanjia_list: data.data.goods_list
    // })
  },
  miaosha_list(data) {
    // var ing='';
    // for(var key in data.data.list){
    //   if (data.data.list[key].status_text=='进行中'){
    //     ing=data.data.list[key]
    //   }
    // }
    // this.setData({
    //   miaosha_list:ing,
    //   total:ing.end_time - ing.now_time
    // })
    // call.getData('/index.php?store_id=1&r=api/miaosha/goods-list&page=1&_version=2.8.9&_platform=wx', this.miaoshaing_list, this.fail, { 'time': ing.start_time, access_token: wx.getStorageSync('access_token')});//对应进行中的秒杀商品列表
  },
  miaoshaing_list(res){
    this.setData({
      miaoshaing:res.data.list
    })
  },
  fail(){
    console.log("请求失败")
  },
  move() {
    //时
    strH = this.zeroFill('' + parseInt(this.data.total / 3600 % 24), 2)

    //分
    strM = this.zeroFill('' + parseInt(this.data.total / 60 % 24), 2)

    //秒
    strS = this.zeroFill('' + parseInt(this.data.total % 60), 2)

    //赋值给text内容
    this.setData({
      countDownHour: strH, //倒计时 -时
      countDownMinute: strM,  //倒计时 -分
      countDownSecond: strS,  //倒计时-秒  
    })

    //当时间归零停止计时器
    if (this.data.total == 0) {
      clearInterval(timer)
      call.getData('/index.php?store_id=1&r=api/miaosha/list&_version=2.8.9&_platform=wx', this.miaosha_list, this.fail, { access_token: wx.getStorageSync('access_token') });//如果倒计时结束，重新获取秒杀列表
      return
    }

    //每秒递减
    this.data.total--
  },
  zeroFill(str, n) {
    //补零方法，str为数字字符串 n为需要的位数，不够补零
    if (str.length < n) {
      str = '0' + str
    }
    return str
  }
})