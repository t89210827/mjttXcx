// pages/pay/pay.js
var vm = null
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deblockingSwitch: 1 //购买类型  1城市解锁  2 全球解锁
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var screenHeight = getApp().globalData.screenHeight
    var place = screenHeight + 100 //导航栏高度
    var windowHeight = getApp().globalData.windowHeight - place + 80 //屏幕可用高度
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
      windowHeight: windowHeight,
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
    wx.showActionSheet({
      itemList: ['支付成功', '支付失败'],
      success: function(res) {
        if (res.tapIndex == 0) {
          util.jumpPage(4, 1)
        } else if (res.tapIndex == 1) {
          util.jumpPage(1, "/pages/payFail/payFail")
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
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