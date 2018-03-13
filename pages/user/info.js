// pages/user/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "/assets/img/avatar.png",
    truename: '',
    mobile: '',
    city: '',
    recent: '',
    wx_rawData: ''
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
        console.log(res);
        _self.setData({
          truename: res.userInfo.nickName,
          city: [res.userInfo.province, res.userInfo.city],
          avatar: res.userInfo.avatarUrl,
          wx_rawData: res
        })
      }
    })
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      city: e.detail.value
    })
  },
  bindTruenameChange: function(e) {
    this.setData({
      truename: e.detail.value
    })
  },
  bindMobileChange: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindRecentChange: function(e) {
    this.setData({
      recent: e.detail.value
    })
  },
  submitHandle: function (e) {
    wx.request({
      url: 'https://api.haomantech.cn/address/myself',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      data: {
        truename:this.data.truename,
        mobile: this.data.mobile,
        city: this.data.city,
        recent: this.data.recent,
        wx_rawData: JSON.stringify(this.data.wx_rawData)
      },
      success: function(res){
        console.log(res.data);
      }
    })
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