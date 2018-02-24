const app = getApp()

Page({
  data: {
    addressBook: null,
    inputInfo: null,
    searchInfo: null
  },

  onLoad: function() {
    this.setData({
      addressBook: app.globalData.addressBook
    })
  },

  onShow: function() {
    if(this.data.addressBook != app.globalData.addressBook) {
      this.setData({
        addressBook: app.globalData.addressBook
      })
    }
  },

  bindBlur: function(e) {
    this.setData({
      inputInfo: e.detail.value
    })
  },

  bindTap: function() {
    this.setData({
      searchInfo: this.data.inputInfo
    })
  }
})