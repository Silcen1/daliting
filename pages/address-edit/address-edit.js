// pages/address-edit/address-edit.js
var call = require("../util/request.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    city:'未选择',
    address:'',
    type:'',
    id:'',
    all:[],
    allindex:[0,0,0]
  },
  bindRegionChange(e){
    this.setData({ allindex: e.detail.value })
    var sheng=this.data.all[0][this.data.allindex[0]].name;
    var shi =this.data.all[1][this.data.allindex[1]].name;
    var qu =this.data.all[2][this.data.allindex[2]].name;
    var addr=sheng+shi+qu
    this.setData({city:addr})
  },
  //滑动
  bindMultiPickerColumnChange: function (e) {
    var data = {
      all: this.data.all,
      allindex: this.data.allindex
    };
    //更新滑动的第几列e.detail.column的数组下标值e.detail.value
    data.allindex[e.detail.column] = e.detail.value;
    //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
    if (e.detail.column == 0) {
      data.allindex = [e.detail.value, 0, 0];
    } else if (e.detail.column == 1) {
      //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
      data.allindex = [data.allindex[0], e.detail.value, 0];
    } else if (e.detail.column == 2) {
      //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
      data.allindex = [data.allindex[0], data.allindex[1], e.detail.value];
    }
    var temp = this.data.provinces;
    data.all[0] = temp;
    if ((temp[data.allindex[0]].list).length > 0) {
      //如果第二列“市”的个数大于0,通过multiIndex变更multiArray[1]的值
      data.all[1] = temp[data.allindex[0]].list;
      var areaArr = (temp[data.allindex[0]].list[data.allindex[1]]).list;
      //如果第三列“区”的个数大于0,通过multiIndex变更multiArray[2]的值；否则赋值为空数组
      data.all[2] = areaArr.length > 0 ? areaArr : [];
    } else {
      //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
      data.all[1] = [];
      data.all[2] = [];
    }
    //data.multiArray = [temp, temp[data.multiIndex[0]].citys, temp[data.multiIndex[0]].citys[data.multiIndex[1]].areas];
    //setData更新数据
    this.setData(data);
  },
  submit(){
    var obj={};
    obj.name=this.data.name;
    obj.phone=this.data.phone;
    obj.city = this.data.city;
    obj.area=this.data.address;
    obj.address=obj.city+obj.area;
    if(!obj.name){
      wx.showToast({
        title: '请填写收货人名字',
        icon:'none'
      })
    }else if (!obj.phone) {
      wx.showToast({
        title: '请填写收货人联系方式',
        icon: 'none'
      })
    }else if (obj.city=='未选择') {
      wx.showToast({
        title: '请填写所在区域',
        icon: 'none'
      })
    }else if (!obj.area) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
    }else{
      if (this.data.type == 1){
      var arr={};
        arr.access_token = wx.getStorageSync("access_token");
        arr.name = this.data.name;
        arr.mobile = this.data.phone;
        arr.province_id=this.data.all[0][this.data.allindex[0]].id;
        arr.city_id=this.data.all[1][this.data.allindex[1]].id;
        arr.district_id=this.data.all[2][this.data.allindex[2]].id;
        arr.detail = this.data.address;
        call.request('/index.php?store_id=1&r=api/user/address-save',arr,this.addok,this.fail)
      } else if(this.data.type == 2){
        //根据传过来的id，向服务器发起修改这条数据的请求
        call.getData('/index.php?store_id=1&r=api/user/address-delete&_version=2.8.9&_platform=wx', this.resetok, this.fail, { address_id: this.data.id, access_token: wx.getStorageSync("access_token") });
      }
    }
  },
  addok(res){
    if(res.code==0){
      wx.showToast({
        title: res.msg,
      })
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }
  },
  resetok(res) {
    if(res.code==0){
    var arr = {};
      arr.access_token = wx.getStorageSync("access_token");
    arr.name = this.data.name;
    arr.mobile = this.data.phone;
    arr.province_id = this.data.all[0][this.data.allindex[0]].id;
    arr.city_id = this.data.all[1][this.data.allindex[1]].id;
    arr.district_id = this.data.all[2][this.data.allindex[2]].id;
    arr.detail = this.data.address;
    call.request('/index.php?store_id=1&r=api/user/address-save', arr, this.repair, this.fail)
    }
  },
  repair(res){
    wx.showToast({
      title:'修改成功！',
      icon:"none"
    })
    wx.navigateTo({
      url: '../address/address'
    })
  },
  inp_name(e) {
    var name = e.detail.value;
    this.setData({ name: name });
  },
  inp_phone(e) {
    var phone = e.detail.value;
    this.setData({ phone: phone });
  },
  inp_address(e) {
    var address = e.detail.value;
    this.setData({ address: address });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opts) {
    call.getData('/index.php?store_id=1&r=api/default/district&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync("access_token")});
      // 设置导航栏为对应导航
      wx.setNavigationBarTitle({
        title: (opts.navName != '' ? opts.navName : '')
      });
    if (opts.navName == '编辑地址') {
        var item = JSON.parse(opts.item)
        this.setData({
          type: 2,
          name: item.name,
          phone: item.mobile,
          id:item.id
        })
      } else if (opts.navName == '添加地址'){
        this.setData({ type: 1 })
      }
  },
  success(data) {
    var temp=data.data
    this.setData({
      provinces: temp,
      all:[temp,temp[0].list,temp[0].list[0].list]
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