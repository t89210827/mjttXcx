//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
var vm = this

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

var backgroundAudioManager = wx.getBackgroundAudioManager()

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
    address: "", //所在城市
    sceneList: [], //景点列表
    hot_city: [], //热门城市
    runningStatus: "pause",
    network: true, //网络状态
  },

  onLoad: function() {
    vm = this
    var screenHeight = getApp().globalData.screenHeight //状态栏高度
    var place = getApp().globalData.place //导航栏高度
    var proportion = getApp().globalData.proportion //1px = ?rpx
    var allHeight = place + (105 * proportion) //顶部全部高度
    var windowHeight = getApp().globalData.windowHeight - allHeight - screenHeight - place //窗口可用高度
    vm.setData({
      pageTopHeight: screenHeight,
      place: place,
      allHeight: allHeight,
      windowHeight: windowHeight
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'PBCBZ-YPUWO-NVKWB-SOH76-UI7D2-5XFBE'
    });

    vm.AllFunction()
  },

  //所有的方法
  AllFunction: function() {
    vm.ad_getADs() //获取轮播图
    vm.hot_city() //热门城市
    // vm.getSetting() //获取位置
    vm.isLogin() //判断是否登录
  },

  //刷新
  refresh: function() {
    vm.setData({
      network: true
    })
    vm.AllFunction()
    vm.getSetting() //获取位置
  },

  //判断是否登录
  isLogin: function() {
    var userInfo = wx.getStorageSync("userInfo");
    console.log("判断是否登录：" + JSON.stringify(userInfo))
    if (userInfo == "") {
      util.jumpPage(1, "/pages/getUserInfoPage/getUserInfoPage")
    }
  },

  //获取轮播图
  ad_getADs: function() {
    var param = {}
    util.ad_getADs(param, function(res) {
      // console.log("获取轮播图接口返回：" + JSON.stringify(res))
      if (res.data.code == 0) {
        vm.setData({
          ads: res.data.data
        })
      }
    }, function(err) {
      vm.setData({
        network: false
      })
    })
  },

  //热门城市
  hot_city: function() {
    util.hot_city({}, function(res) {
      // console.log("热门城市接口返回：" + JSON.stringify(res))
      if (res.data.code == 0) {
        var hot_city = res.data.data
        vm.setData({
          hot_city: hot_city
        })
      }
    }, function(err) {
      vm.setData({
        network: false
      })
    })
  },

  onShow: function() {
    vm.getSetting() //获取位置
  },

  //用户所在 城市与附近景点列表
  miniapp_nearby_city_scene_list: function() {
    var param = {
      longitute: vm.data.longitude,
      latitute: vm.data.latitude
    }
    util.miniapp_nearby_city_scene_list(param, function(res) {
      if (res.data.code == 0) {
        var address = res.data.data.city.name
        var sceneList = res.data.data.scene_list

        for (var i = 0; i < sceneList.length; i++) {
          sceneList[i].playStatus = 'stop'
        }

        vm.setData({
          address: address,
          sceneList: sceneList,
        })
        console.log("用户所在城市与附近景点列表返回：" + JSON.stringify(res))
      }
    }, function(err) {
      vm.setData({
        network: false
      })
    })

  },

  // 腾讯地图逆解析
  mapInverseResolution: function() {

    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed //	速度
        var accuracy = res.accuracy //	位置的精确度
        vm.setData({
          longitude: longitude,
          latitude: latitude
        })
        vm.miniapp_nearby_city_scene_list() //用户所在 城市与附近景点列表
        // console.log("获取经纬度成功" + latitude)
        // 腾讯地图逆解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            // console.log(JSON.stringify(res));
            var city = res.result.address_component.city
          },
          fail: function(res) {
            console.log(res);
          },
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
  jumpCityPage: function(e) {
    var city_id = e.target.id
    util.jumpPage(1, "/pages/city/city?city_id=" + city_id)
  },

  // 跳转到城市地图页面
  jumpCityMapPage: function() {
    util.jumpPage(1, "/pages/cityMap/cityMap")
  },

  // 跳转到景点地图页面
  jumpscenicMapPage: function(e) {

    var index = e.currentTarget.id
    var sceneList = vm.data.sceneList
    // console.log(JSON.stringify(sceneList[index]))
    if (sceneList[index].playStatus == 'stop') {
      console.log("播放")
      util.showLoading()

      backgroundAudioManager.src = sceneList[index].audios[0].audio // 设置了src之后会自动播放      
      backgroundAudioManager.title = sceneList[index].audios[0].title
      sceneList[index].playStatus = 'play'

      for (var i = 0; i < sceneList.length; i++) {
        if (index != i) {
          sceneList[i].playStatus = 'stop'
        }
      }

      vm.play(sceneList[index].audios[0])
      vm.setData({
        sceneList: sceneList
      })

    } else if (sceneList[index].playStatus == 'pause') {
      console.log("暂停之后播放")
      backgroundAudioManager.play()
      sceneList[index].playStatus = 'play'
      vm.setData({
        sceneList: sceneList
      })
    } else {
      console.log("暂停")
      vm.pause()
      sceneList[index].playStatus = 'pause'
      vm.setData({
        sceneList: sceneList
      })
    }
    // if (sceneList[index].subscene == 0) {
    //   console.log("子景点为零")
    // } else { 
    //   util.jumpPage(1, "/pages/scenicMap/scenicMap")
    // }
  },

  // 继续播放


  //播放
  play: function(audio) {
    backgroundAudioManager.play()
  },

  //暂停
  pause: function() {
    var percentage = backgroundAudioManager.currentTime / backgroundAudioManager.duration
    backgroundAudioManager.pause()
    vm.progressBar(percentage)
  },

  progressBar: function(percentage) {
    var p = Math.round(percentage * 100);
    var deg = p * 3.6;
    var right = "";
    var left = "";
    var desc = "";
    if (p > 100 || p < 0) p = 100;
    if (deg <= 180) {
      right = "transform:rotate(" + (deg - 180) + "deg);"
      left = "background:#fff;"
      vm.setData({
        right: right,
        left: left,
      })
    } else {
      right = "transform:none;"
      left = "background:#e31c17;transform:rotate(" + (deg - 360) + "deg);"
      vm.setData({
        right: right,
        left: left,
      })
    }
  },


  // 跳转到城市选择页面
  jumpSelectCity: function() {
    util.jumpPage(1, "/pages/selectCity/selectCity")
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    backgroundAudioManager.onPlay(function(res) {
      // console.log("播放回调")
    })
    backgroundAudioManager.onPause(function(res) {
      // console.log("播放暂停")
    })
    backgroundAudioManager.onStop(function(res) {
      // console.log("播放停止")
    })
    // 自动播放停止
    backgroundAudioManager.onEnded(function(res) {
      console.log("播放自动停止")
      var sceneList = vm.data.sceneList

      for (var i = 0; i < sceneList.length; i++) {
        sceneList[i].playStatus = 'stop'
      }

      vm.setData({
        sceneList: sceneList
      })

    })

    // 播放进度更新
    backgroundAudioManager.onTimeUpdate(function(res) {
      var percentage = backgroundAudioManager.currentTime / backgroundAudioManager.duration
      vm.progressBar(percentage)
    })

    // 音频进入可以播放状态，但不保证后面可以流畅播放
    backgroundAudioManager.onCanplay(function(res) {
      console.log("首页暂停loading")
      util.hideLoading()
    })

    // 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
    backgroundAudioManager.onWaiting(function(res) {
      util.showLoading()
    })

  },

})