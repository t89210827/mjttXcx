//app.js
var vm = null
App({
  onLaunch: function() {
    vm = this

    wx.getSystemInfo({
      success: function(res) {
        var screenHeight = res.statusBarHeight * 2 //状态栏高度
        var place = screenHeight + 100 //导航栏高度
        var allHeight = place + 105 //顶部全部高度
        console.log("设备高度" + JSON.stringify(screenHeight))
        vm.globalData.screenHeight = screenHeight
        // vm.globalData.userInfo = obj;
      },
    })

  },
  globalData: {
    userInfo: null,
    screenHeight: null, //状态栏高度
  }
})