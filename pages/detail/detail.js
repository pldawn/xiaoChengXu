const app = getApp()

Page({
  data: {
    // 用户选定的通讯录详细信息
    selectedTable: null,
    // 用户选定的通讯录的别名
    tableName: null,
    // 用户选定的通讯录的真名
    tableXid: null
  },

  onLoad: function(opts) {
    let that = this
    // 通过分享链接进入此界面
    if (opts.tableName && opts.tableXid) {
      //  将此分享的表插入用户可获得通讯录列表中
      wx.request({
        url: 'https://api.haomantech.cn/address/share',
        data: {
          tablexid: opts.tableXid,
          openid: app.globalData.openId
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            tableList: res.data
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })

      that.setData({
        tableName: opts.tableName,
        tableXid: opts.tableXid
      })
    }
    else {
      // 从index页面跳转至此页面
      that.setData({
        tableName: app.globalData.tableName,
        tableXid: app.globalData.tableXid
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
    let that = this

    wx.showNavigationBarLoading()
    // 根据通讯录名称获取详细信息
    wx.request({
      url: 'https://api.haomantech.cn/address/list',
      data: {
        tablexid: that.data.tableXid
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          selectedTable: res.data
        })
        app.globalData.selectedTable = res.data
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
    let that =this

    wx.showNavigationBarLoading()
    // 下拉刷新，重新获取最新通讯录详细信息
    wx.request({
      url: 'https://api.haomantech.cn/address/list',
      data: {
        tablexid: that.data.tableXid
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          selectedTable: res.data
        })
        app.globalData.selectedTable = res.data
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
      path: "/pages/detail/detail?tableName=" + this.data.tableName + '&tableXid=' + this.data.tableXid,
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
    let that = this

    wx.showNavigationBarLoading()
    // 插入新的通讯录详细信息，创建信息内容
    var addInfo = [{ 
      name: e.detail.value.name, 
      mobile: e.detail.value.mobile, 
      city: e.detail.value.city, 
      status: e.detail.value.status,
      tablexid: this.data.tableXid
      }]
    // 插入至指定通讯录中
    if (addInfo[0].name && addInfo[0].mobile && addInfo[0].city && addInfo[0].status && 
        this.checkUnique(addInfo[0].name)) {
      wx.request({
        url: 'https://api.haomantech.cn/address/list',
        data: addInfo,
        method: 'POST',
        success: function(res) {
          that.setData({
            selectedTable: res.data
          })
          app.globalData.selectedTable = res.data
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