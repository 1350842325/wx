const devicesId = "576315018" // 填写在OneNet上获得的devicesId 形式就是一串数字 例子:9939133
const api_key = "ZnAmtgUDSRR=WJExmOlyomR4yJc=" // 填写在OneNet上的 api-key 例子: VeFI0HZ44Qn5dZO14AuLbWSlSlI=
Page({
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
    	workTime: wx.getStorageSync('workTime'),
    	restTime: wx.getStorageSync('restTime')
    })
  },
  loginSubmit: function () {
    var workTime= String(wx.getStorageSync('workTime')) 
    wx.request({
      url: 'https://api.heclouds.com/devices/576315018/datapoints',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'api-key': api_key
      },
      data: {
        datastreams: [
          {
            "id": "wx",
            "datapoints": [
              {
                "value": workTime
              }
            ]
          }
        ]
      },
      success: function (res) {
        console.log(res);
      }
    })

  },
  onLoad: function (options) {

  },
  changeWorkTime: function(e) {
    console.log(e)
  	wx.setStorage({
  		key: 'workTime',
  		data: e.detail.value
  	})
  },
  changeRestTime: function(e) {
  	wx.setStorage({
  		key: 'restTime',
  		data: e.detail.value
  	})
  },
  onUnload: function () {
    var that=this;
    that.loginSubmit();
  }

})
 