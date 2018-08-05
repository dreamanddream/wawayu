// //index.js
// //获取应用实例
// const app = getApp();
// Page({
//   data: {
//     choose:false,
//     motto: 'Hello World',
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     var that = this;
//     if (app.globalData.userInfo) {
//       console.log("状态1看看全局变量", app.globalData.userInfo)
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     };
//     // 判断是否授权获取用户登录信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               that.setData({
//                 userInfo: res.userInfo,
//                 hasUserInfo: true,
//                 choose: false
//               })
//               // that.globalData.userInfo = res.userInfo;
//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               // if (this.userInfoReadyCallback) {
//               //   this.userInfoReadyCallback(res)
//               // }
//             }
//           })
//         }
      
//       }
//     })
//   },
//   // 组件提醒授权
//   onReady: function () {
//     //获得dialog组件
//     this.dialog = this.selectComponent("#dialog");
//   },
//   showDialog: function () {
//     this.dialog.showDialog();
//   },

//   confirmEvent: function () {
//     this.dialog.hideDialog();
//   },

//   bindGetUserInfo: function () {
//     // 用户点击授权后，这里可以做一些登陆操作
//     this.login();
//   },
//   // 点击按钮获取用户信息
//   getUserInfo: function (e) {
//     var that=this;
//     // console.log("用户点击按钮获取登录状态信息",e);
//     // console.log("e.datail.errMsg",e.detail.errMsg)
//     // console.log("e.detail.userInfo",e.detail.userInfo)
//     // console.log("e.detail.rawData",e.detail.rawData)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
var app=getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    index: 1,
    cid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // uid,telphone
    app.globalData.uid=wx.getStorageSync("uid");
    app.globalData.telphone = wx.getStorageSync("telphone")
    // if (app.globalData.uid && app.globalData.telphone) {
    //   this.setData({
    //     authorizeShow: false
    //   });
    //   that.onUser();
    // }else{
    //   this.setData({
    //     authorizeShow: true
    //   });
    // }
    // token
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    if (app.globalData.accessToken){
      if (app.globalData.uid && app.globalData.telphone){
        that.getIntegral();
        that.getMyCoupon();
        that.setData({
          authorizeShow: false
        });
      }else{
        that.setData({
          authorizeShow: true
        });
      }
    }
    // if (app.globalData.accessToken&&app.globalData.uid && app.globalData.telphone) {
    //   that.getIntegral();
    //   that.getMyCoupon();
    //   this.setData({
    //     authorizeShow: false
    //   });
    // } else {
    //   util.init(that.getIntegral);
    //   this.setData({
    //     authorizeShow: true
    //   });
    // }
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (!e.detail.userInfo) {
      return;
    }
    that.setData({
      authorizeShow: false
    })
    that.setData({
      nickName: e.detail.userInfo.nickName,
      avatar: e.detail.userInfo.avatarUrl
    })
    that.init(util.login(that.getInformation));
  },
  init: function (callback) {
    var that = this;
    wx.request({
      url: config.apiList.getToken,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        appKey: app.globalData.appKey,
        appSecret: app.globalData.appSecret
      },
      success: function (res) {
        // console.log("这是util中得init", res.data);
        wx.setStorageSync('accessToken', res.data.data.accessToken);
        app.globalData.accessToken = wx.getStorageSync("accessToken");
        console.log("在init中打印1", wx.getStorageSync("accessToken"));
        callback;
        console.log("在init中打印2", wx.getStorageSync("accessToken"));
        setTimeout(function () {
          wx.removeStorageSync("accessToken");
          console.log("7200后执行删除accessToken");
        }, 6600000);
        //   key: "accessToken",
        //   data: res.data.data.accessToken
        // })
      },
      fail: function (res) {
        console.log("请求调试接口失败");
      }
    })
  },
  getInformation:function(){
    var that=this;
    app.globalData.uid = wx.getStorageSync("uid");
    app.globalData.telphone = wx.getStorageSync("telphone")
    if (app.globalData.uid && app.globalData.telphone) {
      console.log("看看这个是否执行了");
      that.getIntegral();
      that.getMyCoupon();
      that.setData({
        authorizeShow: false
      });
    }
  },
  // 渲染用户信息
  onUser:function(){
    var that=this;
    // 获取用户信息，同时让用户登录
    var nickname = wx.getStorageSync('nickname');
    var avatarUrl = wx.getStorageSync("avatar");
    that.setData({
      nickName: nickname,
      avatar: avatarUrl
    })
  },
  // 获取积分和余额
  getIntegral:function(){
    var that=this;
    wx.request({
      url: config.apiList.get_money,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        uid: app.globalData.uid,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("积分",res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getIntegral);
          console.log("code不是1，过期");
          return;
        }
        that.setData({
          exp:res.data.data.exp,
          money:res.data.data.money
        })
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  // 获取我的优惠券
  getMyCoupon:function(){
    var that=this;
    var paramData={
      uid: app.globalData.uid,
      cid: that.data.cid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.get_mycoupon,paramData,dataProcess);
    function dataProcess(res){
      if (res.data.data.length>0){
        that.setData({
          coupon:res.data.data.length
        })
      }else{
        that.setData({
          coupon: "无可用的优惠券"
        })
      }
      
      console.log("获取我的优惠券",res.data)
    }
  },
  // 历史评价
  onMyHistory:function(){
    wx.navigateTo({
      url: '../myHistoryEvaluate/myHistoryEvaluate',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  // 查看我的可兑换优惠券
  onMyCoupon:function(){
    wx.navigateTo({
      url: '../myCoupon/myCoupon',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 查看我的积分
  onIntegral:function(){
    wx.navigateTo({
      url: '../myIntegral/myIntegral',
    })
  },
  // 查看我的余额
  onMyMoney:function(){
    wx.navigateTo({
      url: '../myMoney/myMoney',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 个人设置
  onSetting:function(){
    wx.navigateTo({
      url: '../setting/setting',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var telphone = wx.getStorageSync('telphone');
    // if (!telphone) {
    //   wx.navigateTo({
    //     url: '../changeTel/changeTel',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
