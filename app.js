App({
  globalData: {
    openId: null,
    selectedTable: null,
    tableName: null,
    modifyId: null,
    modifyKey: null
  },

  onLaunch: function() {
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
  }
})