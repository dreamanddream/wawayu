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
    var that=this;
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    app.globalData.uid=wx.getStorageSync("uid");
    var that = this;
    if (app.globalData.accessToken) {
      that.getConfig();
    } else {
      util.init(that.getConfig);
    }
  },
  // 获取个人设置信息
  getConfig:function(){
    var that=this;
    var uid=wx.getStorageSync("uid");
    wx.request({
      url: config.apiList.get_conf,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        uid: uid,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("getArea区域accessToken",uid);
        console.log(res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getConfig);
          console.log("code不是1，过期");
          return;
        }
        // if(res.data.data.gender=="1"){
        //   var genderType="男"
        // } else if (res.data.data.gender == "2"){
        //   var genderType="女"
        // } else 
        if (res.data.data.gender == "0"){
          var genderType="未设置"
        }
        if(!res.data.data.age){
          var age="未设置"
        }else{
          var age = res.data.data.age
        }
        if(!res.data.data.vocation){
          var vocation="未设置"
        }
        if(!res.data.data.style){
          var style="未设置"
        }
        that.setData({
          age:age,
          style: style,
          vocation:vocation,
          telphone:res.data.data.telphone,
          genderType: res.data.data.gender
        })
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  // 更换手机号
  onChangeTel: function () {
    wx.navigateTo({
      url: '../changeTel/changeTel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 设置年龄
  onYear:function(){
   var that=this;
   that.setData({
     year:true
   })
  },
  // 选择年龄
  onChooseYear:function(event){
    var that=this;
    that.data.yearId = event.currentTarget.dataset.yearid;
    that.setData({
      yearId: that.data.yearId
    })
  },
  // 确定选择年龄
  onYearResult: function () {
    var that = this;
    var paramData = {
      uid: app.globalData.uid,
      age: that.data.yearId,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.set_age, paramData, yearProcess);
    function yearProcess(res) {
      console.log("年龄点击确定", res.data);
      if (res.data.code == "1") {
        wx.showToast({
          title: '设置成功',
        })
      }
      that.setData({
        age: res.data.data.age,
        year: false
      })
      if (res.data.code == "1006") {
        wx.removeStorageSync('accessToken');
        util.init(that.onSexResult);
        console.log("code不是1，过期");
        return;
      }
    }
  },
  // 更改性别
  onSex:function(){
    var that=this;
    that.setData({
      sex:true
    })
  },
  // 选择性别
  onChooseSex:function(event){
    var that=this;
    that.data.sexId=event.currentTarget.dataset.sexid;
    that.setData({
      sexId: that.data.sexId
    })
  },
  // 选择性别点击确定
  onSexResult:function(){
    var that = this;
    var paramData = {
      uid: app.globalData.uid,
      id: that.data.sexId,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.set_sex, paramData, sexProcess);
    function sexProcess(res){
      console.log("性别点击确定",res.data);
      if(res.data.code=="1"){
        wx.showToast({
          title: '设置成功',
        })
      }
      that.setData({
        genderType:res.data.data.gender,
        sex:false
      })
      if (res.data.code == "1006") {
        wx.removeStorageSync('accessToken');
        util.init(that.onSexResult);
        console.log("code不是1，过期");
        return;
      }
    }
  },
  // 获取风格定位
  ongetStyle:function(){
    var that=this;
    var paramData={
      uid: app.globalData.uid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken,
    }
    util.http(config.apiList.get_style,paramData,getStyleData);
    function getStyleData(res){
      that.setData({
        styleType:res.data.data
      })
      console.log("获取风格定位",res.data);
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