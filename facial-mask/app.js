//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // console.log("获取存储的logs", logs);
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // 通过wx.login获取res.code，然后传递给后台
    //     if (res.code) {
    //       console.log("登录成功",res);
    //       //发起网络请求
    //       wx.request({
    //         url: '',
    //         data: {
    //           code: res.code
    //         },
    //         success:function(){
    //           // 将后台返回的数据存储
    //           wx.setStorageSync(key, data)({
    //             key: 'skey',
    //             data: '后台返回的内容',
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   },
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log("使用getUserInfo", res);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // });
    // 判断是否过期
    var loginFlag = wx.getStorageSync('skey');
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(未过期)
        success: function () {
          // 业务逻辑处理
        },

        // session_key 过期
        fail: function () {
          // session_key过期，重新登录
          wx.login();
        }
      });
    } else {
      // 无skey，作为首次登录
      wx.login();
    }
  },
  globalData: {
    userInfo: null,
    subDomain: "https://wwy.yzj520.com",
    appKey: 'LTAIwIAa2zZogmtg',
    appSecret: 'wmhyvKkeQQssnwAfsWtHXbjZrVXrItgk',
    tencentMapKey: "4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5",
    index:1,
    accessToken: null,
    authorizeShow:true,
    uid:null,
    telphone:null,
    genderType:null
  }
})