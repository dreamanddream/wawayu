// pages/allEvaluation/allEvaluation.js
var app=getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeId:0,
    tagId:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.data.storeId = options.storeId;
    console.log("全部评论商店id", that.data.storeId);
    var that = this;
    // 查看token
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    if (app.globalData.accessToken) {
      that.getTags();
    } else {
      util.init(that.getTags);
    }
  },
  // 获取门店标签
  getTags:function(){
    var that=this;
    wx.request({
      url: config.apiList.getTags,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id:that.data.storeId,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          util.init(that.getTags);
          console.log("code不是1，过期");
          return;
        }
        that.setData({
          labelData: res.data.data
        })
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  // 根据标签加载评论
  onEvaluation:function(event){
    var that=this;
    that.data.tagId = event.currentTarget.dataset.id;
    console.log("that.data.tagId", that.data.tagId)
    wx.request({
      url: config.apiList.getComments,
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:that.data.storeId,
        tags_ids: that.data.tagId,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success:function(res){
        console.log("评论内容",res.data);
        var comments=res.data.data;
        var new_comments=[];
        for (var idx in comments){
          // console.log("star_time", create_time);
          var temp={
            create_time:util.timestampFormat(comments[idx].create_time),
            stars:comments[idx].stars,
            content: comments[idx].content,
            service_name:comments[idx].service_name,
            nickname:comments[idx].nickname,
            avatarurl:comments[idx].avatarurl
          }
          new_comments.push(temp);
        }
        that.setData({
          comments:new_comments,
          tagId: that.data.tagId
        })
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