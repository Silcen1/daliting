// pages/create-order/create-order.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
        address:{}, 
        num:'', 
        type:'',
        size:'',
        sum:'',
        inventory:'',
        list:[],
        pic:'',
        order_list:'',
        goods_id:'',
        attr:'',
        express_price:'',
        obj:[]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  go_address:function(){
    wx.navigateTo({
      url: '../address/address?obj=' + JSON.stringify(this.data.obj),
    })
  },
  submit_order:function(){
    if (JSON.stringify(this.data.address)=='{}'){
      wx.showToast({
        title: '请选择收货地址',
        icon:'none',
        duration:2000
      })
    }else{
      var mch_list = this.data.order_list.data.mch_list
      mch_list[0].goods_list[0].num=this.data.num;
      mch_list[0].show=false;
      mch_list[0].show_length=0;
      mch_list[0].offline=0;
      var obj = {};
      obj.access_token = wx.getStorageSync('access_token');
      obj.mch_list = JSON.stringify(mch_list);
      obj.address_id=this.data.address.id;
      obj.use_integral=1;
      obj.payment=0;
      call.request('/index.php?store_id=1&r=api/order/new-submit', obj, this.pay, this.fail);
    }
  },
  number_counts_nuadd:function(){
    var number_1 = this.data.num-1;
    if(number_1>0){
      this.setData({ num:number_1})
    }
  },
  number_counts_add:function(){
    var number_2 = this.data.num+1;
    if (number_2 <= this.data.inventory){
      this.setData({ num:number_2})
    }
  },

  onLoad: function (options) {
    var access_token = wx.getStorageSync("access_token");
    call.getData('/index.php?store_id=1&r=api/user/address-list&_version=2.8.9&_platform=wx', this.getAddr, this.fail, { 'access_token': access_token });
    if(typeof(options.num)=='string'){
      var num = JSON.parse(options.num)
      var goods_id=options.goods_id;
      var type = options.type
      var size = options.size
      var pic=options.pic
      var order = JSON.parse(options.order)
      var express_price=order.data.mch_list[0].express_price
      var attr=JSON.parse(options.attr)
        this.setData({
          num: num,
          type:type,
          size:size,
          pic:pic,
          goods_id:goods_id,
          order_list:order,
          attr:attr,
          express_price:express_price
        })
    }
    if(options.address!=undefined){
      var addr=JSON.parse(options.address)
      this.setData({address:addr})
    }
    //进入页面根据传过来的id获取商品库存
    call.getData('/index.php?store_id=1&r=api/default/goods&_version=2.8.9&_platform=wx', this.success, this.fail, { 'id': goods_id, access_token: wx.getStorageSync('access_token') });

},
  pay(res) {
  var obj={};
  obj.access_token=wx.getStorageSync('access_token');
  obj.order_id=res.data.order_id;
    call.getData('/index.php?store_id=1&r=api/order/pay-data&order_id_list=&pay_type=WECHAT_PAY&parent_user_id=0&condition=2&_version=2.8.9&_platform=wx',this.buy,this.fail,obj)
},
buy(res){
  console.log(res)
  if(res.code==0){
    wx.requestPayment({
      timeStamp: res.data.timeStamp,
      nonceStr: res.data.nonceStr,
      package: res.data.package,
      signType: res.data.signType,
      paySign: res.data.paySign,
      success(res){
        wx.showToast({
          title: '支付成功',
          icon:'success',
          duration:2000,
          success(){
            setTimeout(() => {
                wx.reLaunch({
                  url: '../pay-done/pay-done',
                })
            },1000)
          }
        })
      },
      fail(){
        wx.showToast({
          title: '取消支付',
          icon:'none',
          duration:2000
        })
      }
    })
  }
},
success(res){
  this.setData({
    list:res.data,
    inventory:res.data.num,
    sum: res.data.price
  })
},
getAddr(res){
  var arr={}
  for(var key in res.data.list){
    if (res.data.list[key].is_default==1){
      arr = res.data.list[key]
    }
  }
  this.setData({
    address:arr
  })
},
fail(){
  console.log('接收失败')
},
  mores:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
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

  }
})