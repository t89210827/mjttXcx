// pages/search/search.js
var vm = this
var util = require("../../utils/util.js")
var country = require("../../utils/country.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityNavigation: 1, //国家城市导航
    // areaInitial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    areaInitial: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    areaInitialIndex: 'a', //地区索引
    areaInitial_flag: false, //屏幕首字母显示控制器
    showArea: "", //显示的字母
    inputFocus: false, //输入框焦点  true:聚焦  false:失焦
    countryJson: {}, //城市列表
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
    var searchResultListHeight = windowHeight - allHeight //搜索结果滚动条高度        
    var scrollHeight = windowHeight - allHeight - (200 * proportion) //滚动条高度    

    vm.setData({
      pageTopHeight: screenHeight,
      place: place,
      allHeight: allHeight,
      windowHeight: windowHeight,
      scrollHeight: scrollHeight,
      searchResultListHeight: searchResultListHeight
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
  jumpCountryPage: function(e) {
    var country_id = e.target.id
    util.jumpPage(1, "/pages/country/country?country_id=" + country_id)
  },

  //跳转到国家页
  jumpCityPage: function(e) {
    var city_id = e.target.id
    util.jumpPage(1, "/pages/city/city?city_id=" + city_id)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // vm.search_table() //搜索页面国内,国际城市,国家表格
    var countryJson = country.country
    // for (var key in countryJson.home_city) {
    //   console.log("国内国家键值 " + JSON.stringify(key))
    // }
    vm.setData({
      countryJson: countryJson
    })
  },

  //搜索页面国内,国际城市,国家表格
  search_table: function() {
    util.search_table({}, function(res) {
      if (res.data.code == 0) {
        console.log("搜索页面国内,国际城市,国家表格" + JSON.stringify(res))
      }
    })
  },

  //输入框聚焦
  focus: function(e) {
    vm.setData({
      inputFocus: true
    })
  },

  //键盘输入时触发
  bindinput: function(e) {
    console.log("键盘输入时触发" + JSON.stringify(e))
    var keyword = e.detail.value
    var searchHistory = getApp().globalData.searchHistory
    searchHistory.unshift(keyword)
    getApp().globalData.searchHistory = searchHistory
    vm.setData({
      searchHistory: searchHistory
    })
    vm.search_global(keyword)
  },

  //输入框失去焦点时
  loseFocus: function(e) {
    vm.setData({
      inputFocus: false
    })
  },

  //全局搜索
  search_global: function(keyword) {
    var param = {
      keyword: keyword
    }
    util.search_global(param, function(res) {
      if (res.data.code == 0) {
        var searchResult = res.data.data
        vm.setData({
          searchResult: searchResult
        })
        console.log("全局搜索" + JSON.stringify(searchResult))
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var searchHistory = getApp().globalData.searchHistory
    vm.setData({
      searchHistory: searchHistory
    })
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