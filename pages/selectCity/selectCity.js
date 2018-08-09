// pages/selectCity/selectCity.js
var util = require("../../utils/util.js")
var vm = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityNavigation: 1,
    areaInitial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    areaInitialIndex: 'A', //地区索引
    areaInitial_flag: false, //屏幕首字母显示控制器
    showArea: "", //显示的字母
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    var windowHeight = getApp().globalData.windowHeight - place - 70 //屏幕可用高度
    var proportion = getApp().globalData.proportion //1px = ?rpx    
    var areaHeight = place + (120 * proportion) //地区首字母顶部位置
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
      windowHeight: windowHeight,
      areaHeight: areaHeight
    })
  },

  //切换导航
  switchNavigation: function(e) {
    var cityNavigation = e.target.id
    console.log("切换导航" + JSON.stringify(e))
    vm.setData({
      cityNavigation: cityNavigation,
    })
  },


  areaSelectStart: function(e) {
    console.log("触摸事件开始" + JSON.stringify(e))
    var areaInitialIndex = e.target.id
    var clientY = e.touches.clientY
    vm.setData({
      areaInitial_flag: true,
      areaInitialIndex: areaInitialIndex
    })
  },

  areaSelectEnd: function(e) {
    console.log("触摸事件结束" + JSON.stringify(e))
    vm.setData({
      areaInitial_flag: false
    })
  },

  //跳转到国家页
  jumpCountryPage: function () {
    util.jumpPage(1, "/pages/country/country")
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