const app = getApp()

Page({
  data:{
    // 此用户的openId可以获取的通讯录列表，包括真名（tableXid）和别名（tableName）
    tablesList: null,
    openId: null
  },

  onLoad: function() {
    let that = this
    // 向服务器请求通讯录列表
    setTimeout(function() {
      wx.request({
        url: 'https://api.haomantech.cn/address/tables',
        data: {
          openid: app.globalData.openId
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data)
          that.setData({
            tablesList: res.data,
            openId: app.globalData.openId
          })
        }
      })
    }, 2000)
  },

  onPullDownRefresh: function(e) {
    let that = this
    wx.showNavigationBarLoading()
    // 向服务器请求最新的通讯录列表
    wx.request({
      url: 'https://api.haomantech.cn/address/tables',
      data: {
        openid: app.globalData.openId
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          tablesList: res.data
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  bindSelectTap: function(e) {
    // 跳转detail页面并在跳转后请求选定通讯录的数据
    app.globalData.tableName = e.target.dataset.key
    app.globalData.tableXid = e.target.id
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  checkTableNameUnique: function(tablename) {
    for (var na=0;na<this.data.tablesList.length;na++) {
      if (this.data.tablesList[na].tablename == tablename) {
        return false
      }
    }
    return true
  },

  bindCreateSubmit: function(e) {
    let that = this
    // 创建新的通讯录
    if (e.detail.value.tableName && this.checkTableNameUnique(e.detail.value.tableName)){
      wx.showNavigationBarLoading()
      wx.request({
        url: 'https://api.haomantech.cn/address/tables',
        data: {
          tablename: e.detail.value.tableName,
          openid: that.data.openId
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          that.setData({
            tablesList: res.data
          })
        },
        fail: function(res) {
          console.log(res)
        },
        complete() {
          wx.hideNavigationBarLoading()
        }
      })
    }
  }
})