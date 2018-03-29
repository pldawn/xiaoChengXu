const app = getApp()

Page({
  data: {
    // 用户选定的通讯录详细信息
    selectedTable: null,
    // 用户选定的通讯录名称
    tableName: null
  },

  onLoad: function(opts) {
    // 通过分享链接进入此界面
    if (opts.tableName) {
      //  将此分享的表插入用户可获得通讯录列表中
      wx.request({
        url: 'https://api.haomantech.cn/address/tables',
        data: {
          tablename: opts.tableName,
          openid: app.globalData.persinalData.openId
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          this.setData({
            tableList: res.data
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })

      this.setData({
        tableName: opts.tableName
      })
    }
    else {
      // 从index页面跳转至此页面
      this.setData({
        tableName: app.globalData.tableName
      })
    }

    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  onShow: function() {
    wx.showNavigationBarLoading()
    // 根据通讯录名称获取详细信息
    wx.request({
      url: 'https://api.haomantech.cn/address/list',
      data: {
        tablename: this.data.tableName
      },
      method: 'GET',
      success: function (res) {
        this.setData({
          selectedTable: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function() {
        wx.hideNavigationBarLoading()
      }
    })
  },

  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading()
    // 下拉刷新，重新获取最新通讯录详细信息
    wx.request({
      url: 'https://api.haomantech.cn/address/list',
      data: {
        tablenamae: this.data.tableName
      },
      method: 'GET',
      success: function (res) {
        this.setData({
          selectedTable: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  onShareAppMessage: function(res) {
    // 分享此通讯录时提供带参数的通讯录路径，路径中包含当前通讯录名称
    return {
      title: "有人向您分享通讯录：" + this.data.tableName,
      path: "/pages/detail/detail?tableName=" + this.data.tableName,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    }
  },

  bindModifyLongPress: function(e) {
    // 长按详细信息跳转至修改modify页面
    app.globalData.modifyId = e.target.id,
    app.globalData.modifyKey = e.target.dataset.key
    wx.navigateTo({
      url: '../modify/modify',
    })
  },

  checkUnique: function(name) {
    // 此表中添加信息时检测name是否已存在
    for (var na=0;na<this.data.selectedTable.length;na++) {
      if (this.data.selectedTable[na].name == name) {
        return false
      }
    }
    return true
  },

  bindCreateSubmit: function(e) {
    wx.showNavigationBarLoading()
    // 插入新的通讯录详细信息，创建信息内容
    var addInfo = [{ 
      name: e.detail.value.name, 
      mobile: e.detail.value.mobile, 
      city: e.detail.value.city, 
      status: e.detail.value.status,
      tablename: this.data.tableName
      }]
    // 插入至指定通讯录中
    if (addInfo[0].name && this.checkUnique(addInfo[0].name)) {
      wx.request({
        url: 'https://api.haomantech.cn/address/list',
        data: addInfo,
        method: 'POST',
        success: function(res) {
          this.setData({
            selectedTable: res.data
          })
        },
        fail: function(res) {
          console.log(res)
        },
        complete: function() {
          wx.hideNavigationBarLoading()
        }
      })
    }
  },

  bindSearchTap: function() {
    // 点击搜索按钮跳转至search页面
    wx.navigateTo({
      url: '../search/search',
    })
  }
})