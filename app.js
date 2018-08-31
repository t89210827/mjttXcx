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



  //微信登录
  login: function(callBack) {
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        var param = {
          code: code,
          busi_name: "kuaiwen"
        }
        util.user_getXCXOpenId(param, function(res) {
          if (res.data.result) {
            var openid = res.data.ret.openid
            var param = {
              account_type: "xcx",
              busi_name: "kuaiwen",
              ve_value1: openid,
            }
            util.user_login(param, function(res) {
              if (res.data.result) {
                console.log("wx:login:" + JSON.stringify(res.data.ret))
                var userInfo = res.data.ret
                vm.storeUserInfo(userInfo)
                callBack(userInfo)
              }
            })
          }
        })
        console.log("code:" + JSON.stringify(code))
      }
    })
  },

  //进行本地缓存
  storeUserInfo: function(obj) {
    // console.log("storeUserInfo :" + JSON.stringify(obj));
    wx.setStorage({
      key: "userInfo",
      data: obj
    });
    vm.globalData.userInfo = obj;
  },

  judgeuserInfo: function(callBack) {
    var userInfo = vm.globalData.userInfo
    if (userInfo == null || userInfo == undefined || userInfo == "") {
      //调用登录接口
      vm.login(function(call) {
        console.log("后台登陆:" + JSON.stringify(call))
        vm.judgeWxLogin()
        callBack(call)
      })
    } else {
      vm.judgeWxLogin()
      callBack(userInfo)
      console.log("本地有userInfo缓存:" + JSON.stringify(userInfo))
    }

  },

  //判断数据库中是否有用户微信信息
  judgeWxLogin: function() {
    var nick_name = getApp().globalData.userInfo.nick_name
    //判断数据库中是否有用户微信信息
    if (util.judgeIsAnyNullStr(nick_name)) {
      util.jumpPage(1, '/pages/getUserInfoPage/getUserInfoPage')
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