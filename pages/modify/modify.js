const app = getApp()

Page({
  data: {
    newContent: null,
    pressKey: null
  },

  onShow: function() {
    this.setData({
      pressKey: app.globalData.pressKey
    })
  },

  bindBlur: function (e) {
    this.setData({
      newContent: e.detail.value
    })
  },

  bindTapConfirm: function (e) {
    app.globalData.newContent = this.data.newContent
    wx.navigateBack({
      delta: 1
    })
  },

  bindTapCancel: function (e) {
    wx.navigateBack({
      delta: 1
    })
  }
})