//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
var vm = this

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    pageTopHeight: "",
    // Ads: [{
    //     img: "http://dsyy.isart.me/tmp/wx9b70c1acbcfda86b.o6zAJs3FFzas02nMmUHEIaQsPMXk.OVXurZuWLLJ32f01adc53f71ad752b38e3a17ed1ed77.jpg"
    //   },
    //   {
    //     img: "http://dsyy.isart.me/tmp/wx9b70c1acbcfda86b.o6zAJs3FFzas02nMmUHEIaQsPMXk.l5cDqfdK5jFU2ac8b861754d88021a064f740cf964ec.jpg"
    //   },
    //   {
    //     img: "http://dsyy.isart.me/tmp/wx9b70c1acbcfda86b.o6zAJs3FFzas02nMmUHEIaQsPMXk.6jY9r28VjOAZ1d73af85d858d6d9c0561bc0e82c0c44.jpg"
    //   }
    // ],
    address: "", //城市
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
    vm.getSetting()
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'PBCBZ-YPUWO-NVKWB-SOH76-UI7D2-5XFBE'
    });

    vm.AllFunction()
  },

  //所有的方法
  AllFunction: function() {
    vm.ad_getADs()
    vm.hot_city()
  },

  //获取轮播图
  ad_getADs: function() {
    var param = {}
    util.ad_getADs(param, function(res) {
      console.log("获取轮播图接口返回：" + JSON.stringify(res))
      if (res.data.code == 0) {
        vm.setData({
          ads: res.data.data
        })
      }
    })
  },

  //热门城市
  hot_city: function() {
    util.ad_getADs({}, function(res) {
      console.log("热门城市接口返回：" + JSON.stringify(res))
      if (res.data.code == 0) {
        // vm.setData({
        //   ads: res.data.data
        // })
      }
    })
  },

  onShow: function() {

  },

  // 腾讯地图逆解析
  mapInverseResolution: function() {

    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // console.log("获取经纬度成功" + latitude)
        // 腾讯地图逆解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            console.log(JSON.stringify(res));
            var city = res.result.address_component.city
            vm.setData({
              address: city
            })
          },
          fail: function(res) {
            console.log(res);
          },
          // complete: function(res) {
          //   console.log(res);
          // }
        });
      },
      fail(err) {
        console.log("获取经纬度失败：" + JSON.stringify(err))
      }
    })



  },

  //获取位置
  getSetting: function() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        // 如果没授权
        if (!res.authSetting['scope.userLocation']) {
          // 提前授权
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              console.log("授权success结果：" + JSON.stringify(res))
              var errMsg = res.errMsg
              if (errMsg == "authorize:ok") {
                vm.mapInverseResolution()
              }

            },
            fail(err) {
              console.log("授权fail结果：" + JSON.stringify(err))
              var errMsg = err.errMsg
              if (errMsg == "authorize:fail auth deny") {
                vm.setData({
                  address: '推荐'
                })
              }
            }
          })
        } else {
          vm.mapInverseResolution()
        }
      }
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