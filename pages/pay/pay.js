// pages/pay/pay.js
var vm = null
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deblockingSwitch: 1, //购买类型  1城市解锁  2 国家解锁  3 全球解锁
    city_id: '', //城市id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    // var city_id = options.city_id
    var city_id = '13'
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
      city_id: city_id
    })
    vm.payment_price_info()
  },

  payment_price_info: function() {
    var param = {
      city_id: vm.data.city_id
    }
    util.payment_price_info(param, function(res) {
      console.log("解锁作品：" + JSON.stringify(res))
      vm.setData({
        lock_list: res.data.data
      })
    })
  },

  //解锁类型切换
  deblockingSwitch: function(e) {
    var deblockingSwitch = e.currentTarget.id
    vm.setData({
      deblockingSwitch: deblockingSwitch
    })
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
  },

  // 支付
  pay: function() {
    var userInfo = wx.getStorageSync("userInfo");
    console.log("用户信息" + JSON.stringify(userInfo))
    var deblockingSwitch = vm.data.deblockingSwitch
    var param = {}
    if (deblockingSwitch == 1) {
      param = {
        user_id: userInfo.id,
        purchase_type: "unlock_city",
        city_id: vm.data.city_id
      }
    } else if (deblockingSwitch == 2) {

    } else {
      param = {
        user_id: userInfo.id,
        purchase_type: "unlock_world",
      }
    }
    util.pay_pre_order(param, function(res) {
      console.log("支付信息" + JSON.stringify(res))
    })

    // wx.showActionSheet({
    //   itemList: ['支付成功', '支付失败'],
    //   success: function(res) {
    //     if (res.tapIndex == 0) {
    //       util.jumpPage(4, 1)
    //     } else if (res.tapIndex == 1) {
    //       util.jumpPage(1, "/pages/payFail/payFail")
    //     }
    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})