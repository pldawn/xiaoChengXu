const app = getApp()

Page({
  data:{
    // 此用户的openId可以获取的通讯录列表
    tablesList: null
  },

  onLoad: function() {
    // 向服务器请求通讯录列表
    wx.request({
      url: 'https://api.haomantech.cn/address/tables',
      data: {
        openid: app.globalData.persinalData.openId
      },
      method: 'GET',
      success: function(res){
        console.log(res.data)
        this.setData({
          tablesList: res.data
        })
      }
    })
  },

  onPullDownRefresh: function(e) {
    wx.showNavigationBarLoading()
    // 向服务器请求最新的通讯录列表
    wx.request({
      url: 'https://api.haomantech.cn/address/tables',
      data: {
        openid: app.globalData.persinalData.openId
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        this.setData({
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
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  bindCreateSubmit: function(e) {
    wx.showNavigationBarLoading()
    // 创建新的通讯录
    wx.request({
      url: 'https://api.haomantech.cn/address/tables',
      data: {
        tablename: e.detail.value.tableName,
        openid: this.data.persinalData.openId
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        this.setData({
          tableList: res.data
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
})