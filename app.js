//app.js
var vm = null
App({
  onLaunch: function() {
    vm = this

    

    try {
      var res = wx.getSystemInfoSync()
      var screenHeight = res.statusBarHeight //状态栏高度
      var windowHeight = res.windowHeight //可用窗口高度
      var screenWidth = res.screenWidth //屏幕宽度
      var proportion = screenWidth / 750 //1px = ?rpx
      var place = screenHeight + (100 * proportion) //导航栏高度
      console.log("屏幕宽度" + JSON.stringify(place)) //状态栏加导航栏高度

      vm.globalData.screenHeight = screenHeight
      vm.globalData.windowHeight = windowHeight
      vm.globalData.proportion = proportion
      vm.globalData.place = place
    } catch (e) {
      // Do something when catch error
    }

  },

  globalData: {
    userInfo: null,
    screenHeight: null, //状态栏高度
    windowHeight: null, //可用窗口高度
    proportion: null, //1px = ?rpx
    place: null, //状态栏加导航栏高度
    searchHistory: [], //搜索历史
  }

})