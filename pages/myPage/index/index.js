// pages/myPage/index/index.js
var vm = null
var util = require("../../../utils/util.js")
Page({

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
    })
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
  },
  showPopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.show();
  },
  hidePopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.hide();
  },

  //邀请码
  invitationCode: function(e) {
    console.log(JSON.stringify(e.detail.value))
    var value = e.detail.value
    vm.setData({
      value: value
    })
  },

  miniapp_invi_code_validation: function() {
    var userInfo = wx.getStorageSync("userInfo");
    var user_id = userInfo.id
    var param = {
      user_id: user_id,
      invi_code: vm.data.value
    }
    util.miniapp_invi_code_validation(param, function(res) {

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