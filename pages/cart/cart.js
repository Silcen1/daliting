// pages/shop-car/shop-car.js
var call = require("../../pages/util/request.js")
Page({

  /** 
   * 页面的初始数据
   */
  data: { 
    cartList: [],
    show_edit: "block",
    edit_name: "编辑",
    type: 0,
    edit_show: "none",
    list: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    cart_arr: [],
    // 商品列表数据
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: false, // 全选状态
  },
  look(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  onShow() {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })

    // 价格方法
    this.count_price();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    console.log(e)
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    var cart_id = e.currentTarget.dataset.cart_id;
    this.data.cart_arr.push(cart_id);
    console.log(cart_id)
    // 获取到商品列表数据
    var list = that.data.list;
    console.log(list)
    // var list =this.data.arr
    // 默认全选  
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },
  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }
  }, 
  // 删除
  deletes: function () {
    var that = this;
    // 获取索引
    //  var index = e.currentTarget.dataset.index;
    var arr = [];
    for (var i in this.data.list) {
      if (this.data.list[i].selected) {
        var id = this.data.list[i].cart_id;
        arr.push(id)
      }
    }
      wx.showModal({
        title: '提示',
        content: '确认删除吗',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: call.host +'/index.php?store_id=1&r=api/cart/delete&_version=2.8.9&_platform=wx',
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              data: {
                access_token: wx.getStorageSync('access_token'),
                cart_id_list: arr
              },
              success(res) {
                if(res.data.code==0){
                  wx.request({
                    url: call.host + '/index.php?store_id=1&r=api/cart/list&_version=2.8.9&_platform=wx',
                    method: 'GET',
                    header: {
                      'content-type': 'application/json'
                    },
                    data: {
                      access_token: wx.getStorageSync('access_token')
                    },
                    success(res) {
                      var arr = [];
                      for (var key in res.data.data.mch_list) {
                        arr = arr.concat(res.data.data.mch_list[key].list)
                      }
                      that.setData({
                        list: arr,
                        totalPrice:0,
                        selectAllStatus:false
                      })
                    },
                    fail: function (res) {
                      console.log(res)
                    }
                  });
                  wx.showToast({
                    title: res.data.msg,
                    icon:"success",
                    duration:1000
                  })
                }
              }
            })
            // 如果数据为空
            if (!that.data.list.length) {
              that.setData({
                hasList: false
              });
            } else {
              // 调用金额渲染数据
              that.count_price();
            }
          } else {
            console.log(res);
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    console.log(arr)
    //  this.setData({
    //    list:arr
    //  })
    // 获取商品列表数据
    // let list = this.data.list;
    // console.log(list)

  },
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  /**
   * 绑定加数量事件
   */
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    list[index].num = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    // 计算金额方法
    this.count_price();
  },
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    // console.log(obj);
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].num = num;
    // 渲染页面
    this.setData({
      list: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  // 提交订单
  btn_submit_order: function () {
    var that = this;
    console.log(that.data.totalPrice);

    // 调起支付
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) { },
    //     'complete': function (res) { }
    //   })
    wx.showModal({
      title: '提示',
      content: '合计金额-' + that.data.totalPrice + "暂未开发",
    })
  },

  /**
   * 计算总价
   */
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].num * list[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },
  deit_btn: function (e) {
    var type = e.currentTarget.dataset.id;
    this.setData({ type: type });
    console.log(type)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // 删除购物车商品
    
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

    var that = this;
    // 购物车列表
    wx.request({
      url: call.host + '/index.php?store_id=1&r=api/cart/list&_version=2.8.9&_platform=wx',
      method: 'GET',
      header: { 
        'content-type': 'application/json'
      },
      data: {
        access_token: wx.getStorageSync('access_token')
      },
      success(res) {
        console.log(res.data.data.mch_list)
        var arr=[];
        for (var key in res.data.data.mch_list) {
          arr=arr.concat(res.data.data.mch_list[key].list)
        }
        that.setData({
          list: arr
        })
        console.log(that.data.list)
      },
      fail: function (res) {
        console.log(res)
      }
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