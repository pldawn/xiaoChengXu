const app = getApp()

Page({
  data: {
    seletedTable: null,
    searchInfo: null
  },

  onLoad: function() {
    this.setData({
      seletedTable: app.globalData.seletedTable
    })
  },

  bindInput: function(e) {
    this.setData({
      searchInfo: e.detail.value
    })
  },
})