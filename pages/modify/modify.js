const app = getApp()

Page({
  data: {
    modifyId: null,
    modifyKey: null,
    modifyKeyCN: null,
    newContent: null
  },

  onLoad: function() {
    this.setData({
      modifyId: app.globalData.modifyId,
      modifyKey: app.globalData.modifyKey
    })
    if (app.globalData.modifyKey == 'name') {
      this.setData({
        modifyKeyCN: '姓名'
      })
    }
    if (app.globalData.modifyKey == 'mobile') {
      this.setData({
        modifyKeyCN: '手机'
      })
    }
    if (app.globalData.modifyKey == 'city') {
      this.setData({
        modifyKeyCN: '城市'
      })
    }
    if (app.globalData.modifyKey == 'status') {
      this.setData({
        modifyKeyCN: '近况'
      })
    }
  },

  bindInput: function (e) {
    this.setData({
      newContent: e.detail.value
    })
  },

  bindTapConfirm: function (e) {
    if (this.data.newContent) {
      wx.showNavigationBarLoading()
      wx.request({
        url: app.globalData.apiUrl + '/address/list',
        data: {
          tablexid: app.globalData.tableXid,
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
    }
  },

  bindTapCancel: function (e) {
    wx.navigateBack({
      delta: 1
    })
  }
})