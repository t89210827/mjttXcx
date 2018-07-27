//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
var vm = this

Page({
  data: {
    pageTopHeight: "",
    Ads: [{
        img: "http://twst.isart.me/o_1cfsgrrjinhlgm61gdfjsm1bqb9.png"
      },
      {
        img: "http://twst.isart.me/o_1cfsgrrjinhlgm61gdfjsm1bqb9.png"
      },
      {
        img: "http://twst.isart.me/o_1cfsgrrjinhlgm61gdfjsm1bqb9.png"
      }
    ]
  },

  onLoad: function() {
    vm = this
    var screenHeight = getApp().globalData.screenHeight
    var place = screenHeight + 100 //导航栏高度
    var allHeight = place + 105 //顶部全部高度
    vm.setData({
      pageTopHeight: screenHeight,
      place: place,
      allHeight: allHeight
    })
  },

  // 跳转到搜索页面
  jumpSearch: function() {
    util.jumpPage(1, "/pages/search/search")
  },

  // 跳转到我的页面
  jumpMyPage: function() {
    util.jumpPage(1, "/pages/myPage/index/index")
  },

  // 跳转到城市页面
  jumpCityPage: function() {
    util.jumpPage(1, "/pages/city/city")
  },

  // 跳转到城市地图页面
  jumpCityMapPage: function() {
    util.jumpPage(1, "/pages/cityMap/cityMap")
  },

  // 跳转到景点地图页面
  jumpscenicMapPage: function() {
    util.jumpPage(1, "/pages/scenicMap/scenicMap")
  },

  // 跳转到城市选择页面
  jumpSelectCity: function() {
    util.jumpPage(1, "/pages/selectCity/selectCity")
  }

})