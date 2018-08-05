// pages/orderList/orderList.js
var app = getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorizeShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var uid = wx.getStorageSync('uid');
    console.log("onload中的uid",uid);
    if (uid) {
      this.setData({
        authorizeShow: false
      })
    }
  },
  bindGetUserInfo: function(e) {
    var that = this;
    if (!e.detail.userInfo) {
      return;
    }
    that.setData({
      authorizeShow: false
    })
    // 用户点击授权后，这里可以做一些登陆操作
    util.init(util.login);
  },
  // 订单详情
  onOrderDetail: function() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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