const app = getApp()

Page({
  data: {
    modifyId: null,
    modifyKey: null,
    newContent: null
  },

  onLoad: function() {
    this.setData({
      modifyId: app.globalData.modifyId,
      modifyKey: app.globalData.modifyKey
    })
  },

  bindInput: function (e) {
    this.setData({
      newContent: e.detail.value
    })
  },

  bindTapConfirm: function (e) {
    wx.showNavigationBarLoading()

    wx.request({
      url: 'https://api.haomantech.cn/address/list',
      data: {
        tablename: app.globalData.tableName,
        modifyid: this.data.modifyId,
        modifykey: this.data.modifyKey,
        newcontent: this.data.newContent
      },
      method: 'PUT',
      success: function(res) {
        wx.hideNavigationBarLoading()
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function() {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  bindTapCancel: function (e) {
    wx.navigateBack({
      delta: 1
    })
  }
})