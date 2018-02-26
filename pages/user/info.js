// pages/user/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "未登录",
    province: "",
    city: "",
    avatar: "/assets/img/avatar.png",
    region: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的信息',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _self = this;
    wx.getSetting({
      success(authSetting) {
        if (!authSetting.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success(errMsg) {
              console.log(errMsg);
              _self.setUserInfo();
            }
          })
        }
      }
    })
  },
  setUserInfo: function () {
    let _self = this;
    wx.getUserInfo({
      lang: "zh_CN",
      success(res) {
        // console.log(res);
        _self.setData({
          name: res.userInfo.nickName,
          region: [res.userInfo.province, res.userInfo.city],
          avatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        })
      }
    })
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  submitHandle: function(e) {
    console.log(e.detail.value);
    // wx.request({
    //   url: '/adpidsad',
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setUserInfo();
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