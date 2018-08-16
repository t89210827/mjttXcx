// pages/city/city.js
var vm = null
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city_id: "", //城市id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this

    var city_id = options.city_id
    vm.setData({
      city_id: city_id
    })

    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
    })

    vm.scene_list()
  },

  //景点列表
  scene_list: function() {
    var param = {
      city_id: vm.data.city_id
    }
    util.scene_list(param, function(res) {
      console.log("景点列表：" + JSON.stringify(res))
      if (res.data.code == 0) {
        var sceneList = res.data.data
        vm.setData({
          sceneList: sceneList
        })
      }
    })
  },

  //跳转到地图详情页
  jumpCityMap: function() {
    var city_id = vm.data.city_id
    util.jumpPage(1, "/pages/scenicMap/scenicMap?city_id=" + city_id)
  },

  //跳转到支付页
  jumpPayPage: function() {
    var city_id = vm.data.city_id
    util.jumpPage(1, "/pages/pay/pay?city_id=" + city_id)
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
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