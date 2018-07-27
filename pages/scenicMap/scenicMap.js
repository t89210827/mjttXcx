// pages/scenicMap/scenicMap.js
var vm = null
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      // iconPath: "../../images/destination.png",
      id: 0,
      latitude: 41.73482,
      longitude: 123.44972,
      alpha: 0,
      // width: 0,
      // height: 0,
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

    son_flag: false, //子景点控制器
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
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
    var place = screenHeight + 100 //导航栏高度
    var windowHeight = getApp().globalData.windowHeight - place + 80 //屏幕可用高度
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
      windowHeight: windowHeight,
    })
  },

  //子景点切换
  sonScenic: function() {
    vm.setData({
      son_flag: !vm.data.son_flag
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
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        console.log("精度" + latitude)
        console.log("纬度" + longitude)
        vm.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })

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