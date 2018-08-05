var app = getApp();
var config = require("../../utils/config.js");
var util=require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lat: 1,
    lng: 1,
    storeId:1,
    showLoading: false,
    checkService:true,
    evalute:true,
    address:'',
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.data.storeId = parseInt(options.id);
    // console.log(that.data.storeId);
    // 查看token
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    var that = this;
    if (app.globalData.accessToken) {
      that.getStoreDetail();
    } else {
      util.init(that.getStoreDetail);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  getStoreDetail:function(){
    var that=this;
    wx.request({
      url: config.apiList.getStoreDetail,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        AccessToken:app.globalData.accessToken,
        id: that.data.storeId,
        appKey:app.globalData.appKey
      },
      success:function(res){
        console.log("商店详情页",res.data);
          if (res.data.code != "1") {
            wx.removeStorageSync('accessToken');
            util.init(that.getStoreDetail);
            console.log("token过期时显示");
            return;
          }
          var storeDetailData = res.data.data;
          // var banners_img = storeDetailData.images;
          // banners_img.substring(0,1);
          // banners_img.slice(-2,-1);
          // var new_banner=banners_img.split(",");
          // console.log("长度",banners_img.length);
          // console.log("chang",new_banner);
          // for(var idex in banners_img){
          //   var img={};
          //   img.images=banners_img[idex];
          //   new_banner.push(img);
          // }
          // console.log("new_banner",new_banner);
          // for (var idx in storeDetailData) {
          //   var storeDetail = storeDetailData[idx];
          //   if (cityData.active) {
          //     that.data.adcode = cityData.adcode;
          //     // that.data.adcode = true;
          //     // that.setData({
          //     //   adcode: cityData.adcode
          //     // });
          //     console.log("adcode", that.data.adcode);
          //     that.getBanners();
          //     that.getSellers();
          //   }
          // }
          if(storeDetailData.services.length==0){
              that.setData({
                checkService:false
              })
          }
        if (!storeDetailData.comments){
          that.setData({
            evalute: false
          })
        }
        var traffic = storeDetailData.traffic.join();
        that.data.lat = parseFloat(storeDetailData.lat);
        that.data.lng = parseFloat(storeDetailData.lng);
        that.data.address = storeDetailData.address;
        that.data.title = storeDetailData.store_title
          that.setData({
            new_banner: storeDetailData.images,
            title: storeDetailData.store_title,
            // distance: storeDetailData.
            address:storeDetailData.address,
            start_time: storeDetailData.start_time,
            end_time: storeDetailData.end_time,
            service: storeDetailData.services,
            comments: storeDetailData.comments,
            traffic: traffic,
          })
        }
    })
  },
  // 打开位置
  openLocation: function () {
    var that = this;
    console.log("没有执行");
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        wx.openLocation({
          latitude: that.data.lat,
          longitude: that.data.lng,
          name:that.data.title,
          address:that.data.address
        })
      },
    })
  },
  // 选择美容师
  onChooseBeautician: function (event) {
    var serviceId = event.currentTarget.dataset.id;
    console.log("服务id", serviceId);
    wx.navigateTo({
      url: '../chooseBeautician/chooseBeautician?serviceId=' + serviceId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 查看全部评价
  onAllEvaluation:function(event){
    var storeId=event.currentTarget.dataset.id;
    console.log("门店id",storeId);
    wx.navigateTo({
      url: '../allEvaluation/allEvaluation?storeId='+storeId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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