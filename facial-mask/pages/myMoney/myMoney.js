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
    app.globalData.uid=wx.getStorageSync('uid');
    if (app.globalData.accessToken) {
      that.get_money_log();
      that.getMoney();
    } else {
      util.init(that.get_money_log);
      uiil.init(that.getMoney);
    }
  },
  // 充值
  onRechargeMoney:function(){
    wx.navigateTo({
      url: '../rechargeMoney/rechargeMoney',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 获取账户余额
  getMoney:function(){
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
            money: res.data.data.money
          })
        },
        fail: function () {
          console.log("请求失败");
        }
      })
  },
  // 收支明细
  get_money_log: function () {
    var that = this;
    var paramData = {
      uid: app.globalData.uid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.get_money_log, paramData, processData);
    function processData(res) {
      var moneyDetail = res.data.data;
      console.log("收支明细", res.data);
      if (moneyDetail.length==0) {
        that.setData({
          abnor:true,
          moneyDetail:moneyDetail
        })
        return;
      }
      var temp = {};
      var new_moneyDetail = [];
      for (var idx in moneyDetail) {
        var dateline = util.timeYearMonth(moneyDetail[idx].dateline);
        var msg = moneyDetail[idx].msg.substr(0, moneyDetail[idx].msg.indexOf("："));
        temp = {
          dateline: dateline,
          msg: msg,
          value: moneyDetail[idx].value
        }
        new_moneyDetail.push(temp);
      }
      that.setData({
        moneyDetail: new_moneyDetail,
        abnor:false
      })
    }
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