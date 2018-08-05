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
    app.globalData.uid=wx.getStorageSync("uid");
    if (app.globalData.accessToken) {
      that.get_exp_log();
    } else {
      util.init(that.get_exp_log);
    }
  },
  // 积分明细
  get_exp_log:function(){
    var that=this;
    var paramData={
      uid: app.globalData.uid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.get_exp_log,paramData,processData);
    function processData (res){
      var integral=res.data.data;
      if (res.data.data == 0) {
        that.setData({
          abnor: true,
          integral: integral
        })
        return;
      }
      var temp={};
      var new_integral=[];
      for(var idx in integral){
        var dateline = util.timeYearMonth(integral[idx].dateline);
        var msg = integral[idx].msg.substr(0, integral[idx].msg.indexOf("："));
        temp={
          dateline:dateline,
          msg:msg,
          value:integral[idx].value
        }
        new_integral.push(temp);
      }
      that.setData({
        integral: new_integral,
        abnor:false
      })
      console.log("积分明细",res.data);
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