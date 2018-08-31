// pages/country/country.js
var vm = null
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    country_id: '', //国家id
    city_list: [], //城市地址
    map: '', //地图图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var country_id = options.country_id
    vm.setData({
      country_id: country_id
    })
    console.log("国家id： " + JSON.stringify(country_id))
    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
    })
  },

  //城市列表
  city_list: function() {
    var param = {
      country_id: vm.data.country_id
      // country_id: 88
    }
    util.city_list(param, function(res) {
      if (res.data.code == 0) {
        console.log("城市列表：" + JSON.stringify(res))
        var city_list = res.data.data
        var map = ""
        for (var index in city_list) {
          if (city_list[index].map != "") {
            map = city_list[index].map
            break
          }
        }
        vm.setData({
          city_list: city_list,
          map: map
        })
      } else {
        console.log("城市列表错误返回：" + JSON.stringify(res))
      }
    })
  },

  //跳转到景点列表页
  jumpscenicMapPage: function(e) {
    var city_id = e.currentTarget.id
    util.jumpPage(1, "/pages/city/city?city_id=" + city_id)
  },

  // 跳转到城市地图页面
  jumpCityMapPage: function() {
    // var latitude = vm.data.city_list[0].latitude
    // var longitude = vm.data.city_list[0].longitude
    util.jumpPage(1, "/pages/countryMap/countryMap?country_id=" + vm.data.country_id)
  },

  // 跳转到城市页面
  jumpCityPage: function() {
    // util.jumpPage(1, "/pages/countryMap/countryMap?country_id=" + vm.data.country_id)

    util.jumpPage(1, "/pages/city/city")
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    vm.city_list()
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