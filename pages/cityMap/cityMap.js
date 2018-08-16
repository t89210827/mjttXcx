// pages/cityMap/cityMap.js
var vm = null
var util = require("../../utils/util.js")
Page({

  data: {
    markers: [{
      // iconPath: "../../images/destination.png",
      id: 0,
      latitude: 41.73482,
      longitude: 123.44972,
      alpha: 100,
      width: 100,
      height: 0,
      title: "123",
      anchor: {
        x: .5,
        y: 0
      },
      callout: {
        content: "颐和园",
        color: "#ececec",
        bgColor: "#ff0000",
        fontSize: 15,
        padding: 10,
        display: 'ALWAYS',
        textAlign: "center",
        borderRadius: 20,
      },
    }],
    city_list: [], //城市列表
    city_id: "", //城市索引
  },

  regionchange(e) {
    console.log(e.type)
  },
  //点击标记点事件
  markertap(e) {
    console.log("点击的标记点：" + e.markerId)
    var city_list = vm.data.city_list
    vm.setData({
      latitude: city_list[e.markerId].latitude,
      longitude: city_list[e.markerId].longitude,
      city_id: e.markerId
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
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
      windowHeight: windowHeight,
    })

    // var city_id = options.city_id
    // vm.setData({
    //   city_id: city_id
    // })
    // vm.scene_list()

    vm.upPageCityMap() //上一页的城市列表
  },

  //上一页的城市列表
  upPageCityMap: function() {
    var pages = getCurrentPages(); //获取当前页面信息栈
    var prevPage = pages[pages.length - 2] //获取上一个页面信息栈
    var city_list = prevPage.data.city_list //城市列表
    var markers = [] //标记数组

    for (var index in city_list) {
      if (city_list[index].latitude != 0) {
        console.log("经纬度：" + JSON.stringify(city_list[index].latitude))
        vm.setData({
          latitude: city_list[index].latitude,
          longitude: city_list[index].longitude,
          city_id: index,
          city_list: city_list
        })
        break;
      }
    }

    for (var index in city_list) {
      var cityIndex = {
        iconPath: "../../images/destination.png",
        id: index,
        latitude: city_list[index].latitude,
        longitude: city_list[index].longitude,
        alpha: 1, //标注的透明度
        width: 100,
        height: 50,
        title: "123", //标注点名
        anchor: {
          x: .5,
          y: -1
        }, //经纬度在标注图标的锚点，默认底边中点
        callout: {
          content: city_list[index].name,
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

  //景点列表
  // scene_list: function() {
  //   var param = {
  //     city_id: vm.data.city_id
  //   }
  //   util.scene_list(param, function(res) {
  //     console.log("景点列表：" + JSON.stringify(res))
  //   })
  // },

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
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function(res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy //	位置的精确度

    //     console.log("精度" + latitude)
    //     console.log("纬度" + longitude)
    //     vm.setData({
    //       latitude: latitude,
    //       longitude: longitude
    //     })
    //   }
    // })
    this.mapCtx = wx.createMapContext('map') // 使用 wx.createMapContext 获取 map 上下文
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