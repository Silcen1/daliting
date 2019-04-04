var call = require("../../pages/util/request.js")
Component({

  /**
   * 页面的初始数据
   */
  data: {
    showinfo: 'true',
    select: '',
    selects: '',
    num: 0,
    sum: '',
    isShow:false
  }, 
  properties: {
    num: Number,
    tip:String,
    size:Object,
    img:String,
    list:Object,
    goods_id:Number,
    price:Number,
    order:String,
    miaoshaid:Number,
    mch_id:Number
  },
  methods: {
    showStore() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    go_detail: function () {
      this.setData({
        isShow: false
      })
    },
    create_order: function () {
      var num = this.data.num
      var type = this.data.select
      var size = this.data.selects
      var price=this.data.list.price
      var pic=this.data.list.pic_list[0].pic_url
      var name=this.data.list.name
      var goods_num=this.data.size.num;
      var goods_id=this.data.goods_id;
      if(this.data.tip=='确定'){
          if(this.data.size[0]&&!type){
            wx.showToast({
              title: '请选择颜色或规格',
              icon:'none'
            })
          } else if (this.data.size[1]&& !size){
            wx.showToast({
              title: '请选择颜色或规格',
              icon: 'none'
            })
          }else {
            this.setData({ isShow: false })
            var obj={};
            var arr=[];
            for(var key in this.data.size){
              var type1=''
              var type1_id=''
              var size2=''
              var size2_id=''
              for(var may in this.data.size[key].attr_list){
                if (this.data.size[key].attr_list[may].attr_name == this.data.select || this.data.size[key].attr_list[may].attr_name == this.data.selects){
                  type1 = may
                }
              }
              arr.push({
                attr_group_id: this.data.size[key].attr_group_id,
                attr_group_name: this.data.size[key].attr_group_name,
                attr_id: this.data.size[key].attr_list[type1].attr_id,
                attr_name: this.data.size[key].attr_list[type1].attr_name
              })
            }
            var goods_list = [{ 'goods_id': this.data.goods_id, 'num': this.data.num, 'attr': arr}]
            obj.mch_list = JSON.stringify([{ 'mch_id': this.data.mch_id, 'goods_list': goods_list }])
            obj.access_token = wx.getStorageSync('access_token')
            var that=this
            wx.request({
              url: call.host +'/index.php?store_id=1&r=api/order/new-submit-preview',
              method:'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: obj,
              success(res){
                console.log(res)
                if(res.data.code==0){
                  wx.navigateTo({
                    url: '../create-order/create-order?num=' + num + '&type=' + type + '&size=' + size + '&price=' + price + '&pic=' + pic + '&name=' + name + '&goods_num=' + goods_num + '&goods_id=' + goods_id  + "&order=" + JSON.stringify(res.data)+'&attr='+JSON.stringify(arr),
      })
                }else{
                  wx.showToast({
                    title:'失败',
                    icon: "none",
                    duration: 2000
                  })
                }
              },
              fail(res){
                console.log(res.data.msg)
              }
            })
          }
      } else if (this.data.tip == '加入购物车') {
        if (this.data.size[0] && !type) {
          wx.showToast({
            title: '请选择颜色或规格',
            icon: 'none'
          })
        } else if (this.data.size[1] && !size) {
          wx.showToast({
            title: '请选择颜色或规格',
            icon: 'none'
          })
        }else {
          var obj = {};
          var arr = [];
          for (var key in this.data.size) {
            var type1 = ''
            var type1_id = ''
            var size2 = ''
            var size2_id = ''
            for (var may in this.data.size[key].attr_list) {
              if (this.data.size[key].attr_list[may].attr_name == this.data.select || this.data.size[key].attr_list[may].attr_name == this.data.selects) {
                type1 = may
              }
            }
            arr.push({
              attr_group_id: this.data.size[key].attr_group_id,
              attr_group_name: this.data.size[key].attr_group_name,
              attr_id: this.data.size[key].attr_list[type1].attr_id,
              attr_name: this.data.size[key].attr_list[type1].attr_name
            })
          }
          obj.goods_id = this.data.goods_id;
          obj.access_token = wx.getStorageSync('access_token');
          obj.num=this.data.num;
          obj.attr = JSON.stringify(arr)
          call.request('/index.php?store_id=1&r=api/cart/add-cart', obj, this.success, this.fail);
          this.setData({ isShow: false })
        }
      } else if (this.data.tip == '选择规格') {
        if (this.data.size[0] && !type) {
          wx.showToast({
            title: '请选择颜色或规格',
            icon: 'none'
          })
        } else if (this.data.size[1] && !size) {
          wx.showToast({
            title: '请选择颜色或规格',
            icon: 'none'
          })
        } else {
          this.setData({ isShow: false })
        }
      }
    },
    success(res) {
      console.log(res)
      if(res.code==0){
        wx.showToast({
          title: '加入购物车成功！',
          icon: 'success',
          duration: 2000
        }); 
      }
    },
    fail: function () {
      console.log("接收失败")
    },
    select_btnst: function (e) {
      var select = e.currentTarget.dataset.item;
      this.setData({
        select: select
      })
      this.triggerEvent('myevent', { color: select });
    },
    select_btnsts: function (e) {
      var selects = e.currentTarget.dataset.item;
      this.setData({
        selects: selects
      })
      this.triggerEvent('myevent', { g_size: selects });
    },
    count_number_nuadd: function () {
      var number_1 = this.data.num - 1;
      var price = this.data.price;
      var sum = (number_1 * price).toFixed(2)
      if (number_1 > 0) {
        this.setData({
          num:number_1,
          sum: sum 
        })
      }
    },
    count_number_add: function () {
      var number_2 = this.data.num + 1;
      var price = this.data.price;
      var sum=(number_2*price).toFixed(2)
      if (number_2 <= this.data.list.num) {
        this.setData({
          num:number_2,
          sum: sum 
        })
      }
      //console.log(number_2)
    },
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

  },
  selectBtn: function (event) {
    console.log(event.target.dataset.select);
    let bool = event.target.dataset.select;
    this.setData({
      showinfo: bool
    })
  }
})