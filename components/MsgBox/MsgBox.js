Component({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false
  },
  properties: {
    award: String,
    name: String
  },
  methods: {
    showMsg() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    close(){
      this.setData({
        isShow: false
      })
    },
    draw(e){
      var award = e.currentTarget.dataset.name;
      var url=e.currentTarget.dataset.url
      wx.navigateTo({
        url: '../prize-list/prize-list?award='+award+'&url='+url,
      })
      this.setData({
        isShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = JSON.parse(options.num)
    if (options.num == null) {
      wx.showToast({
        title: '数据为空',
      })
      return;
    }
    this.setData({
      num: num
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})