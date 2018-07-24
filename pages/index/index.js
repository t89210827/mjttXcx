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


  jumpSearch: function() {
    util.jumpPage(1, "/pages/search/search")
  }

})