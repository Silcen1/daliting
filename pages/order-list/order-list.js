// pages/order-list/order-list.js
var call = require("../../pages/util/request.js")
Page({
   
  /**
   * 页面的初始数据
   */ 
  data: {    
    type:0,  
    item:0, 
    odrer_item:0, 
    btn:0, 
    list:[],
    list1:[],
    list2:[],
    list3:[],  
    sum:'',
    sum1:'',
    sum2:'',
    haveList:true
  },
  go_logistics:function(e){
    var order_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../logistics/logistics?order_id='+order_id,
    })
  },
  go_evaluate: function (e) {
    var order_id = e.currentTarget.dataset.id
    var name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../evaluate/evaluate?order_id=' + order_id+'&name='+name,
    })
  },
  goshop(e) {
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      //此处跳转门店页面需要携带一个门店id，以便在门店页面获取数据
      url: '../store-admin/store-admin?mch_id=' + id,
    })
  },
  order_item:function(e){
    var type=e.currentTarget.dataset.id
    this.setData({type:type})
  },
  item:function(e){
    var item=e.currentTarget.dataset.id;
    this.setData({item:item});
  },
  odrer_item:function(e){
    var odrer_item=e.currentTarget.dataset.id;
    this.setData({ odrer_item: odrer_item})
  },
  order: function (e) {
    var order = e.currentTarget.dataset.id;
    this.setData({ order: order })
  },
  btn: function (e) {
    var btn = e.currentTarget.dataset.id;
    this.setData({ btn: btn })
  },
  status(e) {
    var order_id = e.currentTarget.dataset.order_id;
    call.getData('/index.php?store_id=1&r=api/order/pay-data&parent_id=0&condition=2&pay_type=WECHAT_PAY', this.go_pay, this.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
  }, 
  nav_store:function(){
    wx.showToast({
      title: '取消成功',
    })
  },
  pays:function(){
    wx.navigateTo({
      url: '../create-order/create-order?num=1',
    })
  }, 
  confirm(e){
    var order_id = e.currentTarget.dataset.order_id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认收货？',
      success: function (sm) {
        if (sm.confirm) {
          call.getData('/index.php?store_id=1&r=api/order/confirm', that.reviced, that.fail, { access_token: wx.getStorageSync('access_token'), order_id: order_id })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  reviced(res) {
    var that=this
    if (res.code == 0) {
      wx.showToast({
        title: '确认收货！',
        icon: 'success',
        duration: 2000,
        success() {
          call.getData('/index.php?store_id=1&r=api/order/list&status=2&_version=2.8.9&_platform=wx', that.success3, that.fail, { access_token: wx.getStorageSync('access_token') })
          call.getData('/index.php?store_id=1&r=api/order/list&status=3&_version=2.8.9&_platform=wx', that.success4, this.fail, { access_token: wx.getStorageSync('access_token') }) 
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //  拼团订单 
    // call.getData('/index.php?store_id=1&r=api/group/order/list&status=0&_version=2.8.9&_platform=wx', this.success2, this.fail, { access_token: wx.getStorageSync('access_token') }) 

    // 砍价订单
    // call.getData('/index.php?store_id=1&r=api/bargain/default/goods&page=1&_version=2.8.9&_platform=wx', this.success3, this.fail, { access_token: wx.getStorageSync('access_token'),goods_id:'' }) 
 
    // 秒杀列表
    // call.getData('/index.php?store_id=1&r=api/miaosha/goods-list&time=12&page=1&_version=2.8.9&_platform=wx', this.success4, this.fail, { access_token: wx.getStorageSync('access_token') }) 
    
  },
  onShow() {
    //  普通订单
    call.getData('/index.php?store_id=1&r=api/order/list&status=0&_version=2.8.9&_platform=wx', this.success1, this.fail, { access_token: wx.getStorageSync('access_token') })
    call.getData('/index.php?store_id=1&r=api/order/list&status=1&_version=2.8.9&_platform=wx', this.success2, this.fail, { access_token: wx.getStorageSync('access_token') })
    call.getData('/index.php?store_id=1&r=api/order/list&status=2&_version=2.8.9&_platform=wx', this.success3, this.fail, { access_token: wx.getStorageSync('access_token') })
    call.getData('/index.php?store_id=1&r=api/order/list&status=3&_version=2.8.9&_platform=wx', this.success4, this.fail, { access_token: wx.getStorageSync('access_token') }) 
  },
  go_pay(res) {
    if (res.code == 0) {
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success(res) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.reLaunch({
                  url: '../pay-done/pay-done',
                })
              }, 1000)
            }
          })
        }
      })
    }
  },
  success1(res) {
    // 待付款
    this.setData({
      list: res.data
    }) 
  },

// 待发货
  success2(res) {
    this.setData({
      list1: res.data
    })
  },


// 待收货
  success3(res) {
   this.setData({
     list2:res.data.list
   })
  },
//待评价
  success4(res) {
    this.setData({
      list3:res.data.list
    })
    console.log(this.data.list3)
  },
  fail() {
    consloe.log('接收失败')
  },
  selectitem:function(event){
    var order_id = event.currentTarget.dataset.order_id
    var select = event.currentTarget.dataset.select;
    
      if (select == 0){
       wx.navigateTo({
         url: '../order-info-nudone/order-info-nudone?&order_id=' + order_id,

       })
      }
      if (select == 1) {
          wx.navigateTo({
              url: '../order-info-send/order-info-send?&order_id='+order_id,
          })
      }

      if (select == 2) {
          wx.navigateTo({
              url: '../order-info-loading/order-info-loading?&order_id='+order_id,

          })
      }

      if (select == 3) {
          wx.navigateTo({
            url: '../order-info-done/order-info-done',

          })
      }

      if (select == 4) {
          wx.navigateTo({
              url: '../order-info-nudone/order-info-nudone',

          })
      }

      if (select == 5) {
          wx.navigateTo({
              url: '../order-info-close/order-info-close',

          })
      }
 

 
  },

listitems: function (evnet) {


    let select = evnet.currentTarget.dataset.select;
    if (select == 0) {
      wx.navigateTo({
        url: '../booking-loading/booking-loading',
      })
    }
    if (select == 1) {
      wx.navigateTo({
        url: '../booking-close/booking-close',
      })
    }
    if (select == 2) {
      wx.navigateTo({
        url: '../booking-ok/booking-ok',
      })
    }
  },

 selecttbn: function (event) {

    let select = event.currentTarget.dataset.select;

    console.log(select);

    if (select == 0) {
      wx.navigateTo({
        url: '../bargain-loading/bargain-loading'
      })
    }

    if (select == 1) {
      wx.navigateTo({
        url: '../bargain-ok/bargain-ok'
      })
    }

    if (select == 2) {
      wx.navigateTo({
        url: '../bargain-err/bargain-err'
      })
    }


  }
})