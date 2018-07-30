//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
var vm = this

Page({
  data: {
    pageTopHeight: "",
    Ads: [{
        img: "http://dsyy.isart.me/tmp/wx9b70c1acbcfda86b.o6zAJs3FFzas02nMmUHEIaQsPMXk.OVXurZuWLLJ32f01adc53f71ad752b38e3a17ed1ed77.jpg"
      },
      {
        img: "http://dsyy.isart.me/tmp/wx9b70c1acbcfda86b.o6zAJs3FFzas02nMmUHEIaQsPMXk.l5cDqfdK5jFU2ac8b861754d88021a064f740cf964ec.jpg"
      },
      {
        img: "http://dsyy.isart.me/tmp/wx9b70c1acbcfda86b.o6zAJs3FFzas02nMmUHEIaQsPMXk.6jY9r28VjOAZ1d73af85d858d6d9c0561bc0e82c0c44.jpg"
      }
    ]
  },

  onLoad: function() {
    vm = this
    var screenHeight = getApp().globalData.screenHeight //状态栏高度
    var place = getApp().globalData.place //导航栏高度
    var proportion = getApp().globalData.proportion //1px = ?rpx
    var allHeight = place + (105 * proportion) //顶部全部高度
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