// pages/login/login.js
var call = require("../../pages/util/request.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  bindGetUserInfo(e) {
  if (e.detail.rawData){
    var that = this
    wx.showLoading({
      title: '请稍等'
    })
    getApp().globalData.userInfo = e.detail.userInfo
    getApp().globalData.encrypted_data = e.detail.encryptedData
    getApp().globalData.iv = e.detail.iv
    getApp().globalData.signature = e.detail.signature
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log(res.code)
              //发起网络请求
              wx.request({
                url: 'https://i.daliting.com/web/index.php?store_id=1&r=api/passport/login',
                method: 'POST',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                  code:res.code,
                  user_info: JSON.stringify(e.detail.userInfo),
                  encrypted_data: e.detail.encryptedData,
                  iv: e.detail.iv,
                  signature: e.detail.signature
                },
                success(res) {
                  console.log(res)
                  if(res.data.code==0){
                  wx.setStorage({
                    key: 'access_token',
                    data: res.data.data.access_token,
                  })
                  wx.showToast({
                    title: '已登录',
                    icon: 'success',
                    duration: 1000,
                    success() {
                      setTimeout(() => {
                        wx.switchTab({
                          url: '/pages/index/index'
                        })
                      }, 1000)
                    }
                  })
                  }else{
                    wx.showToast({
                      title: '登录失败',
                      icon:'none',
                      duration:2000
                    })
                  }
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
    }else{
      wx.showToast({
        title: '授权后才能登录',
        icon:'none',
        duration:2000
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.checkSession({
      success(res){
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      fail(res){
        wx.showToast({
          title: '请登录',
          icon:"none",
          duration:1000,
          success(){
            setTimeout(()=>{
            },1000)
          }
        })
      }
    })
  }
})