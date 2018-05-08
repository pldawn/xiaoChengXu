App({
  globalData: {
    openId: null,
    selectedTable: null,
    tableName: null,
    tableXid: null,
    modifyId: null,
    modifyKey: null,
    apiUrl: null
  },

  onLaunch: function() {
    this.globalData.apiUrl = this.loadConfig()
    let that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://api.haomantech.cn/wx/onLogin',
            data: {
              code: res.code
            },
            method: 'GET',
            success: function(res) {
              that.globalData.openId = res.data.openid
            },
            fail: function(res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  loadConfig: function() {
    let config = require('./config')
    // return config.dev.url ? config.dev.url :'http://localhost:3000'
    return config.prod.url ? config.prod.url :'https://api.haomantech.cn'
  }
})