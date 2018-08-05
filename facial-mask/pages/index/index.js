var app = getApp();
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    swiperCurrent: 0,
    autoplay: true,
    interval: 3500,
    duration: 1500,
    loadingMore: true, // loading中
    banners: [],
    showNoBanners: false,
    loadingMoreHidden: true,
    is_modal_Hidden: false,
    is_modal_Msg: '娃娃鱼申请获得以下权限',
    showLoading:true,
    adcode:'',
    latitude:'',
    longitude:'',
    code:'',
    check:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'accessToken',
    //   success: function (res) {
    //     app.globalData.accessToken=res.data;
    //     console.log("accessToken", app.globalData.accessToken);
    //   }
    // })
    // 查看token
    var that = this;
    app.globalData.accessToken = wx.getStorageSync('accessToken');
    if (app.globalData.accessToken){
      that.getAddress();
    }else{
      util.init(that.getAddress);
    }
  },
  // 获取当前定位
  getAddress: function () {
    var that=this;
    console.log("定位accessToken",app.globalData.accessToken);
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.data.latitude = res.latitude;
        that.data.longitude = res.longitude;
        console.log("经纬度", that.data.latitude +'-'+ that.data.longitude)
        wx.request({
          url: config.apiList.addressList,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            latitude: that.data.latitude,
            longitude: that.data.longitude,
            appKey: app.globalData.appKey,
            AccessToken: app.globalData.accessToken,
          },
          success: function (res) {
            console.log("getArea区域accessToken", app.globalData.accessToken);
            console.log("getArea",res.data);
            if (res.data.code == "1006") {
              wx.removeStorageSync('accessToken');
              util.init(that.getAddress);
              console.log("code不是1，过期");
              return;
            }
            var addressData = res.data.data;
            console.log(res.data.data)
            for (var idx in addressData) {
              var cityData = addressData[idx];
              if (cityData.active) {
                that.data.adcode = cityData.adcode;
                that.getBanners();
                that.getSellers();
              }
            }
          },
          fail:function(){
            console.log("请求失败");
          }
        })
      },
    })
  },
// 轮播
  swiperchange: function (e) {
    // 通过bindChange获取当前index
    // console.log(e.detail.current);
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  getBanners: function () {
    var that = this
    wx.request({
      url: config.apiList.getBanner,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        adcode:that.data.adcode,
        AccessToken:app.globalData.accessToken,
        appKey: app.globalData.appKey
      },
      success: function (res) {
        if (res.data.code ===1) {
          that.setData({
            banners: res.data.data
          });
        } 
      }
    })
  },
  // 获取商家列表
  getSellers:function(){
    var that=this;
    wx.request({
      url: config.apiList.getStores,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        adcode: that.data.adcode,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        var list = [];
        var array = res.data.data;
        if (array) {
          array.forEach(function (value, index) {
            var name = value.store_title;
            // console.log("name",name);
            var address = value.position;
            if (name.length > 15) {
              name = name.substring(0, 15) + "...";
            }
            var temp = {
              image: value.thumb,
              name: name,
              address: address,
              distance: value.distance,
              id:value.id
            };
            list.push(temp);
          })
          that.setData({
            list: list,
            showLoading: false
          })
          
        }
        // that.setData({
        //   showLoading: false
        // })
      }
    })
  },
  // 详情页
  onTapDetail:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../sellerDetail/sellerDetail?id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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