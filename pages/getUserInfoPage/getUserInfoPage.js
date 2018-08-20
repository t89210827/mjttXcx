// pages/getUserInfoPage/getUserInfoPage.js
var util = require("../../utils/util.js")
var vm = null
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
  },

  //点击获取用户信息接口返回信息
  getUserInfo: function(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      var encrypted_data = e.detail.encryptedData
      var iv = e.detail.iv
      //登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("code:" + JSON.stringify(res.code))
          var param = {
            code: res.code,
            encrypted_data: encrypted_data,
            iv: iv,
          }

          util.user_login(param, function(res) {
            console.log("登陆" + JSON.stringify(res))
          })

        }
      })

    } else if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      // getApp().showModal()
    }
    // console.log("用户信息" + JSON.stringify(userInfo))
  },

  //返回上一层
  back: function() {
    wx.navigateBack({
      delta: 1
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