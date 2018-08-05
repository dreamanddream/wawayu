// pages/myIntegral/myIntegral.js
var app = getApp();
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
    // 查看token
    var that = this;
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    if (app.globalData.accessToken) {
      that.getIntergralCoupon();
      that.getIntegral();
    } else {
      util.init(that.getIntergralCoupon);
      uiil.init(that.getIntegral);
    }
  },
  // 获取积分
  getIntegral: function () {
    var that = this;
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
        console.log("积分", res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getIntegral);
          console.log("code不是1，过期");
          return;
        }
        that.setData({
          exp: res.data.data.exp,
        })
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  // 根据积分获取可兑换的优惠券
  getIntergralCoupon: function () {
    var that = this;
    var paramData = {
      uid: app.globalData.uid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.get_coupon, paramData, dataProcess1);
    function dataProcess1(res) {
      var integral=res.data.data;
      that.setData({
        integral:integral
      })
      console.log("获取可兑换优惠券", res.data)
    }
  },
  // 积分兑换
  onExcharge:function(event){
    var that=this;
    var exchangeId=event.currentTarget.dataset.excharge;
    var paramData={
      id:exchangeId,
      uid: app.globalData.uid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.receive_coupon, paramData,dataProcess2);
    function dataProcess2(res) {
      if(res.data.data.code=="1"){
          wx.showToast({
            title: '兑换成功',
          })
      };
      if (res.data.data.code ="1302"){
        wx.showToast({
          icon:'none',
          title: '积分不足，不能兑换',
        })
      }
      console.log("立即兑换", res.data)
    }
  },
  // 积分明细
  onIntegralDetail:function(){
    wx.navigateTo({
      url: '../integralDetail/integralDetail',
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