var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    personId:0
  },
  onLoad: function (options) {
    var that = this;
    that.data.personId = options.personId;
    that.timeList();
    //  高度自适应
    // wx.getSystemInfo({
    //   success: function (res) {
    //     var clientHeight = res.windowHeight,
    //       clientWidth = res.windowWidth,
    //       rpxR = 750 / clientWidth;
    //     var calc = clientHeight * rpxR - 180;
    //     console.log(calc)
    //     that.setData({
    //       winHeight: calc
    //     });
    //   }
    // });
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: calc,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    var cur=e.detail.current;
    var singleNavWidth = this.data.windowWidth / 4;
    this.setData({
      currentTab: cur,
      scrollLeft: (cur - 2) * singleNavWidth
    });
    // this.setData({
    //   currentTab: e.detail.current
    // });
    // this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swicthNav: function (event) {
    var that=this;
    var cur = event.currentTarget.dataset.current;
    var singleNavWidth = this.data.windowWidth / 4;
    // console.log("this.data.currentTab", this.data.currentTab);
    // console.log("cur",cur);
    //tab选项居中                            
    that.setData({
      scrollLeft: (cur - 2) * singleNavWidth
    })
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  // 时间列表
  timeList:function(){
    function formatDate() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var hours = myDate.getHours();
      var minutes = myDate.getMinutes();
      var seconds = myDate.getSeconds();
      return [year, month, day, hours, minutes, seconds].map(this.formatNumber).join('-');
    }
    function formatNumber(n) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }
    function updateTime() {
      //定义时间
      var arrTime = [12, 13, 14, 15, 16];
      var minTime = [1200, 1220, 1240, 1300, 1320, 1340, 1400, 1420, 1440, 1500, 1520, 1540, 1600, 1620, 1640];
      var nowTime = formatDate();
      var newDate = new Date();
      var nowHours = formatNumber(newDate.getHours()).toString();
      var nowMinutes = formatNumber(newDate.getMinutes()).toString();
      var nowHoursMinutes = nowHours + nowMinutes;
      console.log("nowMinutes", nowMinutes);
      console.log(nowHours);
      console.log("nowHoursMinutes", nowHoursMinutes);



      for (var i = 0; i < minTime.length; i++) {
        // 得到当前小时时间14
        var nowHours = newDate.getHours();
        if (minTime[i] < nowHoursMinutes) {
          console.log(minTime[i]);
          // 将小于当前数据的时间删除
          minTime.shift(minTime[i]);
          //由于数组长度改变所以要先执行i--;
          i--;
        }
      }
      return minTime;
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  // getTime
  getTime:function(){
    wx.request({
      url: config.apiList.getPersonnelTime,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.data.personId,
        appKey: app.globalData.appKey,
        AccessToken: app.globalData.accessToken,
      },
      success: function (res) {
        console.log("员工工作时间", res.data);
        if (res.data.code == "1006") {
          wx.removeStorageSync('accessToken');
          console.log("code不是1，过期");
          util.init(that.getPersonnel);
          return;
        }
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  onOrderTime:function(event){
    var time=event.currentTarget.dataset.time;
    console.log(time);
  },
  // 确定选择
  choose:function(){
    wx.navigateTo({
      url: '../checkOrder/checkOrder',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})