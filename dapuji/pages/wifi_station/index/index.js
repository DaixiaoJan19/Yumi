//index.js
//获取应用实例
var coord = 0
const app = getApp()


Page({
  onLoad: function () {
    wx.showModal({
      title: ' ',
      content: '请滑动解锁。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    if (app.data.userInfo) {
      this.setData({
        userInfo: app.data.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.data.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
 * 页面的初始数据
 */
  data: {
    x: 0,
    area_width: 95,   //可滑动区域的宽，单位是百分比，设置好后自动居中
    box_width: 120,   //滑块的宽,单位是 rpx
    maxNum: 285,        //验证成功时的坐标；
  },
  drag(e) {
    var that = this;
    coord = e.detail.x;
  },


  dragOver(e) {
    var that = this;
    if (coord >= that.data.maxNum) {
      this.yumi()
      wx.showToast({
        title: '验证成功!',
        icon: 'success',
        duration: 2000,
        success: function (res) {
          setTimeout(function () {
            validate: {
              wx.navigateTo({
                url: '../tianqi/tianqi',
              })
            }
          }, 700)
        }
      })
      //验证成功之后的代码
    } else {
      that.setData({
        x: 0,
      })
      wx.showToast({
        title: '验证失败',
        icon: 'none',
        duration: 2000,
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad2: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        var n = Math.floor(res.windowWidth * that.data.area_width / 100 - that.data.box_width / 2)
        that.setData({
          maxNum: n,
        })
      }
    })
  },

  yumi: function () {
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'http://api.heclouds.com/devices/503222993/datapoints?datastream_id=Temperature,Light&limit=7',
      header: {
        'content-type': 'application/json',
        'api-key': '4keLS17Lx394OPFDSpyPWZjnBq4='
      },
      success: function (res) {
        console.log(res)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.data.yumi = res.data.data.datastreams[0];
        console.log(app.data.yumi)
        
      },
    })
  },
})