// pages/search/search.js
var vm = this
var util = require("../../utils/util.js")
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
    inputFocus: false, //输入框焦点  true:聚焦  false:失焦
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var screenHeight = getApp().globalData.screenHeight //状态栏高度
    var place = getApp().globalData.place //导航栏高度
    var proportion = getApp().globalData.proportion //1px = ?rpx
    var allHeight = place + (105 * proportion) //顶部全部高度

    var windowHeight = getApp().globalData.windowHeight //可用窗口高度
    var scrollHeight = windowHeight - allHeight - (200 * proportion) //滚动条高度    

    vm.setData({
      pageTopHeight: screenHeight,
      place: place,
      allHeight: allHeight,
      windowHeight: windowHeight,
      scrollHeight: scrollHeight
    })

    // vm = this
    // var screenHeight = getApp().globalData.screenHeight
    // var place = screenHeight + 100 //导航栏高度
    // var allHeight = place + 105 //顶部全部高度

    // var scrollHeight = windowHeight - allHeight - 200 //滚动条高度
    // vm.setData({
    //   pageTopHeight: screenHeight,
    //   place: place,
    //   allHeight: allHeight,
    //   windowHeight: windowHeight,
    //   scrollHeight: scrollHeight
    // })
  },

  //输入框聚焦
  focus: function(e) {
    vm.setData({
      inputFocus: true
    })
  },

  //输入框失去焦点时
  loseFocus: function(e) {
    vm.setData({
      inputFocus: false
    })
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
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
  jumpCountryPage: function() {
    util.jumpPage(1, "/pages/country/country")
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