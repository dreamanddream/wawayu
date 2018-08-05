var app=getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看token
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    var that = this;
    if (app.globalData.accessToken) {
      that.getCheck();
    } else {
      util.init(that.getCheck);
    }
  },
  // 核对订单
  getCheck:function(){
    var that=this;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: config.apiList.settlement,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        wid:8 ,
        uid: uid,
        tid:8,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("核对订单",res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getCheck);
          console.log("code不是1，过期");
          return;
        }
        var addressData = res.data.data;
        for (var idx in addressData) {
          var cityData = addressData[idx];
          if (cityData.active) {
            that.data.adcode = cityData.adcode;
            that.getBanners();
            that.getSellers();
          }
        }
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  onCoupon: function () {
    wx.navigateTo({
      url: '../chooseCoupon/chooseCoupon',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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