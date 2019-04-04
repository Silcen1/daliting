// pages/puzzle/puzzle.js
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
    detail:"",
    name:"",
    list: [],
    total: 0,
    countDownHour: 0, //倒计时 -时
    countDownMinute: 0,  //倒计时 -分
    countDownSecond: 0,  //倒计时-秒
  },
  search:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  go_detail(e){
    var detail=this.data.detail;
    if (this.data.detail==1){
      var id = e.currentTarget.dataset.goods_id;
      wx.navigateTo({
        url: '../puzzle-list/puzzle-list?detail=1' + '&id=' + id,
      })
    } else if (this.data.detail == 0){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../puzzle-list/puzzle-list?detail=0' + '&id=' + id,
      })
    } else if (this.data.detail == 2){
      var id = e.currentTarget.dataset.goods_id;
      wx.navigateTo({
        url: '../puzzle-list/puzzle-list?detail=2' + '&id=' + id,
      })
    }else {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../puzzle-list/puzzle-list?detail=3' + '&id=' + id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      var type=options.type;
      this.setData({
        detail:type
      })
      if( type==0 ){
        wx.setNavigationBarTitle({
          title: '超值拼团'
        });
        call.getData('/index.php?store_id=1&r=api/group/index/good-list&cid=1&_version=2.8.9&_platform=wx', this.goods_list, this.fail, { access_token: wx.getStorageSync('access_token') });
      }else if (type == 1) {
        wx.setNavigationBarTitle({
          title: '砍价商品'
        });
        call.getData('/index.php?store_id=1&r=api/bargain/default/index&_version=2.8.9&_platform=wx', this.kanjia_list, this.fail, { access_token: wx.getStorageSync('access_token') });
      }else if (type == 2) {
        wx.setNavigationBarTitle({
          title: '秒杀专场'
        });
        call.getData('/index.php?store_id=1&r=api/miaosha/list&_version=2.8.9&_platform=wx', this.miaosha_list, this.fail, { access_token: wx.getStorageSync('access_token') });//秒杀列表
        this.move();
        timer = setInterval(this.move, 1000);
      }else if (type == 3) {
        wx.setNavigationBarTitle({
          title: '爆款'
        })
        call.getData('/index.php?store_id=1&r=api/default/goods-list&cat_id=&page=1&sort=0&sort_type=-1&goods_id=&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token') });
      }
    }
    if (options.name&&options.cat_id) {
      var obj={};
      obj.cat_id=options.cat_id;
      obj.access_token=wx.getStorageSync('access_token')
      call.getData('/index.php?store_id=1&r=api/default/goods-list&page=1&sort=0&sort_type=-1&goods_id=&_version=2.8.9&_platform=wx', this.success, this.fail, obj);
      wx.setNavigationBarTitle({
        title: options.name
      })
      this.setData({ name: options.name,detail:'分类列表'})
    }
    if(options.name&&options.search_list){
      var search_list=JSON.parse(options.search_list)
      this.setData({
        list:search_list,
        detail:'none'
      })
      console.log(this.data.list)
    }
    if (options.shop_name && options.name && options.search_list){
      wx.setNavigationBarTitle({
        title: options.shop_name
      });
      var search_list = JSON.parse(options.search_list)
      this.setData({
        list: search_list
      })
    }
  },
  success: function (data) {
    this.setData({
      list:data.data.list
    })
  },
  goods_list(data){
    // this.setData({
    //   list:data.data.list
    // })
    console.log(this.data.list)
  },
  kanjia_list(data) {
    // this.setData({
    //   list:data.data.goods_list
    // })
  },
  miaosha_list(data) {
    // var ing = '';
    // for (var key in data.data.list) {
    //   if (data.data.list[key].status_text == '进行中') {
    //     ing = data.data.list[key]
    //   }
    // }
    // this.setData({
    //   total:ing.end_time - ing.now_time
    // })
    // call.getData('/index.php?store_id=1&r=api/miaosha/goods-list&page=1&access_token=nSVsE9Ufk77JZxbldJ8hu0we6hxWcdPS&_version=2.8.9&_platform=wx', this.miaoshaing_list, this.fail, { 'time': ing.start_time });//对应进行中的秒杀商品列表
  },
  miaoshaing_list(res){
    // this.setData({
    //   list:res.data.list
    // })
  },
  fail: function () {
    console.log("接收失败")
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
      call.getData('/index.php?store_id=1&r=api/miaosha/list&access_token=nSVsE9Ufk77JZxbldJ8hu0we6hxWcdPS&_version=2.8.9&_platform=wx', this.miaosha_list, this.fail);//如果倒计时结束，重新获取秒杀列表
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