var app = getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    beauticianId:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.data.beauticianId = options.serviceId;
    console.log("beauticianId", that.data.beauticianId);
    // 查看token
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    var that = this;
    if (app.globalData.accessToken) {
      that.getPersonnel();
    } else {
      util.init(that.getPersonnel);
    }
    // 是否登录注册
    var that = this;
    var uid = wx.getStorageSync('uid');
    if (uid) {
      this.setData({
        authorizeShow: false
      });
    }else{
      this.setData({
        authorizeShow: true
      })
    }
  },
  // 授权得到用户信息
  bindGetUserInfo: function (e) {
    var that = this;
    if (!e.detail.userInfo) {
      return;
    }
    that.setData({
      authorizeShow: false
    })
    util.init(util.login);
  },
  // 获取员工列表
  getPersonnel:function(){
    var that=this;
    wx.request({
      url: config.apiList.getPersonnel,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.data.beauticianId,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("员工信息",res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          console.log("code不是1，过期");
          util.init(that.getPersonnel);
          return;
        }
        var new_person = [];
        var person=res.data.data;
        var date = Date.parse(new Date()).toString().substr(0,10);
        console.log(date)
        for(var idx in person){
          var day = util.timestampFormat(person[idx].original_day);
          var diff = parseInt(Math.abs(parseInt(date) - parseInt(day)) / 1000 / 60 / 60 / 24);
          console.log("相差天数",diff);
        }
        that.setData({
          person:res.data.data
        })
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  // 立即下单，选择时间
  onChooseTime:function(event){
    var personId=event.currentTarget.dataset.id;
    console.log(personId)
    wx.navigateTo({
      url: '../chooseTime/chooseTime',
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