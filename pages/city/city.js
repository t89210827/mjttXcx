// pages/city/city.js
var vm = null
var util = require("../../utils/util.js")

var backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**`
   * 页面的初始数据
   */
  data: {
    city_id: "", //城市id
    right: "", //进度条样式
    left: "", //进度条样式
    desc: "", //进度条样式
    lock_list: "", //解锁类型列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this

    var city_id = options.city_id
    vm.setData({
      city_id: parseInt(city_id)
    })

    var screenHeight = getApp().globalData.screenHeight
    var place = getApp().globalData.place //导航栏高度
    vm.setData({
      pageTopHeight: screenHeight,
      allHeight: place,
    })
    vm.scene_list() //获取景点列表
    vm.payment_price_info() //获取解锁类型列表
  },

  //获取解锁类型列表
  payment_price_info: function() {
    var param = {
      city_id: vm.data.city_id
    }
    util.payment_price_info(param, function(res) {
      console.log("解锁类型列表：" + JSON.stringify(res))
      vm.setData({
        lock_list: res.data.data
      })
    })
  },

  //景点列表
  scene_list: function() {
    var param = {
      city_id: vm.data.city_id
    }
    util.scene_list(param, function(res) {
      console.log("景点列表：" + JSON.stringify(res))
      if (res.data.code == 0) {
        var sceneList = res.data.data

        for (var i = 0; i < sceneList.length; i++) {
          sceneList[i].playStatus = 'stop'
        }

        vm.setData({
          sceneList: sceneList
        })
      }
    })
  },

  //点击播放或暂停按钮
  jumpscenicMapPage: function(e) {
    var index = e.currentTarget.id
    var sceneList = vm.data.sceneList
    // console.log(JSON.stringify(sceneList[index]))
    if (sceneList[index].playStatus == 'stop') {
      console.log("播放")

      vm.play(sceneList[index].audios[0])

      backgroundAudioManager.src = sceneList[index].audios[0].audio // 设置了 src 之后会自动播放      

      sceneList[index].playStatus = 'play'
      for (var i = 0; i < sceneList.length; i++) {
        if (index != i) {
          sceneList[i].playStatus = 'stop'
        }
      }
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
  },

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


  //跳转到地图详情页
  jumpCityMap: function() {
    var city_id = vm.data.city_id
    // util.jumpPage(1, "/pages/scenicMap/scenicMap?city_id=" + city_id)
    util.jumpPage(1, "/pages/webview/webview?city_id=" + city_id)
  },

  //跳转到支付页
  jumpPayPage: function() {
    var city_id = vm.data.city_id
    util.jumpPage(1, "/pages/pay/pay?city_id=" + city_id)
  },

  //返回
  back: function() {
    util.jumpPage(4, 1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //播放进度更新
    backgroundAudioManager.onTimeUpdate(function(res) {
      console.log("播放进度更新" + backgroundAudioManager.currentTime)
    })
  },

  //进度条
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