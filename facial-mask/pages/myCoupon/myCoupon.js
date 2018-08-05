// pages/myCoupon/myCoupon.js
var app = getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看token
    var that = this;
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    if (app.globalData.accessToken) {
      that.getCoupon();
    } else {
      util.init(that.getCoupon);
    }
    app.globalData.uid = wx.getStorageSync("uid");
  },
  // 获取全部优惠券
  getCoupon:function(){
    var that=this;
    var paramData={
      uid: app.globalData.uid,
      cid:that.data.cid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken  
    }
    util.http(config.apiList.get_mycoupon,paramData,processData);
    function processData(res){
      var coupons=res.data.data;
      if(res.data.data.length==0){
        that.setData({
          abnor: true,
          coupons: coupons
        })
      }else{
        that.setData({
          coupons: coupons,
          abhor:false
        })
      }
     
      if (res.data.code == "1006") {
        wx.removeStorageSync('accessToken');
        util.init(that.getCoupon);
        console.log("code不是1，过期");
        return;
      }
      console.log("获取我的全部优惠券",res.data);
    }
  },
  // 查看不同类型优惠券
  onChooseCoupon:function(event){
    var that=this;
    var myCid=event.currentTarget.dataset.cid;
    var paramData={
      uid: app.globalData.uid,
      cid: myCid,
      appKey: app.globalData.appKey,
      AccessToken: app.globalData.accessToken
    }
    that.setData({
      cid:myCid
    })
    util.http(config.apiList.get_mycoupon, paramData, processData2);
    function processData2(res){
      var coupons = res.data.data;
      console.log("点击获取优惠券不同类型", myCid, res.data);
      if (res.data.data.length == 0 && myCid == 0){
        that.setData({
          abnor: true,
          coupons:coupons
        })
        return;
      } else if(res.data.data.length==0&&myCid==1){
          that.setData({
            abnor:true,
            coupons: coupons
          })
        return;
      } else if (res.data.data.length == 0 && myCid == 2){
        that.setData({
          abnor: true,
          coupons: coupons
        })
        return;
      } else if (res.data.data.length == 0 && myCid == 3){
        that.setData({
          abnor: true,
          coupons: coupons
        })
        return;
      }
      that.setData({
        abnor: false,
        coupons: coupons
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