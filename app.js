//app.js
var vm = null
App({
  onLaunch: function() {
    vm = this

    wx.getSystemInfo({
      success: function(res) {
        var screenHeight = res.statusBarHeight * 2 //状态栏高度
        var windowHeight = res.windowHeight * 2 //可用窗口高度
        var place = screenHeight + 100 //导航栏高度
        vm.globalData.screenHeight = screenHeight
        vm.globalData.windowHeight = windowHeight
        // vm.globalData.userInfo = obj;
      },
    })

  },

  globalData: {
    userInfo: null,
    screenHeight: null, //状态栏高度
    windowHeight: null, //可用窗口高度
  }

})