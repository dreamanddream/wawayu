// pages/changeTel/changeTel.js
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
    var that = this;
    // 查看token
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    if (!app.globalData.accessToken) {
      that.init();
    } 
  },
  // 绑定手机号
  formSubmit:function(event){
    var that=this;
    var uid = wx.getStorageSync("uid");
    that.data.tel=event.detail.value.tel;
    var checkCode=event.detail.value.checkCode;
    console.log("打印出checkCode",checkCode);
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(that.data.tel)){
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '手机号格式有误',
      });
      return;
    }
    if(!checkCode){
      wx.showToast({
        icon:'none',
        title: '验证码不能为空',
      })
      return;
    }
    wx.request({
      url: config.apiList.bindTelphone,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        uid: uid,
        telphone: that.data.tel,
        code: checkCode,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("填写的手机号",that.data.tel);
        console.log("getArea区域accessToken", uid);
        console.log("获取绑定手机号",res.data);
        wx.setStorageSync("telphone", res.data.data.telphone);
        app.globalData.telphone = wx.getStorageSync("telphone");
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getAddress);
          console.log("code不是1，过期");
          return;
        }

      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  // 获取input中输入的内容
  myTel:function(event){
    var that=this;
    that.data.tel=event.detail.value;
    console.log("input失焦后", typeof (that.data.tel));
  },
  // 获取验证码
  onGetcode:function(event){
    var that=this;
    that.data.tel = parseInt(that.data.tel)+1;
    wx.request({
      url: config.apiList.send_code,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        telphone: that.data.tel,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("类型", typeof (that.data.tel));
        console.log("转换后的手机号",that.data.tel);
        console.log(Number.isInteger(that.data.tel))
        console.log("验证码返回信息", res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getAddress);
          console.log("code不是1，过期");
          return;
        }

      },
      fail: function () {
        console.log("请求失败");
      }
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