// pages/prize-admin/prize-admin.js
var call = require("../util/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleList: [],//圆点数组
    awardList: [],//奖品数组
    colorCircleFirst: '#ffffff',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#ffeeee',//奖品默认颜色
    colorAwardSelect: '#ff4f40',//奖品选中颜色
    indexSelect: 0,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    imageAward: [
      { url: '../../images/gits1.png', name: 'Macbook Air' },
      { url: '../../images/gits2.png', name: '100M流量' },
      { url: '../../images/gits3.png', name: 'iPhone8' },
      { url: '../../images/gits4.png', name: '谢谢参与' },
      { url: '../../images/gits6.png', name: 'iPhoneXS' },
      { url: '../../images/gits4.png', name: '谢谢参与' },
      { url: '../../images/gits5.png', name: 'EOS单反套机' },
      { url: '../../images/gits4.png', name: '谢谢参与' }
    ],//奖品图片数组
    times: '80',//转盘转动的速度
    award:'',//中奖弹框
    name:'',//中奖奖品名称
  },
  look_rule(){
    wx.navigateTo({
      url: '../prize-rule/prize-rule',
    })
  },
  mine_prize(){
    wx.navigateTo({
      url: '../prize-list/prize-list',
    })
  },
  onReady: function () {
    this.msgbox = this.selectComponent("#msgbox");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  success(res){
    console.log(res.data)
  },
  fail(){
    consoe.log('接收失败')
  },
  onLoad: function () {
    call.getData('/index.php?store_id=1&r=api/pond/pond/index&_version=2.8.9&_platform=wx', this.success, this.fail, { access_token: wx.getStorageSync('access_token') })
    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#ffffff') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#ffffff',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#ffffff',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })

  },
  //开始游戏
  startGame: function () {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true,
    })
    var _this = this;
    //声明一个数组存八个点概率
    var ProArray = [0.125,0.375,0.125,0.375,0.125,0.375,0.125,0.25];//数组第一个对应转盘右上角奖品
    //随机数
    var ranNumber = Math.random() * 1000000;
    var jieguo = ranNumber / 1000000;
    console.log(jieguo);
    var result = [];
    var rep = [];
    var indexSelect = 0;
    //比较大小
    for (var i = 0; i < ProArray.length; i++) {
      if (jieguo < ProArray[i]) {
        result.push(ProArray[i]);
        rep.push(i);
      }
    }
    if (result.length == 0) {
      var maxres = ProArray[0];
      for (var i = 0; i < ProArray.length; i++) {
        if (maxres < ProArray[i]) maxres = ProArray[i];
      }
      for (var i = 0; i < ProArray.length; i++) {
        if (maxres == ProArray[i]) indexSelect = i;
      }
    } else {
      var maxres = result[0];
      for (var i = 0; i < result.length; i++) {
        if (maxres > result[i]) maxres = result[i];
      }
      for (var i = 0; i < result.length; i++) {
        if (maxres == result[i]) indexSelect = i;
      }
      for (var i = 0; i < rep.length; i++) {
        if (indexSelect == i) indexSelect = rep[i];
      }
    }
    console.log(indexSelect);
    var i = 0;
    var timer = setInterval(function () {
      indexSelect++;
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
      i += 40;
      if (i > 1000) {
        //去除循环
        clearInterval(timer)
        _this.setData({
          award: '',
          name:''
        })
        //获奖提示
        if (indexSelect == 3 || indexSelect == 5 ||indexSelect==7){
          _this.msgbox.showMsg();
        }else if (indexSelect==2){
          _this.setData({
            award: _this.data.imageAward[2].url,
            name: _this.data.imageAward[2].name
          })
          _this.msgbox.showMsg();//iPhone8
        }else if (indexSelect == 4) {
          _this.setData({
            award: _this.data.imageAward[4].url,
            name: _this.data.imageAward[4].name
          })
          _this.msgbox.showMsg();//iPhoneXS
        }else if (indexSelect == 6) {
          _this.setData({
            award: _this.data.imageAward[6].url,
            name: _this.data.imageAward[6].name
          })
          _this.msgbox.showMsg();//EOS单反
        }else if (indexSelect == 8) {
          _this.setData({
            award: _this.data.imageAward[0].url,
            name: _this.data.imageAward[0].name
          })
          _this.msgbox.showMsg();//MacbookAir
        }else if (indexSelect == 1) {
          _this.setData({
            award: _this.data.imageAward[1].url,
            name: _this.data.imageAward[1].name
          })
          _this.msgbox.showMsg();//100M
        }
        _this.setData({ isRunning: false })
      }
      indexSelect = indexSelect % 8;
      _this.setData({
        indexSelect: indexSelect
      })
    }, (_this.data.times * 1 + i))
  }
})