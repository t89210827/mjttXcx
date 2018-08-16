// pages/scenicMap/scenicMap.js
var vm = null
var util = require("../../utils/util.js")
var backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  data: {
    markers: [{
      iconPath: "../../images/logo.png",
      id: 0,
      latitude: 41.73482,
      longitude: 123.44972,
      alpha: 1,
      width: 100,
      height: 100,
      title: "123",
      anchor: {
        x: .5,
        y: 0
      },
      label: {
        content: "颐和园",
        color: "#ececec",
        bgColor: "#ff0000",
        fontSize: 15,
        padding: 10,
        display: 'ALWAYS',
        textAlign: "center",
        borderRadius: 20,
        anchorX: 2,
        anchorY: 3,
      },
    }],
    son_flag: false, //子景点控制器

    scenicMapList: [{
      addres: "景仁宫",
      check: true
    }, {
      addres: "故宫",
      check: false
    }, {
      addres: "丽江",
      check: false
    }, {
      addres: "哈哈哈",
      check: false
    }, {
      addres: "中国",
      check: false
    }, {
      addres: "景仁宫",
      check: false
    }, {
      addres: "景仁宫",
      check: false
    }, {
      addres: "景仁宫",
      check: false
    }]
  },

  // 视野发生变化时触发
  regionchange(e) {
    // console.log("视野发生变化时触发" + JSON.stringify(e))
    this.mapCtx.getScale({
      success: function(res) {
        console.log(res.scale)
      }
    })

  },
  markertap(e) {
    console.log("地图标记点" + e.markerId)
    wx.showToast({
      title: 'e.markerId',
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this
    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    var windowHeight = getApp().globalData.windowHeight - place + 40 //屏幕可用高度
    console.log("顶部高度" + JSON.stringify(windowHeight))
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
      windowHeight: windowHeight,
    })

    var city_id = options.city_id
    vm.setData({
      city_id: city_id
    })
    // vm.scene_list() 景点列表
    vm.upPageCityMap() //景点列表
  },



  //上一页的城市列表
  upPageCityMap: function() {
    var pages = getCurrentPages(); //获取当前页面信息栈
    var prevPage = pages[pages.length - 2] //获取上一个页面信息栈
    var sceneList = prevPage.data.sceneList //景点列表
    var markers = [] //标记数组

    for (var index in sceneList) {
      if (index == 0) {
        sceneList[index].check = true
      } else {
        sceneList[index].check = false
      }

    }

    for (var index in sceneList) {
      if (sceneList[index].latitude != 0) {
        console.log("经纬度：" + JSON.stringify(sceneList[index].latitude))
        vm.setData({
          latitude: sceneList[index].latitude,
          longitude: sceneList[index].longitude,
          scene_id: index,
          sceneList: sceneList
        })
        break;
      }
    }

    for (var index in sceneList) {
      var cityIndex = {
        // iconPath: "../../images/destination.png",
        id: index,
        latitude: sceneList[index].latitude,
        longitude: sceneList[index].longitude,
        alpha: 1, //标注的透明度
        // width: 100,
        // height: 50,
        title: "123", //标注点名
        anchor: {
          x: .5,
          y: -1
        }, //经纬度在标注图标的锚点，默认底边中点
        callout: {
          content: sceneList[index].name,
          color: "#ececec",
          bgColor: "#ff0000",
          fontSize: 15,
          padding: 10,
          display: 'ALWAYS',
          textAlign: "center",
          borderRadius: 20,
        },
      }
      markers.push(cityIndex)
    }
    vm.setData({
      markers: markers
    })
  },

  //搜索结果切换
  slickSonScenic: function(e) {
    console.log("搜索结果切换" + JSON.stringify(e.currentTarget.id))
    var index = e.currentTarget.id
    var sceneList = vm.data.sceneList
    sceneList[index].check = true
    for (var i in sceneList) {
      if (i != index) {
        sceneList[i].check = false
      }
    }
    vm.setData({
      sceneList: sceneList,
      latitude: sceneList[index].latitude,
      longitude: sceneList[index].longitude,

    })
  },


  //景点列表
  scene_list: function() {
    var param = {
      city_id: vm.data.city_id
    }
    util.scene_list(param, function(res) {
      console.log("景点列表：" + JSON.stringify(res))
    })
  },


  //播放
  play: function() {
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
    console.log("音频播放")
    backgroundAudioManager.play()
  },

  //暂停
  pause: function() {
    backgroundAudioManager.pause()
  },





  //子景点切换
  sonScenic: function() {
    vm.setData({
      son_flag: !vm.data.son_flag,
    })
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
  },

  //跳转到支付页
  jumpPayPage: function() {
    util.jumpPage(1, "/pages/pay/pay")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    backgroundAudioManager.onPlay(function(res) {
      vm.setData({
        runningStatus: "play"
      })
      console.log("播放回调")
    })
    backgroundAudioManager.onPause(function(res) {
      vm.setData({
        runningStatus: "pause"
      })
      console.log("播放暂停")
    })

    backgroundAudioManager.onStop(function(res) {
      vm.setData({
        runningStatus: "pause"
      })
      console.log("播放停止")
    })

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     vm.setData({
    //       latitude: latitude,
    //       longitude: longitude
    //     })
    //   }
    // })

    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },


  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
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