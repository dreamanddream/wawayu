Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
    modalMsg: {
      type: String,
      value: ' ',
    }
  },
  data: {
    // 这里是一些组件内部数据
    text: "text",
  },
  methods: {
    // 这里放置自定义方法
    modal_click_Hidden: function () {
      console.log("1111");
      this.setData({
        modalHidden: true,
      })
    },
    // 确定
    handler: function () {
      var that = this;
      wx.getSetting({
        success: res => {
          console.log("我就是看看getSetting返回什么", res);
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                // that.setData({
                //   userInfo: res.userInfo,
                //   hasUserInfo: true,
                //   choose:false
                // })
                // that.globalData.userInfo = res.userInfo;
                console.log("通过openSetting授权获取到用户信息",res.userInfo);
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                // if (this.userInfoReadyCallback) {
                //   this.userInfoReadyCallback(res)
                // }
              }
            })
          }
        }
      })
    }
  }
})
