const app = getApp()

Page({
  data: {
    addressBook: [
      { name: "张文涛", mobile: "13520946941", status: "Boss直聘", city: "北京" },
      { name: "彭琳", mobile: "17301860049", status: "上海财经大学", city: "上海" },
      { name: "李卓航", mobile: "13632412301", status: "中山大学附属第二医院泌尿科", city: "广州" }
    ]
  },

  onLoad: function() {
    app.globalData.addressBook = this.data.addressBook
  },

  onShow: function() {
    if (app.globalData.pressId && app.globalData.pressKey && app.globalData.newContent) {
      this.data.addressBook[app.globalData.pressId][app.globalData.pressKey] = app.globalData.newContent
      this.setData({
        addressBook: this.data.addressBook
      })
      app.globalData.pressId = null,
      app.globalData.pressKey = null,
      app.globalData.newContent = null
      app.globalData.addressBook = this.data.addressBook
    }
  },

  bindLongPress: function(e) {
    app.globalData.pressId = e.target.id,
    app.globalData.pressKey = e.target.dataset.key
    wx.navigateTo({
      url: '../modify/modify',
    })
  },

  checkUnique: function(name) {
    for (var na=0;na<this.data.addressBook.length;na++) {
      if (this.data.addressBook[na].name == name) {
        return false
      }
    }
    return true
  },

  bindSubmit: function(e) {
    var addInfo = [{ 
      name: e.detail.value.name, 
      mobile: e.detail.value.mobile, 
      city: e.detail.value.city, 
      status: e.detail.value.status, 
      }]
    if (addInfo[0].name && this.checkUnique(addInfo[0].name)) {
      this.setData({
        addressBook: this.data.addressBook.concat(addInfo)
      })
      app.globalData.addressBook = this.data.addressBook
    }
  }
})