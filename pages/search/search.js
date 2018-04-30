const app = getApp()

Page({
  data: {
    selectedTable: null,
    searchInfo: null
  },

  onLoad: function() {
    this.setData({
      selectedTable: app.globalData.selectedTable
    })
  },

  bindInputConfirm: function(e) {
    this.setData({
      searchInfo: e.detail.value
    })
  },
})