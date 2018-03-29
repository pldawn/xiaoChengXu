App({
  globalData: {
    personalData: {
      openId: null
    },
    selectedTable: null,
    tableName: null,
    modifyId: null,
    modifyKey: null
  },

  onLaunch: function() {
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
              this.globalData.personalData.openId = res.data.openId
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