var config=require("./config.js");
var app=getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 项目初始化
function init(callback) {
  var that=this;
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
      app.globalData.accessToken =  wx.getStorageSync("accessToken");
      console.log("在init中打印1", wx.getStorageSync("accessToken"));
      callback();
      console.log("在init中打印2", wx.getStorageSync("accessToken"));
      setTimeout(function(){
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
}
// 时间戳处理
function timestampFormat(timestamp) {
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()+ ' ';
  var h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours() + ':';
  var m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
  var s = date.getSeconds();
  return Y + M + D + h + m;
}
// 只有日期
function timeYearMonth(timestamp){
  var date = new Date(timestamp * 1000);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate() + ' ';
  var h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours() + ':';
  var m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
  var s = date.getSeconds();
  return Y + M + D;
}
// 登录
function login(callback1){
    let that = this;
    // 首先获取登录凭证
    var  uid = wx.getStorageSync('uid');
    var telphone = wx.getStorageSync("telphone");
  console.log('telphone', telphone);
  console.log("uid",uid);
    // console.log("token",token);
    // 小程序登录界面，通过code查看token
    if(uid&&telphone){
      return;
    }
    wx.login({
      success: function (res) {
        wx.request({
          url: config.apiList.login,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            code: res.code,
            appKey: app.globalData.appKey,
            AccessToken: app.globalData.accessToken,
          },
          success: function (res) {
            console.log("查看请求登录接口返回的数据", res.data);
            if (res.data.code == "1006") {
              init(login);
              return;
            }
            if (JSON.stringify(res.data.data)=="{}"){
                register();
                return;
            }
            // 将后台返回的数据存储下来，同时也存储了uid，然后回到原来的页面
            wx.setStorageSync('telphone', res.data.data.telphone)
            wx.setStorageSync('uid', res.data.data.id);
            wx.setStorageSync("nickname", res.data.data.nickname);
            wx.setStorageSync("avatar", res.data.data.avatarurl);
            app.globalData.uid=wx.getStorageSync("uid");
            app.globalData.telphone=wx.getStorageSync("telphone");
            console.log("登录注册中打印uid和telphone", app.globalData.uid +"-"+ app.globalData.telphone);
            callback1();
          }
        })
      }
    })
};
// 注册
function register() {
  var that = this;
  wx.login({
    success: function (res) {
      var codesss = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
      console.log("登录时的res.code",res.code);
      wx.getUserInfo({
        success: function (res) {
          console.log("getUserInfo", res);
          var iv = res.iv;
          var encryptedData = res.encryptedData;
          // 下面开始调用注册接口
          wx.request({
            url: config.apiList.register,
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: codesss,
              encryptedData: encryptedData,
              iv: iv,
              appKey: app.globalData.appKey,
              AccessToken: app.globalData.accessToken,
            }, 
            // 设置请求的 参数
            success: (res) => {
              login();
              console.log("注册成功返回的数据",res.data);
              // wx.hideLoading();
            }
          })
        }
      })
    }
  })
}
// 发送请求
function http(url, data,callBack) {
  var that = this;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data:data,
    success: callBack,
    fail: function () {
      // that.setData({
      //   showLoading: false
      // })
      // message.show.call(that, {
      //   content: '网络开小差了',
      //   icon: 'offline',
      //   duration: 3000
      // })
      typeof fail_cb == 'function' && fail_cb()
    }
  })
}
module.exports = {
  formatTime: formatTime,
  init:init,
  timestampFormat: timestampFormat,
  login:login,
  register:register,
  http:http,
  timeYearMonth:timeYearMonth
}
