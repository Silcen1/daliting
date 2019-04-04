// pages/evaluate/evaluate.js
var call = require("../../pages/util/request.js")
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    uploaderList: [],
    uploaderNum: 0, 
    showUpload: true,
    name:'',
    list:[],
    showed:true,
    comment:'',
    order_id:'',
    uploaded_pic_list:[]
  }, 
  comment_input(e) {
    var val = e.detail.value;
    this.setData({ comment: val });
  },
  image:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  }, 

// 上传图片
  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id=options.order_id;
    var name=options.name;
    this.setData({ name: name, order_id:order_id})
    call.getData('/index.php?store_id=1&r=api/order/comment-preview&type=mall',this.success,this.fail,{order_id:order_id,access_token:wx.getStorageSync('access_token')})
  },
  done() {
    if(this.data.comment.length==0){
      wx.showToast({
        title: '请输入评论',
        icon:"none",
        duration:1000
      })
    } else if (this.data.comment.length <15){
      wx.showToast({
        title: '评论最少15个字',
        icon:'none',
        duration:1000
      })
    } else {
      var that = this;
      for(var key in this.data.uploaderList){
        var url = this.data.uploaderList[key]
        var uploaded_pic_list = [];
        wx.uploadFile({
          url: call.host + '/index.php?store_id=1&r=api/default/upload-image',
          filePath:url,
          name: 'image',
          success(res){
            uploaded_pic_list.push(JSON.parse(res.data).data.url)
            console.log(uploaded_pic_list)
            that.setData({
              uploaded_pic_list: uploaded_pic_list
            })
          }
        })
      }
      var obj={};
      obj.order_id=this.data.order_id;
      var goods_list = [{ "order_detail_id": this.data.order_id, "goods_id": this.data.list.goods_list[0].goods_id, "goods_pic": this.data.list.goods_list[0].goods_pic, "score": 3, "content": this.data.comment, "pic_list": this.data.uploaderList, "uploaded_pic_list": this.data.uploaded_pic_list}];
      obj.goods_list=JSON.stringify(goods_list)
      obj.type='mall';
      obj.access_token=wx.getStorageSync('access_token');
      call.request('/index.php?store_id=1&r=api/order/comment', obj,this.success1,this.fail)
    }
  },
  success(res){
    console.log(res.data)
    this.setData({
      list:res.data
    })
  },
  success1(res){
    console.log(res)
    wx.showToast({
      title: res.msg,
      icon: 'success',
      duration: 1000,
      success() {
        wx.reLaunch({
          url: '../done/done',
        })
      }
    })
  },
  fail(){
    console.log('接收失败')
  }
})